import { useCallback, useEffect, useRef, useState } from "react";
import { KeyboardEvent, MouseEvent } from "react";

interface UseVideoPlayerStateProps {
  playing?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  clickVideoToPlay?: boolean;
}

interface UseVideoPlayerStateReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  hasStarted: boolean;
  currentPlayingState: boolean;
  isUsingExternalControl: boolean;
  togglePlay: () => void;
  handleKeyPress: (e: KeyboardEvent) => void;
  handleContainerClick: (e: MouseEvent<HTMLDivElement>) => void;
}

/**
 * Custom hook for managing video player state and controls
 */
export const useVideoPlayerState = ({
  playing,
  onPlay,
  onPause,
  onEnded,
  clickVideoToPlay = true,
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

  const handleContainerClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    // Toggle play/pause on container click only if clickVideoToPlay is enabled
    if (!clickVideoToPlay) return;

    // Check if click is within the circular video area
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = Math.min(rect.width, rect.height) / 2;

    const clickX = e.clientX;
    const clickY = e.clientY;

    const distanceFromCenter = Math.sqrt(
      Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2)
    );

    // Only toggle play/pause if click is within the circular area
    if (distanceFromCenter <= radius) {
      togglePlay();
    }
  }, [togglePlay, clickVideoToPlay]);

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
