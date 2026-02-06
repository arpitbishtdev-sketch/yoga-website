import React, { useLayoutEffect, useRef } from "react";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children, index }) => {
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const stickyPoint = 100;
      const distancePastSticky = stickyPoint - rect.top;

      if (distancePastSticky > 0) {
        const scale = Math.max(0.9, 1 - distancePastSticky / 2500);

        const brightness = Math.max(0.8, 1 - distancePastSticky / 2000);

        cardRef.current.style.transform = `scale(${scale})`;
        cardRef.current.style.filter = `brightness(${brightness})`;
      } else {
        cardRef.current.style.transform = `scale(1)`;
        cardRef.current.style.filter = `brightness(1)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="stack-section">
      <div
        ref={cardRef}
        className="stack-card"
        style={{
          zIndex: index + 1,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const ScrollStack = ({ children, className = "" }) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`stack-wrapper ${className}`}>
      {childrenArray.map((child, index) =>
        React.cloneElement(child, {
          index: index,
        }),
      )}
    </div>
  );
};

export default ScrollStack;
