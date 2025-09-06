import React from "react";
import clsx from "clsx";
import { PlayButtonProps } from "../VideoPlayer/types";
import { PlayIcon, PauseIcon } from "../../icons";
import styles from "../VideoPlayer/VideoPlayer.module.scss";

export const PlayButton: React.FC<PlayButtonProps> = ({
  isPlaying,
  onClick,
  onKeyDown,
  ariaLabel,
  className,
  playIcon,
  pauseIcon,
}) => {
  return (
    <button
      className={clsx(styles.playButton, className)}
      onClick={onClick}
      onKeyDown={onKeyDown}
      type="button"
      aria-label={ariaLabel}
    >
      {isPlaying ? (
        pauseIcon || <PauseIcon />
      ) : (
        playIcon || <PlayIcon />
      )}
    </button>
  );
};
