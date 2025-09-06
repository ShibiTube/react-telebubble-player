import React, { useRef } from 'react';
import { useCircularInputContext } from './context';
import { useCircularDrag } from './useCircularDrag';
import { polarToCartesian, valueToAngle } from './utils';

export type CircularThumbProps = React.SVGProps<SVGCircleElement> & {
  // disallow some props
  ref?: undefined;
  cx?: undefined;
  cy?: undefined;
};

export const CircularThumb: React.FC<CircularThumbProps> = ({
  fill = '#3D99FF',
  stroke = '#ffffff',
  strokeWidth = 3,
  r = 8,
  ...props
}) => {
  const { value, radius, center } = useCircularInputContext();
  const ref = useRef<SVGCircleElement | null>(null);
  useCircularDrag(ref);

  const thumbPosition = polarToCartesian({
    center,
    angle: valueToAngle(value),
    radius,
  });

  return (
    <circle
      {...props}
      ref={ref}
      cx={thumbPosition.x}
      cy={thumbPosition.y}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      r={r}
      style={{ pointerEvents: 'auto' }}
    />
  );
};

