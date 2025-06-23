import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SacredPortalProps {
  type?: "mandala" | "constellation" | "spiral";
  size?: number;
  intensity?: number;
  timeOfDay?: "dawn" | "midday" | "dusk" | "midnight";
  interactive?: boolean;
  className?: string;
}

const SacredPortal = ({
  type = "mandala",
  size = 400,
  intensity = 0.7,
  timeOfDay = "midday",
  interactive = true,
  className = "",
}: SacredPortalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const timeColors = {
    dawn: { primary: "#f59e0b", secondary: "#f97316", tertiary: "#ef4444" },
    midday: { primary: "#3b82f6", secondary: "#8b5cf6", tertiary: "#06b6d4" },
    dusk: { primary: "#8b5cf6", secondary: "#ec4899", tertiary: "#f59e0b" },
    midnight: { primary: "#1e1b4b", secondary: "#4c1d95", tertiary: "#6366f1" },
  };

  const colors = timeColors[timeOfDay];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) * 0.001;

      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;
      const baseRadius = size * 0.3;

      // Mouse interaction effect
      const mouseEffect = interactive && isHovered ? 1.2 : 1.0;
      const pulseEffect = 1 + Math.sin(elapsed * 2) * 0.1 * intensity;

      switch (type) {
        case "mandala":
          drawMandala(
            ctx,
            centerX,
            centerY,
            baseRadius * mouseEffect * pulseEffect,
            elapsed,
            colors,
            intensity,
          );
          break;
        case "constellation":
          drawConstellation(
            ctx,
            centerX,
            centerY,
            baseRadius * mouseEffect,
            elapsed,
            colors,
            intensity,
          );
          break;
        case "spiral":
          drawSpiral(
            ctx,
            centerX,
            centerY,
            baseRadius * mouseEffect * pulseEffect,
            elapsed,
            colors,
            intensity,
          );
          break;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [type, size, intensity, timeOfDay, isHovered, interactive]);

  const drawMandala = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    time: number,
    colors: any,
    intensity: number,
  ) => {
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(time * 0.1);

    // Outer ring of petals
    for (let ring = 1; ring <= 5; ring++) {
      const ringRadius = radius * (ring / 5);
      const petals = ring * 8;
      const alpha = (1 - ring / 6) * intensity;

      for (let i = 0; i < petals; i++) {
        const angle = (i * Math.PI * 2) / petals + time * 0.2;
        const petalX = Math.cos(angle) * ringRadius;
        const petalY = Math.sin(angle) * ringRadius;
        const petalRadius = radius * 0.08;

        const gradient = ctx.createRadialGradient(
          petalX,
          petalY,
          0,
          petalX,
          petalY,
          petalRadius,
        );
        gradient.addColorStop(
          0,
          `${colors.primary}${Math.round(alpha * 255)
            .toString(16)
            .padStart(2, "0")}`,
        );
        gradient.addColorStop(
          0.7,
          `${colors.secondary}${Math.round(alpha * 180)
            .toString(16)
            .padStart(2, "0")}`,
        );
        gradient.addColorStop(
          1,
          `${colors.tertiary}${Math.round(alpha * 60)
            .toString(16)
            .padStart(2, "0")}`,
        );

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(petalX, petalY, petalRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Central geometric patterns
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6 + time * 0.15;
      const triangleSize = radius * 0.1;

      ctx.strokeStyle = `${colors.primary}${Math.round(intensity * 180)
        .toString(16)
        .padStart(2, "0")}`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(
        Math.cos(angle) * triangleSize,
        Math.sin(angle) * triangleSize,
      );
      ctx.lineTo(
        Math.cos(angle + (Math.PI * 2) / 3) * triangleSize,
        Math.sin(angle + (Math.PI * 2) / 3) * triangleSize,
      );
      ctx.lineTo(
        Math.cos(angle + (Math.PI * 4) / 3) * triangleSize,
        Math.sin(angle + (Math.PI * 4) / 3) * triangleSize,
      );
      ctx.closePath();
      ctx.stroke();
    }

    ctx.restore();
  };

  const drawConstellation = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    time: number,
    colors: any,
    intensity: number,
  ) => {
    // SDG constellation - 144 nodes in 12 clusters
    const clusters = 12;
    const nodesPerCluster = 12;

    for (let cluster = 0; cluster < clusters; cluster++) {
      const clusterAngle = (cluster * Math.PI * 2) / clusters + time * 0.05;
      const clusterRadius = radius * (0.6 + Math.sin(time + cluster) * 0.2);
      const clusterX = centerX + Math.cos(clusterAngle) * clusterRadius;
      const clusterY = centerY + Math.sin(clusterAngle) * clusterRadius;

      // Cluster center
      const gradient = ctx.createRadialGradient(
        clusterX,
        clusterY,
        0,
        clusterX,
        clusterY,
        15,
      );
      gradient.addColorStop(
        0,
        `${colors.primary}${Math.round(intensity * 255)
          .toString(16)
          .padStart(2, "0")}`,
      );
      gradient.addColorStop(
        1,
        `${colors.secondary}${Math.round(intensity * 60)
          .toString(16)
          .padStart(2, "0")}`,
      );

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(clusterX, clusterY, 8, 0, Math.PI * 2);
      ctx.fill();

      // Nodes around cluster
      for (let node = 0; node < nodesPerCluster; node++) {
        const nodeAngle =
          (node * Math.PI * 2) / nodesPerCluster + time * 0.1 + cluster;
        const nodeRadius = 25 + Math.sin(time * 2 + node) * 8;
        const nodeX = clusterX + Math.cos(nodeAngle) * nodeRadius;
        const nodeY = clusterY + Math.sin(nodeAngle) * nodeRadius;

        ctx.fillStyle = `${colors.tertiary}${Math.round(intensity * 200)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 3, 0, Math.PI * 2);
        ctx.fill();

        // Connection lines
        ctx.strokeStyle = `${colors.secondary}${Math.round(intensity * 100)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(clusterX, clusterY);
        ctx.lineTo(nodeX, nodeY);
        ctx.stroke();
      }
    }

    // Central nexus
    const nexusGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      30,
    );
    nexusGradient.addColorStop(
      0,
      `${colors.primary}${Math.round(intensity * 255)
        .toString(16)
        .padStart(2, "0")}`,
    );
    nexusGradient.addColorStop(
      0.5,
      `${colors.secondary}${Math.round(intensity * 180)
        .toString(16)
        .padStart(2, "0")}`,
    );
    nexusGradient.addColorStop(
      1,
      `${colors.tertiary}${Math.round(intensity * 60)
        .toString(16)
        .padStart(2, "0")}`,
    );

    ctx.fillStyle = nexusGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawSpiral = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    time: number,
    colors: any,
    intensity: number,
  ) => {
    ctx.save();
    ctx.translate(centerX, centerY);

    // Golden spiral
    const goldenRatio = 1.618;
    const turns = 3;
    const points = 200;

    ctx.strokeStyle = `${colors.primary}${Math.round(intensity * 200)
      .toString(16)
      .padStart(2, "0")}`;
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let i = 0; i <= points; i++) {
      const t = (i / points) * turns * Math.PI * 2 + time * 0.2;
      const r =
        (radius * Math.pow(goldenRatio, t / (Math.PI * 2))) /
        Math.pow(goldenRatio, turns);
      const x = Math.cos(t) * r;
      const y = Math.sin(t) * r;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Fibonacci circles along the spiral
    for (let i = 0; i < 8; i++) {
      const t = (i / 8) * turns * Math.PI * 2 + time * 0.3;
      const r =
        (radius * Math.pow(goldenRatio, t / (Math.PI * 2))) /
        Math.pow(goldenRatio, turns);
      const x = Math.cos(t) * r;
      const y = Math.sin(t) * r;
      const circleRadius = 5 + i * 2;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, circleRadius);
      gradient.addColorStop(
        0,
        `${colors.secondary}${Math.round(intensity * 220)
          .toString(16)
          .padStart(2, "0")}`,
      );
      gradient.addColorStop(
        1,
        `${colors.tertiary}${Math.round(intensity * 60)
          .toString(16)
          .padStart(2, "0")}`,
      );

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, circleRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className={`rounded-full ${interactive ? "cursor-crosshair" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          filter: `drop-shadow(0 0 20px ${colors.primary}40)`,
        }}
      />

      {/* Sacred emanations */}
      <div
        className="absolute inset-0 rounded-full animate-pulse opacity-20"
        style={{
          background: `radial-gradient(circle, ${colors.primary}20 0%, transparent 70%)`,
        }}
      />

      {/* Interaction feedback */}
      {interactive && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 opacity-60"
          style={{ borderColor: colors.primary }}
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default SacredPortal;
