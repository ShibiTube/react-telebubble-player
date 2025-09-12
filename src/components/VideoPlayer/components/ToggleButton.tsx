import React from "react";
import { clsx } from "@/utils";
import { PlayIcon, PauseIcon } from "@/icons";

export interface ToggleButtonProps {
  isPlaying?: boolean;
  onToggle?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  className?: string;
  playIcon?: React.ReactNode | "none";
  pauseIcon?: React.ReactNode | "none";
  ariaLabel?: string;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  isPlaying,
  onToggle,
  onKeyDown,
  className,
  playIcon,
  pauseIcon,
  ariaLabel = isPlaying ? "Pause" : "Play",
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle?.();
  };

  // Don't render if icon is set to "none" or if required props are missing
  const shouldShowPlayIcon = isPlaying !== undefined && !isPlaying && playIcon !== "none";
  const shouldShowPauseIcon = isPlaying !== undefined && isPlaying && pauseIcon !== "none";

  if (!shouldShowPlayIcon && !shouldShowPauseIcon) {
    return null;
  }

  const icon = isPlaying 
    ? (pauseIcon === undefined ? <PauseIcon /> : pauseIcon)
    : (playIcon === undefined ? <PlayIcon /> : playIcon);

  return (
    <button
      className={clsx("telebubble-toggle-button", className)}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      type="button"
      aria-label={ariaLabel}
      style={{
        pointerEvents: 'auto',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {icon}
    </button>
  );
};