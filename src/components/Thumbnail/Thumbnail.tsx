import React from "react";
import clsx from "clsx";
import { ThumbnailProps } from "../VideoPlayer/types";
import styles from "../VideoPlayer/VideoPlayer.module.scss";

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
      className={clsx(styles.thumbnail, className, {
        [styles['thumbnail--hidden']]: isHidden,
      })}
      draggable={false}
    />
  );
};
