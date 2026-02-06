import React, {
  useEffect,
  useMemo,
  useRef,
  useCallback,
  useState,
} from "react";
import { useGesture } from "@use-gesture/react";
import "./Gallery.css";

import boyImg from "../assets/gallery/boy.jpg";
import heavyImg from "../assets/gallery/heavy.avif";
import machinesImg from "../assets/gallery/machines.jpg";
import treadImg from "../assets/gallery/tread.avif";
import weightImg from "../assets/gallery/weight.webp";

const LOCAL_IMAGES = [
  { src: boyImg, alt: "Fitness Training" },
  { src: heavyImg, alt: "Heavy Lifting" },
  { src: machinesImg, alt: "Gym Equipment" },
  { src: treadImg, alt: "Treadmill Session" },
  { src: weightImg, alt: "Free Weights" },
];

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y }));
  });

  return coords.map((c, i) => ({
    ...c,
    src: pool[i % pool.length].src,
    alt: pool[i % pool.length].alt,
  }));
}

export default function Gallery({ images = LOCAL_IMAGES, segments = 35 }) {
  const rootRef = useRef(null);
  const sphereRef = useRef(null);
  const rotationRef = useRef({ y: 0 });

  const [visibleItems, setVisibleItems] = useState([]);
  const [activeImg, setActiveImg] = useState(null);
  const [animDone, setAnimDone] = useState(false);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const updateVisible = useCallback(
    (rotY) => {
      const visible = items.filter((it) => {
        const itemAngle = it.x * 6.8;
        const relative = itemAngle + rotY;
        const normalized = ((relative % 360) + 360) % 360;
        return normalized > 270 || normalized < 90;
      });
      setVisibleItems(visible);
    },
    [items],
  );

  const applyTransform = useCallback(
    (y) => {
      if (sphereRef.current) {
        sphereRef.current.style.transform = `
          translateZ(-900px)
          rotateY(${y}deg)
        `;
      }
      updateVisible(y);
    },
    [updateVisible],
  );

  useEffect(() => {
    applyTransform(0);
  }, [applyTransform]);

  useGesture(
    {
      onDrag: ({ delta: [dx] }) => {
        rotationRef.current.y += dx / 10;
        applyTransform(rotationRef.current.y);
      },
    },
    { target: rootRef },
  );

  return (
    <>
      <div ref={rootRef} className="sphere-root">
        <div className="sphere-main">
          <div className="stage">
            <div ref={sphereRef} className="sphere">
              {visibleItems.map((it, i) => (
                <div
                  key={i}
                  className="item"
                  style={{ "--offset-x": it.x, "--offset-y": it.y }}
                >
                  <div
                    className="item__image"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setAnimDone(false);
                      setActiveImg({
                        src: it.src,
                        rect,
                      });
                    }}
                  >
                    <img src={it.src} alt="" draggable={false} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* POPUP MODAL */}
      {activeImg && (
        <div
          className="img-modal"
          onClick={() => {
            setActiveImg(null);
            setAnimDone(false);
          }}
        >
          <img
            src={activeImg.src}
            onAnimationEnd={() => setAnimDone(true)}
            className={`modal-img ${animDone ? "done" : ""}`}
            style={{
              "--start-x": `${activeImg.rect.left}px`,
              "--start-y": `${activeImg.rect.top}px`,
              "--start-w": `${activeImg.rect.width}px`,
              "--start-h": `${activeImg.rect.height}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
