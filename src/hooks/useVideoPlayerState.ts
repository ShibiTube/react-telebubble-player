import { useCallback, useEffect, useRef, useState } from "react";
import { KeyboardEvent } from "react";

interface UseVideoPlayerStateProps {
  playing?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

interface UseVideoPlayerStateReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  hasStarted: boolean;
  currentPlayingState: boolean;
  isUsingExternalControl: boolean;
  togglePlay: () => void;
  handleKeyPress: (e: KeyboardEvent) => void;
  handleContainerClick: () => void;
}

/**
 * Custom hook for managing video player state and controls
 */
export const useVideoPlayerState = ({
  playing,
  onPlay,
  onPause,
  onEnded,
}: UseVideoPlayerStateProps): UseVideoPlayerStateReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Use external state if provided, otherwise use internal state
  const isUsingExternalControl = playing !== undefined;
  const currentPlayingState = isUsingExternalControl ? playing : isPlaying;

  const handleVideoEnded = useCallback(() => {
    if (!isUsingExternalControl) setIsPlaying(false);
    onEnded?.();
  }, [isUsingExternalControl, onEnded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("ended", handleVideoEnded);

    return () => {
      video.removeEventListener("ended", handleVideoEnded);
    };
  }, [handleVideoEnded]);

  // Handle external control of playing state
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isUsingExternalControl) return;

    // Sync video element with external playing state
    if (playing && video.paused) {
      video.play().catch(() => { });
      setHasStarted(true);
    } else if (!playing && !video.paused) {
      video.pause();
    }
  }, [playing, isUsingExternalControl]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (currentPlayingState) {
      video.pause();
      onPause?.();
      if (!isUsingExternalControl) setIsPlaying(false);
    } else {
      video.play().catch(() => { });
      setHasStarted(true);
      onPlay?.();
      if (!isUsingExternalControl) setIsPlaying(true);
    }
  }, [currentPlayingState, isUsingExternalControl, onPlay, onPause]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    },
    [togglePlay],
  );

  const handleContainerClick = useCallback(() => {
    // Toggle play/pause on container click
    togglePlay();
  }, [togglePlay]);

  return {
    videoRef: videoRef as React.RefObject<HTMLVideoElement>,
    isPlaying,
    hasStarted,
    currentPlayingState,
    isUsingExternalControl,
    togglePlay,
    handleKeyPress,
    handleContainerClick,
  };
};
