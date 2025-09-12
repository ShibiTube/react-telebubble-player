import React, { memo, useMemo, useState, useCallback, useEffect } from "react";
import { clsx } from "@/utils";
import "@/styles/telebubble-player.scss";
import { useVideoPlayerState } from "@/hooks";
import { calculateSize } from "@/utils";
import { Video } from "@/components/Video";
import { Thumbnail } from "@/components/Thumbnail";
import { Input } from "@/components/Input/Input";

// Import sub-components
import * as Components from "@/components/VideoPlayer/components";

// Types for the new API
export interface TelebubblePlayerProps {
  src: string;
  className?: string;
  size?: number | string;
  thumbnailSrc?: string;
  playing?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  children?: React.ReactNode;
}

// Main TelebubblePlayer component
const TelebubblePlayer = memo<TelebubblePlayerProps>(({
  className,
  src,
  size = "100%",
  thumbnailSrc,
  playing,
  onPlay,
  onPause,
  onEnd,
  children,
}) => {
  // Use custom hook for video player state management
  const {
    videoRef,
    hasStarted,
    currentPlayingState,
    togglePlay,
    handleKeyPress,
    handleContainerClick,
  } = useVideoPlayerState({
    playing,
    onPlay,
    onPause,
    onEnded: onEnd,
    clickVideoToPlay: true,
  });

  // Progress state
  const [progress, setProgress] = useState(0);

  // Calculate size-related values
  const { cssVariables } = useMemo(() => calculateSize(size), [size]);

  // Update progress from video
  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        const newProgress = (video.currentTime / video.duration) * 100;
        setProgress(newProgress);
      }
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [videoRef]);

  // Handle seeking - update both progress state and video time 
  const handleSeek = useCallback((newProgress: number) => {
    setProgress(newProgress);

    // Also seek the video
    const video = videoRef?.current;
    if (video) {
      const time = (newProgress / 100) * video.duration;
      video.currentTime = time;
    }
  }, [videoRef]);

  const classNames = clsx("telebubble-player", className);

  // Extract overlay component from children
  const overlayComponent = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === Components.Overlay
  ) as React.ReactElement | undefined;

  return (
    <div
      className={classNames}
      style={cssVariables}
      onClick={handleContainerClick}
    >
      <Input
        value={progress}
        onChange={handleSeek}
        clickTolerance={5}
        hasStarted={hasStarted}
        className="progressRing"
      />
      <div
        className="telebubble-player__video-wrapper"
        style={{ cursor: 'pointer' }}
      >
        {thumbnailSrc && (
          <Thumbnail
            src={thumbnailSrc}
            alt="Video thumbnail"
            isHidden={hasStarted || currentPlayingState}
          />
        )}
        <Video
          src={src}
          videoRef={videoRef}
          videoAriaLabel="Video player"
          onKeyDown={handleKeyPress}
        />
      </div>

      {/* Render overlay component with its children */}
      {overlayComponent && React.cloneElement(overlayComponent as React.ReactElement<Record<string, unknown>>, {
        isPlaying: currentPlayingState,
        togglePlay: () => togglePlay(),
        handleKeyPress,
      })}
    </div>
  );
});

// Define the component with proper typing
interface TelebubblePlayerComponent extends React.MemoExoticComponent<React.FC<TelebubblePlayerProps>> {
  Track: typeof Components.Track;
  Progress: typeof Components.Progress;
  Thumb: typeof Components.Thumb;
  Overlay: typeof Components.Overlay;
  ToggleButton: typeof Components.ToggleButton;
}

// Attach sub-components to main component
const TelebubblePlayerWithComponents = TelebubblePlayer as TelebubblePlayerComponent;
TelebubblePlayerWithComponents.Track = Components.Track;
TelebubblePlayerWithComponents.Progress = Components.Progress;
TelebubblePlayerWithComponents.Thumb = Components.Thumb;
TelebubblePlayerWithComponents.Overlay = Components.Overlay;
TelebubblePlayerWithComponents.ToggleButton = Components.ToggleButton;

export default TelebubblePlayerWithComponents;
