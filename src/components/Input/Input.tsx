import React, { useCallback } from 'react';
import { ProgressRingInput } from '@/components/ProgressRing/ProgressRingInput';
import { Track } from '@/components/ProgressRing/Track';
import { Progress } from '@/components/ProgressRing/Progress';
import { Thumb } from '@/components/ProgressRing/Thumb';

export type InputProps = {
  value: number;
  onChange?: (value: number) => void;
  clickTolerance?: number;
  hasStarted?: boolean;
  // Styling props
  trackStrokeColor?: string;
  trackStrokeWidth?: number;
  trackFill?: string;
  trackStrokeLinecap?: 'butt' | 'round' | 'square';
  progressStrokeColor?: string;
  progressStrokeWidth?: number;
  className?: string;
};

export const Input: React.FC<InputProps> = ({
  value = 25,
  onChange = () => { },
  clickTolerance = 5,
  hasStarted = false,
  // Styling props with defaults
  trackStrokeColor = "#ccc",
  trackStrokeWidth = 8,
  trackFill = "none",
  trackStrokeLinecap = "round",
  progressStrokeColor = "#0af",
  progressStrokeWidth = 10,
  className,
}) => {
  // Handle seeking - just call onChange, let parent handle video seeking
  const handleSeek = useCallback((newProgress: number) => {
    onChange(newProgress);
  }, [onChange]);

  return (
    <ProgressRingInput
      value={value}
      onChange={handleSeek}
      clickTolerance={clickTolerance}
      hasStarted={hasStarted}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
      }}
    >
      <Track
        stroke={trackStrokeColor}
        strokeWidth={trackStrokeWidth}
        fill={trackFill}
        strokeLinecap={trackStrokeLinecap}
      />
      <Progress
        strokeColor={progressStrokeColor}
        strokeWidth={progressStrokeWidth}
        fill="none"
        strokeLinecap="round"
      />
      <Thumb
        fill="#ffffff"
        stroke={progressStrokeColor}
        strokeWidth={3}
        radius={8}
      />
    </ProgressRingInput>
  );
};
