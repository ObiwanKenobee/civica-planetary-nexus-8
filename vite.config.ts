import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProduction = mode === "production";

  return {
    server: {
      host: "::",
      port: 8080,
      strictPort: false,
      hmr: {
        port: 8081,
        overlay: true,
        clientPort: 8081,
      },
      cors: true,
      open: false,
      fs: {
        strict: false,
      },
      headers: {
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
    },
    preview: {
      port: 8082,
      strictPort: false,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: "es2020",
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: isProduction ? false : true,
      minify: isProduction ? "esbuild" : false,
      cssMinify: isProduction,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // Enhanced chunking strategy for better caching
          manualChunks: {
            // Core React dependencies
            vendor: ["react", "react-dom"],
            // Routing
            router: ["react-router-dom"],
            // UI Libraries
            ui: ["framer-motion", "lucide-react"],
            // Radix UI components
            radix: [
              "@radix-ui/react-dialog",
              "@radix-ui/react-dropdown-menu",
              "@radix-ui/react-tabs",
              "@radix-ui/react-progress",
              "@radix-ui/react-switch",
              "@radix-ui/react-select",
            ],
            // Utilities
            utils: ["date-fns", "clsx", "tailwind-merge", "zod"],
            // Guardian system
            guardian: [
              "./src/components/guardian/GuardianDashboard.tsx",
              "./src/components/guardian/BalanceModule.tsx",
              "./src/components/guardian/RegionalOversight.tsx",
              "./src/hooks/useGuardianAuth.tsx",
            ],
            // Forms and validation
            forms: ["react-hook-form", "@hookform/resolvers"],
            // Query and state management
            query: ["@tanstack/react-query"],
          },
          // Optimize asset naming for better caching
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/woff2?|eot|ttf|otf/i.test(ext)) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
        },
      },
      // Production optimizations
      cssCodeSplit: isProduction,
      modulePreload: {
        polyfill: true,
      },
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "framer-motion",
        "lucide-react",
        "date-fns",
        "clsx",
        "tailwind-merge",
      ],
      // Force specific packages to be pre-bundled
      force: isProduction ? ["react", "react-dom", "react-router-dom"] : [],
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env.VITE_APP_VERSION": JSON.stringify(
        process.env.npm_package_version || "1.0.0",
      ),
      "process.env.VITE_BUILD_TIME": JSON.stringify(new Date().toISOString()),
    },
    esbuild: {
      logOverride: { "this-is-undefined-in-esm": "silent" },
      // Target for better browser support
      target: "es2020",
    },
    // Environment-specific configurations
    envDir: "./",
    envPrefix: ["VITE_"],

    // Performance optimizations
    css: {
      devSourcemap: !isProduction,
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },

    // Security configurations
    experimental: {
      renderBuiltUrl(
        filename: string,
        { hostType }: { hostType: "js" | "css" | "html" },
      ) {
        if (hostType === "js") {
          return { js: `/assets/js/${filename}` };
        } else if (hostType === "css") {
          return `/assets/css/${filename}`;
        } else {
          return filename;
        }
      },
    },
  };
});
