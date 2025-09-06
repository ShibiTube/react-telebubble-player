export interface ProgressRingProps {
  progress: number; // 0-100
  size?: number | string;
  strokeWidth?: number;
  className?: string;
  strokeColor?: string;
  backgroundColor?: string;
  onSeek?: (progress: number) => void;
  clickTolerance?: number;
}
