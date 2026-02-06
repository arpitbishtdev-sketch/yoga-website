import { useEffect, useRef } from "react";
import "./ElectricBorder.css";

const ElectricBorder = ({ children, color = "#1b8a3b" }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const container = containerRef.current;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width + 80;
      canvas.height = rect.height + 80;
      canvas.style.width = `${rect.width + 80}px`;
      canvas.style.height = `${rect.height + 80}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    let t = 0;

    const draw = () => {
      const rect = container.getBoundingClientRect();
      const offset = 40;
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Settings for "Medium-High" intensity
      const amp = 10; // Distance the sparks travel
      const freq = 0.25; // Density of the waves
      const speed = 3; // Movement speed
      const complexity = 3; // How many waves are layered

      ctx.lineJoin = "round";

      const getPoint = (val, t) => {
        // Layering two waves creates a more "electric" feel than a single sine wave
        const wave1 = Math.sin(val * freq + t * speed) * amp;
        const wave2 = Math.cos(val * 0.1 + t * 2) * (amp / 2);
        // Add a tiny bit of random noise for texture (reduced from before)
        const jitter = (Math.random() - 0.5) * 2;
        return wave1 + wave2 + jitter;
      };

      const drawPath = () => {
        ctx.beginPath();
        // TOP
        for (let x = 0; x <= w; x += 4) {
          ctx.lineTo(offset + x, offset + getPoint(x, t));
        }
        // RIGHT
        for (let y = 0; y <= h; y += 4) {
          ctx.lineTo(offset + w + getPoint(y, t + 5), offset + y);
        }
        // BOTTOM
        for (let x = w; x >= 0; x -= 4) {
          ctx.lineTo(offset + x, offset + h + getPoint(x, t + 10));
        }
        // LEFT
        for (let y = h; y >= 0; y -= 4) {
          ctx.lineTo(offset + getPoint(y, t + 15), offset + y);
        }
        ctx.closePath();
      };

      // Outer Glow Layer
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.3;
      ctx.filter = "blur(4px)";
      drawPath();
      ctx.stroke();

      // Bright Core Layer
      ctx.strokeStyle = "#e6fffa"; // Light minty white for high energy
      ctx.lineWidth = 2;
      ctx.globalAlpha = 1;
      ctx.filter = "none";
      drawPath();
      ctx.stroke();

      t += 0.08; // Slightly slower timing for a smoother look
      requestAnimationFrame(draw);
    };
    draw();

    return () => window.removeEventListener("resize", resize);
  }, [color]);

  return (
    <div ref={containerRef} className="electric-border">
      <canvas ref={canvasRef} className="eb-canvas" />
      <div className="eb-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;
