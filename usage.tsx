import React from 'react';
import { TelebubblePlayer } from './src/index';

// Mock custom components for the example
const CustomPlay = () => <span>▶️</span>;
const CustomPause = () => <span>⏸️</span>;

export const MyComponent: React.FC = () => {
  /* TelebubblePlayer - should has essential props:
  src, className, playing(boolean), onPlay, onPause, onEnd, children

  all components in children should be optional

  Track - background for progress circle
  Progress - circle that shows progress, and can be clicked on any it's area to go to specific time. can be dragged with specific prop
  Thumb - dot on the end of Progress, can be dragged
  Overlay - container for specific custom things, with children:
  PlayButton: props for button that user presses to play, it's basically our custom play button, with user's set icon, className, etc, unless there are no props - then it's default
  PauseButton: same but for pause
  */

  return (
    <div className="video-container" style={{ width: '400px', height: '400px' }}>
      <TelebubblePlayer src="video.mp4" size="100%">
        <TelebubblePlayer.Track stroke="#ccc" strokeWidth={8} />
        <TelebubblePlayer.Progress strokeColor="#0af" strokeWidth={10} />
        <TelebubblePlayer.Thumb radius={6} fill="#fff" />
        <TelebubblePlayer.Overlay>
          <TelebubblePlayer.ToggleButton
            playIcon={<CustomPlay />}
            pauseIcon={<CustomPause />}
            className="custom-toggle-btn"
          />
        </TelebubblePlayer.Overlay>
      </TelebubblePlayer>
    </div>
  );
};