import { KeyboardEvent } from "react";

export interface VideoPlayerProps {
  className?: string;
  src: string;
  size?: number | string;
  thumbnailSrc?: string;
  containerClassName?: string;
  progressRingClassName?: string;
  progressCircleClassName?: string;
  videoWrapperClassName?: string;
  videoClassName?: string;
  thumbnailClassName?: string;
  playButtonClassName?: string;
  videoAriaLabel?: string;
  thumbnailAlt?: string;
  playButtonAriaLabelPlay?: string;
  playButtonAriaLabelPause?: string;
  playIcon?: React.ReactNode | "none";
  pauseIcon?: React.ReactNode | "none";
  customPlayButton?: (props: CustomPlayButtonProps) => React.ReactNode;
  customPlayButtonClassName?: string;
  onPlayClassName?: string;
  onPauseClassName?: string;
  progressClickTolerance?: number;
  // Progress ring styling props
  progressRingStrokeColor?: string;
  progressRingBackgroundColor?: string;
  progressRingStrokeWidth?: number;
  progressRingPosition?: 'inside' | 'outside';
  progressRingOffset?: number;
  // Track styling props
  progressRingTrackStrokeWidth?: number;
  progressRingTrackStrokeColor?: string;
  progressRingTrackFill?: string;
  progressRingTrackStrokeLinecap?: 'butt' | 'round' | 'square';
  // Video interaction props
  clickVideoToPlay?: boolean; // whether clicking on video area (not ring) should play/pause
  // External state management props
  playing?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export interface CustomPlayButtonProps {
  isPlaying: boolean;
  onClick: (e?: React.MouseEvent) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  ariaLabel: string;
  className?: string;
  onPlayClassName?: string;
  onPauseClassName?: string;
}

export interface VideoProps {
  src: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  className?: string;
  videoAriaLabel?: string;
  onKeyDown: (e: KeyboardEvent) => void;
}

export interface ThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  isHidden: boolean;
}

export interface PlayButtonProps {
  isPlaying: boolean;
  onClick: (e: React.MouseEvent) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  ariaLabel: string;
  className?: string;
  playIcon?: React.ReactNode | "none";
  pauseIcon?: React.ReactNode | "none";
}

export interface SizeCalculationResult {
  numericSize: number;
  cssVariables: React.CSSProperties;
}
