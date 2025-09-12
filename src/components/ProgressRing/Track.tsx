import React, { useRef, useCallback } from 'react';
import { useProgressRingInputContext } from '@/components/ProgressRing/ProgressRingInputContext';
import { useCircularDrag } from '@/hooks/useCircularDrag';

export interface TrackProps {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  strokeLinecap?: 'butt' | 'round' | 'square';
  className?: string;
}

export const Track: React.FC<TrackProps> = ({
  stroke = "#ccc",
  strokeWidth = 8,
  fill = "none",
  strokeLinecap = "round",
  className,
}) => {
  const { radius, center, getValueFromPointerEvent, onChange } = useProgressRingInputContext();
  const ref = useRef<SVGCircleElement | null>(null);
  useCircularDrag(ref);

  const handleClick = useCallback((e: React.MouseEvent<SVGCircleElement>) => {
    e.stopPropagation();
    if (onChange) {
      const nearestValue = getValueFromPointerEvent(e.nativeEvent);
      onChange(nearestValue);
    }
  }, [onChange, getValueFromPointerEvent]);

  return (
    <circle
      ref={ref}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeLinecap={strokeLinecap}
      cx={center.x}
      cy={center.y}
      r={radius}
      onClick={handleClick}
      className={className}
      style={{ cursor: 'pointer' }}
    />
  );
};
