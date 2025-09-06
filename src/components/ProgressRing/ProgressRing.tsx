import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import { ProgressRingProps } from "./types";
import { CircularInput } from "./CircularInput";
import { CircularTrack } from "./CircularTrack";
import { CircularProgress } from "./CircularProgress";
import { CircularThumb } from "./CircularThumb";
import styles from "./ProgressRing.module.scss";

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 300,
  strokeWidth = 4,
  className,
  strokeColor = "#ffffff",
  backgroundColor = "transparent",
  onSeek,
  clickTolerance = 5,
}) => {
  // Convert progress from 0-100 to 0-1 for circular input
  const value = progress / 100;

  const containerRef = useRef<HTMLDivElement>(null);
  const [actualSize, setActualSize] = useState(() => {
    // Use numeric size as fallback
    return typeof size === 'number' ? size : 300;
  });

  // Get actual rendered size for percentage-based sizes
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const actualSize = Math.min(rect.width, rect.height);
        setActualSize(actualSize);
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateSize, 0);

    // Update on resize
    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [size]);

  // Use actual size for radius calculation
  const radius = actualSize / 2;

  const handleChange = (newValue: number) => {
    if (onSeek) {
      // Convert back to 0-100 range
      onSeek(newValue * 100);
    }
  };

  const handleChangeEnd = (newValue: number) => {
    if (onSeek) {
      // Convert back to 0-100 range
      onSeek(newValue * 100);
    }
  };

  return (
    <div
      ref={containerRef}
      className={clsx(styles.progressRing, className)}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }}
    >
      <CircularInput
        value={value}
        radius={radius}
        onChange={handleChange}
        onChangeEnd={handleChangeEnd}
        clickTolerance={clickTolerance}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      >
        <CircularTrack
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        <CircularProgress
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        <CircularThumb
          fill="#ffffff"
          stroke={strokeColor}
          strokeWidth={3}
          r={8}
        />
      </CircularInput>
    </div>
  );
};
