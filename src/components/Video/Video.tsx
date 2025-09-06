import React from "react";
import clsx from "clsx";
import { VideoProps } from "../VideoPlayer/types";
import styles from "../VideoPlayer/VideoPlayer.module.scss";

export const Video: React.FC<VideoProps> = ({
  src,
  videoRef,
  className,
  videoAriaLabel = "Video player",
  onKeyDown,
}) => {
  return (
    <video
      ref={videoRef}
      className={clsx(styles.video, className)}
      src={src}
      playsInline
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label={videoAriaLabel}
    />
  );
};
