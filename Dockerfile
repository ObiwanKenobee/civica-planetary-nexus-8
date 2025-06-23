# Multi-stage Docker build for CIVICA 144 Platform
# Optimized for production deployment on AWS, Azure, and other container platforms

# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache libc6-compat git

# Copy package files
COPY package*.json ./
COPY bun.lockb ./

# Install dependencies
RUN npm ci --only=production --silent

# Copy source code
COPY . .

# Build arguments for production configuration
ARG NODE_ENV=production
ARG VITE_APP_ENVIRONMENT=production
ARG VITE_APP_VERSION
ARG BUILD_TIME

# Set environment variables
ENV NODE_ENV=$NODE_ENV
ENV VITE_APP_ENVIRONMENT=$VITE_APP_ENVIRONMENT
ENV VITE_APP_VERSION=$VITE_APP_VERSION
ENV VITE_BUILD_TIME=$BUILD_TIME

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Copy nginx configuration
COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY deploy/default.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy static assets
COPY --from=builder /app/public /usr/share/nginx/html

# Create non-root user for security
RUN addgroup -g 1001 -S civica && \
    adduser -S civica -u 1001

# Set ownership and permissions
RUN chown -R civica:civica /usr/share/nginx/html && \
    chown -R civica:civica /var/cache/nginx && \
    chown -R civica:civica /var/log/nginx && \
    chown -R civica:civica /etc/nginx/conf.d

# Create pid directory
RUN touch /var/run/nginx.pid && \
    chown -R civica:civica /var/run/nginx.pid

# Switch to non-root user
USER civica

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
