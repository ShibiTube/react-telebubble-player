import React, { useCallback } from 'react';
import { useProgressRingInputContext } from '@/components/ProgressRing/ProgressRingInputContext';
import { DEG_360_IN_RAD } from '@/utils/progressRing';

export interface ProgressProps {
  strokeColor?: string;
  strokeWidth?: number;
  fill?: string;
  strokeLinecap?: 'butt' | 'round' | 'square';
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  strokeColor = "#0af",
  strokeWidth = 10,
  fill = "none",
  strokeLinecap = "round",
  className,
}) => {
  const { value, radius, center, getValueFromPointerEvent, onChange } = useProgressRingInputContext();
  const innerCircumference = DEG_360_IN_RAD * radius;

  const handleClick = useCallback((e: React.MouseEvent<SVGCircleElement>) => {
    e.stopPropagation();
    if (onChange) {
      const nearestValue = getValueFromPointerEvent(e.nativeEvent);
      onChange(nearestValue);
    }
  }, [onChange, getValueFromPointerEvent]);

  return (
    <circle
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeLinecap={strokeLinecap}
      strokeDasharray={innerCircumference}
      strokeDashoffset={innerCircumference * (1 - value / 100)}
      transform={`rotate(-90 ${center.x} ${center.y})`}
      cx={center.x}
      cy={center.y}
      r={radius}
      onClick={handleClick}
      className={className}
      style={{ cursor: 'pointer' }}
    />
  );
};
