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
  ringPosition = 'inside',
  ringOffset = 5,
  hasStarted = false,
  // Track styling options
  trackStrokeWidth,
  trackStrokeColor,
  trackFill,
  trackStrokeLinecap,
}) => {
  // Use progress directly as it's already 0-100
  const value = progress;

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

  // Use actual size for radius calculation, adjusted for ring position
  const baseRadius = actualSize / 2;
  const radius = ringPosition === 'inside'
    ? baseRadius - ringOffset - (strokeWidth / 2)
    : baseRadius + ringOffset + (strokeWidth / 2);

  // Calculate the total size needed for the CircularInput
  const totalSize = ringPosition === 'inside'
    ? actualSize
    : actualSize + (ringOffset + strokeWidth) * 2;

  const handleChange = (newValue: number) => {
    if (onSeek) {
      // newValue is already 0-100 range
      onSeek(newValue);
    }
  };

  const handleContainerClick = () => {
    // Let CircularInput handle whether to stop propagation based on click location
    // This allows clicks outside the ring to bubble up for play/pause
  };

  return (
    <div
      ref={containerRef}
      className={clsx(styles.progressRing, className)}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
      }}
      onClick={handleContainerClick}
    >
      <CircularInput
        value={value}
        radius={radius}
        onChange={handleChange}
        clickTolerance={clickTolerance}
        hasStarted={hasStarted}
        style={{
          width: `${totalSize}px`,
          height: `${totalSize}px`,
          position: 'absolute',
          top: ringPosition === 'inside' ? 0 : -ringOffset - strokeWidth,
          left: ringPosition === 'inside' ? 0 : -ringOffset - strokeWidth,
          zIndex: 2,
          pointerEvents: 'auto',
        }}
      >
        <CircularTrack
          stroke={trackStrokeColor || backgroundColor}
          strokeWidth={trackStrokeWidth || strokeWidth}
          fill={trackFill || "none"}
          strokeLinecap={trackStrokeLinecap || "round"}
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
          hasStarted={hasStarted}
        />
      </CircularInput>
    </div>
  );
};
