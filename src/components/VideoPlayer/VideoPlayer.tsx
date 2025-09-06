import clsx from "clsx";
import { memo, useMemo, useState, useCallback, useEffect, useRef } from "react";
import styles from "./VideoPlayer.module.scss";
import { VideoPlayerProps } from "./types";
import { useVideoPlayerState } from "../../hooks";
import { calculateSize } from "../../utils";
import { Video } from "../Video";
import { Thumbnail } from "../Thumbnail";
import { PlayButton } from "../PlayButton";
import { CustomPlayButtonWrapper } from "../CustomPlayButtonWrapper";
import { ProgressRing } from "../ProgressRing";

const VideoPlayer = memo<VideoPlayerProps>(({
  className,
  src,
  size = "100%",
  thumbnailSrc,
  containerClassName,
  progressRingClassName: _progressRingClassName,
  progressCircleClassName: _progressCircleClassName,
  videoWrapperClassName,
  videoClassName,
  thumbnailClassName,
  playButtonClassName,
  videoAriaLabel = "Video player",
  thumbnailAlt = "Video thumbnail",
  playButtonAriaLabelPlay = "Play",
  playButtonAriaLabelPause = "Pause",
  playIcon,
  pauseIcon,
  customPlayButton,
  customPlayButtonClassName,
  onPlayClassName,
  onPauseClassName,
  progressClickTolerance: _progressClickTolerance = 5,
  // External state management props
  playing,
  onPlay,
  onPause,
  onEnded,
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
    onEnded,
  });

  // Progress state
  const [progress, setProgress] = useState(0);
  const isDraggingRef = useRef(false);

  // Calculate size-related values
  const { cssVariables } = useMemo(() => calculateSize(size), [size]);

  // Update progress from video
  const updateProgress = useCallback(() => {
    const video = videoRef.current;
    if (!video || isDraggingRef.current) return;

    const progress = (video.currentTime / video.duration) * 100;
    setProgress(progress);
  }, [videoRef]);

  // Handle seeking
  const handleSeek = useCallback((newProgress: number) => {
    const video = videoRef.current;
    if (!video) return;

    const time = (newProgress / 100) * video.duration;
    video.currentTime = time;
    setProgress(newProgress);
  }, [videoRef]);


  // Add event listeners for progress updates
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("timeupdate", updateProgress);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, [updateProgress]);

  const classNames = clsx(styles.container, className, containerClassName);

  return (
    <div
      className={classNames}
      style={cssVariables}
      onClick={handleContainerClick}
    >
      <ProgressRing
        progress={progress}
        size={size}
        className={_progressRingClassName}
        strokeColor="#ff0000"
        strokeWidth={8}
        onSeek={handleSeek}
      />
      <div className={clsx(styles.videoWrapper, videoWrapperClassName)}>
        {thumbnailSrc && (
          <Thumbnail
            src={thumbnailSrc}
            alt={thumbnailAlt}
            className={thumbnailClassName}
            isHidden={hasStarted || currentPlayingState}
          />
        )}
        <Video
          src={src}
          videoRef={videoRef}
          className={videoClassName}
          videoAriaLabel={videoAriaLabel}
          onKeyDown={handleKeyPress}
        />
      </div>
      {customPlayButton ? (
        // Only render custom button if current state has an icon to show
        (() => {
          const currentIcon = currentPlayingState ? pauseIcon : playIcon;
          return currentIcon !== "none" && (
            <CustomPlayButtonWrapper
              isPlaying={currentPlayingState}
              onClick={(e?: React.MouseEvent) => {
                e?.stopPropagation();
                togglePlay();
              }}
              onKeyDown={handleKeyPress}
              ariaLabel={currentPlayingState ? playButtonAriaLabelPause : playButtonAriaLabelPlay}
              className={customPlayButtonClassName}
              onPlayClassName={onPlayClassName}
              onPauseClassName={onPauseClassName}
              customPlayButton={customPlayButton}
            />
          );
        })()
      ) : (
        // Only render button if current state has an icon to show
        (() => {
          const currentIcon = currentPlayingState ? pauseIcon : playIcon;
          return currentIcon !== "none" && (
            <PlayButton
              isPlaying={currentPlayingState}
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              onKeyDown={handleKeyPress}
              ariaLabel={currentPlayingState ? playButtonAriaLabelPause : playButtonAriaLabelPlay}
              className={playButtonClassName}
              playIcon={playIcon}
              pauseIcon={pauseIcon}
            />
          );
        })()
      )}
    </div>
  );
});

export default VideoPlayer;
