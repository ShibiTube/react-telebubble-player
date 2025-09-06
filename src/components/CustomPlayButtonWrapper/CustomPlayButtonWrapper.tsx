import React from "react";
import { CustomPlayButtonWrapperProps } from "../VideoPlayer/types";

export const CustomPlayButtonWrapper: React.FC<CustomPlayButtonWrapperProps> = ({
  isPlaying,
  onClick,
  onKeyDown,
  ariaLabel,
  className,
  onPlayClassName,
  onPauseClassName,
  customPlayButton,
}) => {
  return customPlayButton({
    isPlaying,
    onClick,
    onKeyDown,
    ariaLabel,
    className,
    onPlayClassName,
    onPauseClassName,
  });
};
