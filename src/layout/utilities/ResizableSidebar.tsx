import React, { useState, useCallback, useEffect, useRef } from "react";

interface Props {
  onResize: (width: number) => void;
}

const ResizableSidebar: React.FC<Props> = ({ onResize }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const requestRef = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const width: number = Math.min(450, Math.max(256, e.clientX));
      onResize(width);
    },
    [onResize]
  );

  const animate = useCallback(
    (e: MouseEvent) => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      requestRef.current = requestAnimationFrame(() => handleMouseMove(e));
    },
    [handleMouseMove]
  );

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", animate);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", animate);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", animate);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, animate, handleMouseUp]);

  return (
    <div
      style={{
        width: "5px",
        height: "100%",
        cursor: "col-resize",
        position: "absolute",
        borderRight: "1px solid #F2F2F2",
        top: 0,
        right: 0,
        zIndex: 1,
      }}
      onMouseDown={handleMouseDown}
    />
  );
};

export default ResizableSidebar;
