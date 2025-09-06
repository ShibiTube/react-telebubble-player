import React from 'react';
import { useCircularInputContext } from './context';
import { CircularTrack } from './CircularTrack';
import { CircularTrackProps } from './CircularTrack';
import { DEG_360_IN_RAD } from './utils';

type CircularProgressProps = React.SVGProps<SVGCircleElement> &
  CircularTrackProps & {
    // disallow some props
    strokeDasharray?: undefined;
    strokeDashoffset?: undefined;
    transform?: undefined;
  };

// const defaultProps = {
//   stroke: '#3D99FF',
// };

export const CircularProgress: React.FC<CircularProgressProps> = (props) => {
  const { value, radius, center } = useCircularInputContext();
  const innerCircumference = DEG_360_IN_RAD * radius;

  return (
    <CircularTrack
      {...props}
      strokeDasharray={innerCircumference}
      strokeDashoffset={innerCircumference * (1 - value)}
      transform={`rotate(-90 ${center.x} ${center.y})`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

// CircularProgress.defaultProps = defaultProps;
