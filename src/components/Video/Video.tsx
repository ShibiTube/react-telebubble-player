import React from "react";
import { clsx } from "@/utils";
import "@/styles/telebubble-player.scss";
import { VideoProps } from "@/components/VideoPlayer/types";

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
      className={clsx("telebubble-player__video", className)}
      src={src}
      playsInline
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-label={videoAriaLabel}
    />
  );
};
