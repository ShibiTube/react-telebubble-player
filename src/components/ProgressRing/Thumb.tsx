import React, { useRef, useCallback } from 'react';
import { useProgressRingInputContext } from '@/components/ProgressRing/ProgressRingInputContext';
import { useCircularDrag } from '@/hooks/useCircularDrag';

export interface ThumbProps {
  radius?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}

export const Thumb: React.FC<ThumbProps> = ({
  radius = 6,
  fill = "#fff",
  stroke,
  strokeWidth = 3,
  className,
}) => {
  const { getPointFromValue, isFocused, getValueFromPointerEvent, onChange } = useProgressRingInputContext();
  const ref = useRef<SVGCircleElement | null>(null);
  const { isDragging } = useCircularDrag(ref);

  const handleClick = useCallback((e: React.MouseEvent<SVGCircleElement>) => {
    e.stopPropagation();
    if (onChange) {
      const nearestValue = getValueFromPointerEvent(e.nativeEvent);
      onChange(nearestValue);
    }
  }, [onChange, getValueFromPointerEvent]);

  const point = getPointFromValue();

  // Check conditions after all hooks are called
  if (!point) return null;

  const { x, y } = point;

  const style = {
    transition: 'r 150ms cubic-bezier(0.215, 0.61, 0.355, 1)',
    cursor: 'pointer',
  };

  return (
    <circle
      r={isFocused || isDragging ? (radius + 2) : radius}
      fill={fill}
      stroke={stroke || "#ff0000"}
      strokeWidth={strokeWidth}
      style={style}
      ref={ref}
      cx={x}
      cy={y}
      onClick={handleClick}
      className={className}
    />
  );
};
