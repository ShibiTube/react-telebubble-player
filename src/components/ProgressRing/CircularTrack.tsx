import React from 'react';
import { useCircularInputContext } from './context';

export type CircularTrackProps = React.SVGProps<SVGCircleElement> & {
  // disallow some props
  ref?: undefined;
  cx?: undefined;
  cy?: undefined;
  r?: undefined;
};

export const CircularTrack: React.FC<CircularTrackProps> = ({
  strokeWidth = 20,
  stroke = '#CEE0F5',
  fill = 'none',
  strokeLinecap = 'round',
  ...props
}) => {
  const { radius, center } = useCircularInputContext();

  return (
    <circle
      {...props}
      cx={center.x}
      cy={center.y}
      r={radius}
      strokeWidth={strokeWidth}
      stroke={stroke}
      fill={fill}
      strokeLinecap={strokeLinecap}
      style={{ pointerEvents: 'none' }}
    />
  );
};

