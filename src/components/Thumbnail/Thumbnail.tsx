import React from "react";
import { clsx } from "@/utils";
import "@/styles/telebubble-player.scss";
import { ThumbnailProps } from "@/components/VideoPlayer/types";

export const Thumbnail: React.FC<ThumbnailProps> = ({
  src,
  alt,
  className,
  isHidden,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={clsx("telebubble-player__thumbnail", className, {
        'telebubble-player__thumbnail--hidden': isHidden,
      })}
      draggable={false}
    />
  );
};
