export interface ProgressRingProps {
  progress: number; // 0-100
  size?: number | string;
  strokeWidth?: number;
  className?: string;
  strokeColor?: string;
  backgroundColor?: string;
  onSeek?: (progress: number) => void;
  clickTolerance?: number;
  ringPosition?: 'inside' | 'outside';
  ringOffset?: number; // offset in pixels from video edge
  hasStarted?: boolean; // whether video has been played
  // Track styling options
  trackStrokeWidth?: number;
  trackStrokeColor?: string;
  trackFill?: string;
  trackStrokeLinecap?: 'butt' | 'round' | 'square';
}
