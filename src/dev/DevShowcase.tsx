import React from 'react';
import { VideoPlayer } from '../components';

const DevShowcase: React.FC = () => {
  // Custom play icon examples
  const customPlayIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polygon points="5,3 19,12 5,21" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );

  const customPauseIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="4" width="4" height="16" fill="white" rx="2" />
      <rect x="14" y="4" width="4" height="16" fill="white" rx="2" />
    </svg>
  );

  const heartPlayIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="white" />
    </svg>
  );

  const starPlayIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="white" />
    </svg>
  );

  // Custom pause icon examples
  const customPauseIcon2 = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="3" width="5" height="18" fill="white" rx="2.5" />
      <rect x="14" y="3" width="5" height="18" fill="white" rx="2.5" />
    </svg>
  );

  const heartPauseIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="8" y="6" width="2" height="12" fill="white" rx="1" />
      <rect x="14" y="6" width="2" height="12" fill="white" rx="1" />
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="white" strokeWidth="1.5" fill="none" />
    </svg>
  );

  const stopPauseIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="6" width="12" height="12" fill="white" rx="2" />
    </svg>
  );

  // Additional custom play icons
  const circlePlayIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
      <polygon points="10,8 16,12 10,16" fill="white" />
    </svg>
  );

  const arrowPlayIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M8 5l11 7-11 7V5z" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );

  const diamondPlayIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l4 4v4l4 2-4 2v4l-4 4-4-4v-4l-4-2 4-2V6l4-4z" fill="white" />
      <polygon points="10,9 15,12 10,15" fill="#333" />
    </svg>
  );

  const squarePlayIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" fill="white" rx="3" />
      <polygon points="10,8 16,12 10,16" fill="#333" />
    </svg>
  );

  const gradientPlayIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="playGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="100%" stopColor="#4ecdc4" />
        </linearGradient>
      </defs>
      <polygon points="6,4 20,12 6,20" fill="url(#playGradient1)" />
    </svg>
  );

  // Sample video URL (you can replace with any video URL)
  const sampleVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const sampleThumbnail = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";

  return (
    <div className="dev-showcase">
      <header className="showcase-header">
        <h1>React TeleBubble Player - Dev Showcase</h1>
        <p>Development environment for testing and showcasing the VideoPlayer component</p>
      </header>

      <main className="showcase-content">
        <section className="showcase-section">
          <h2>Default Player</h2>
          <p>Basic VideoPlayer with default settings (100% size, responsive). Click anywhere on the video area to play/pause, or drag the progress ring to seek!</p>
          <div className="player-container">
            <VideoPlayer
              src={sampleVideoUrl}
              thumbnailSrc={sampleThumbnail}
              progressRingStrokeColor="#ff0000"
              progressRingPosition="inside"
              progressRingOffset={5}
              clickVideoToPlay={true}
            />
          </div>
        </section>

        <section className="showcase-section">
          <h2>Video Click Behavior</h2>
          <p>Control whether clicking on the video area should play/pause</p>

          <div className="custom-icons-grid">
            <div className="player-demo">
              <h3>Click Video to Play (Default)</h3>
              <p>Click anywhere on video area to play/pause</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  clickVideoToPlay={true}
                  progressRingStrokeColor="#ff0000"
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Only Button Clicks</h3>
              <p>Only the play/pause button is clickable</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  clickVideoToPlay={false}
                  progressRingStrokeColor="#0066ff"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="showcase-section">
          <h2>Custom Play & Pause Icons</h2>
          <p>VideoPlayer with custom play/pause button icons - click play and then pause to see both custom icons</p>

          <div className="custom-icons-grid">
            <div className="player-demo">
              <h3>Custom Triangle & Rounded Pause</h3>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  playIcon={customPlayIcon}
                  pauseIcon={customPauseIcon2}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Heart Play & Heart-Frame Pause</h3>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  playIcon={heartPlayIcon}
                  pauseIcon={heartPauseIcon}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Star Play & Stop Pause</h3>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  playIcon={starPlayIcon}
                  pauseIcon={stopPauseIcon}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="showcase-section">
          <h2>More Custom Play Icons</h2>
          <p>Creative custom play icon designs - from minimalist to complex gradients</p>

          <div className="custom-icons-grid">
            <div className="player-demo">
              <h3>Circle Outline</h3>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  playIcon={circlePlayIcon}
                  pauseIcon={customPauseIcon}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Arrow Style</h3>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  playIcon={arrowPlayIcon}
                  pauseIcon={customPauseIcon2}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Diamond Shape</h3>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  playIcon={diamondPlayIcon}
                  pauseIcon={heartPauseIcon}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Square Frame</h3>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  playIcon={squarePlayIcon}
                  pauseIcon={stopPauseIcon}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Gradient</h3>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  playIcon={gradientPlayIcon}
                  pauseIcon={customPauseIcon2}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Mix & Match</h3>
              <p>Circle play + Heart pause</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  playIcon={circlePlayIcon}
                  pauseIcon={heartPauseIcon}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="showcase-section">
          <h2>External State Management</h2>
          <p>Control video playback from external state with callbacks for synchronization</p>

          <div className="custom-icons-grid">
            <div className="player-demo">
              <h3>External Control with Callbacks</h3>
              <p>External state controls video, callbacks sync state</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  playing={false} // This will be controlled externally
                  onPlay={() => console.log('Video started')}
                  onPause={() => console.log('Video paused')}
                  onEnded={() => console.log('Video ended')}
                />
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  <small>Check console for callback events</small>
                </div>
              </div>
            </div>

            <div className="player-demo">
              <h3>State Management Integration</h3>
              <p>Perfect for Redux, Zustand, or Context</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  playing={false}
                  onPlay={() => console.log('State: PLAYING')}
                  onPause={() => console.log('State: PAUSED')}
                  onEnded={() => console.log('State: ENDED')}
                />
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  <small>Use with useState, Redux, etc.</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="showcase-section">
          <h2>Custom Play Button</h2>
          <p>Custom play button with hiding behavior - hides when pauseIcon is set to "none"</p>
          <div className="custom-icons-grid">
            <div className="player-demo">
              <h3>Custom Button - Hides When Playing</h3>
              <p>Custom play button that disappears when playing (pauseIcon="none")</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  pauseIcon="none"
                  customPlayButton={({ isPlaying, onClick, onKeyDown, ariaLabel }) => (
                    <button
                      onClick={onClick}
                      onKeyDown={onKeyDown}
                      aria-label={ariaLabel}
                      style={{
                        position: 'absolute',
                        zIndex: 3,
                        background: 'rgba(0, 150, 255, 0.8)',
                        border: '2px solid white',
                        borderRadius: '12px',
                        width: '80px',
                        height: '40px',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {isPlaying ? '⏸️ PAUSE' : '▶️ PLAY'}
                    </button>
                  )}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Custom Button - Always Visible</h3>
              <p>Custom play button that changes between play/pause</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  customPlayButton={({ isPlaying, onClick, onKeyDown, ariaLabel }) => (
                    <button
                      onClick={onClick}
                      onKeyDown={onKeyDown}
                      aria-label={ariaLabel}
                      style={{
                        position: 'absolute',
                        zIndex: 3,
                        background: isPlaying ? 'rgba(255, 0, 0, 0.8)' : 'rgba(0, 255, 0, 0.8)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        color: 'white',
                        fontSize: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {isPlaying ? '⏸️' : '▶️'}
                    </button>
                  )}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="showcase-section">
          <h2>Hidden Icons ("none" value)</h2>
          <p>VideoPlayer with hidden play/pause icons - set playIcon or pauseIcon to "none" to hide them completely. Click anywhere on the player to play/pause!</p>

          <div className="custom-icons-grid">
            <div className="player-demo">
              <h3>No Play Icon</h3>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  playIcon="none"
                  pauseIcon={customPauseIcon}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>No Pause Icon</h3>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  playIcon={heartPlayIcon}
                  pauseIcon="none"
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>No Icons At All</h3>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  playIcon="none"
                  pauseIcon="none"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="showcase-section">
          <h2>Progress Click Tolerance</h2>
          <p>Control how much area around the progress ring is clickable for seeking (vs clicking to play/pause)</p>
          <div className="custom-icons-grid">
            <div className="player-demo">
              <h3>Default (5% tolerance)</h3>
              <p>Optimized for smaller players</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressClickTolerance={5}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Medium (15% tolerance)</h3>
              <p>Balanced click area</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressClickTolerance={15}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Generous (30% tolerance)</h3>
              <p>Large click area for seeking</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressClickTolerance={30}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="showcase-section">
          <h2>Different Sizes</h2>
          <p>VideoPlayer components with different sizes (pixel values and CSS units)</p>
          <div className="sizes-grid">
            <div className="player-demo">
              <h3>Small (120px)</h3>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={120}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Medium (200px)</h3>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={200}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Responsive (50%)</h3>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size="50%"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="showcase-section">
          <h2>No Thumbnail</h2>
          <p>VideoPlayer without thumbnail (shows video directly) - default responsive size</p>
          <div className="player-container">
            <VideoPlayer
              src={sampleVideoUrl}
            />
          </div>
        </section>

        <section className="showcase-section">
          <h2>ProgressRing Styles & Positions</h2>
          <p>Different styles and positions for the progress ring - inside vs outside the video player</p>

          <div className="custom-icons-grid">
            <div className="player-demo">
              <h3>Default (Inside, Red)</h3>
              <p>Default red ring inside the video</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#ff0000"
                  progressRingPosition="inside"
                  progressRingOffset={5}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Outside Ring (Blue)</h3>
              <p>Blue ring outside the video player</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#0066ff"
                  progressRingPosition="outside"
                  progressRingOffset={8}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Thick Inside (Green)</h3>
              <p>Thick green ring inside with larger offset</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#00ff66"
                  progressRingStrokeWidth={12}
                  progressRingPosition="inside"
                  progressRingOffset={10}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Thin Outside (Purple)</h3>
              <p>Thin purple ring outside the video</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#9900ff"
                  progressRingStrokeWidth={3}
                  progressRingPosition="outside"
                  progressRingOffset={5}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Orange with Background Track</h3>
              <p>Orange ring with gray background track</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#ff6600"
                  progressRingTrackStrokeColor="#333333"
                  progressRingTrackStrokeWidth={8}
                  progressRingStrokeWidth={6}
                  progressRingPosition="inside"
                  progressRingOffset={8}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Gradient Style (Pink)</h3>
              <p>Pink ring with transparent background</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#ff0066"
                  progressRingBackgroundColor="rgba(255, 0, 102, 0.2)"
                  progressRingStrokeWidth={8}
                  progressRingPosition="outside"
                  progressRingOffset={12}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="showcase-section">
          <h2>Ring Position Comparison</h2>
          <p>Side-by-side comparison of inside vs outside ring positioning</p>

          <div className="custom-icons-grid">
            <div className="player-demo">
              <h3>Inside Position</h3>
              <p>Ring appears inside the video circle</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={200}
                  progressRingStrokeColor="#00ff00"
                  progressRingStrokeWidth={6}
                  progressRingPosition="inside"
                  progressRingOffset={8}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Outside Position</h3>
              <p>Ring appears outside the video circle</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={200}
                  progressRingStrokeColor="#ff0000"
                  progressRingStrokeWidth={6}
                  progressRingPosition="outside"
                  progressRingOffset={8}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="showcase-section">
          <h2>Track Styling Options</h2>
          <p>Different background track styles and configurations</p>

          <div className="custom-icons-grid">
            <div className="player-demo">
              <h3>Thick Track Background</h3>
              <p>Thick gray track with thin red progress</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#ff0000"
                  progressRingTrackStrokeColor="#666666"
                  progressRingTrackStrokeWidth={12}
                  progressRingStrokeWidth={4}
                  progressRingPosition="inside"
                  progressRingOffset={8}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Filled Track</h3>
              <p>Track with solid fill color</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#00ff00"
                  progressRingTrackFill="#333333"
                  progressRingTrackStrokeColor="#555555"
                  progressRingTrackStrokeWidth={8}
                  progressRingStrokeWidth={6}
                  progressRingPosition="outside"
                  progressRingOffset={6}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Square Line Caps</h3>
              <p>Track with square line caps</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#0066ff"
                  progressRingTrackStrokeColor="#cccccc"
                  progressRingTrackStrokeWidth={6}
                  progressRingTrackStrokeLinecap="square"
                  progressRingStrokeWidth={4}
                  progressRingPosition="inside"
                  progressRingOffset={5}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Butt Line Caps</h3>
              <p>Track with butt line caps</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#ff6600"
                  progressRingTrackStrokeColor="#999999"
                  progressRingTrackStrokeWidth={6}
                  progressRingTrackStrokeLinecap="butt"
                  progressRingStrokeWidth={4}
                  progressRingPosition="outside"
                  progressRingOffset={5}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Multi-Layer Track</h3>
              <p>Multiple track layers with different colors</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#ff0066"
                  progressRingTrackStrokeColor="#ffcccc"
                  progressRingTrackStrokeWidth={10}
                  progressRingStrokeWidth={6}
                  progressRingPosition="inside"
                  progressRingOffset={10}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Transparent Track</h3>
              <p>No background track, just progress ring</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#9900ff"
                  progressRingTrackStrokeColor="transparent"
                  progressRingTrackStrokeWidth={0}
                  progressRingStrokeWidth={5}
                  progressRingPosition="outside"
                  progressRingOffset={4}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="showcase-section">
          <h2>Creative Ring Styles</h2>
          <p>Creative and artistic progress ring designs</p>

          <div className="custom-icons-grid">
            <div className="player-demo">
              <h3>Neon Style</h3>
              <p>Bright cyan with glow effect</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#00ffff"
                  progressRingTrackStrokeColor="#001122"
                  progressRingTrackStrokeWidth={6}
                  progressRingStrokeWidth={4}
                  progressRingPosition="outside"
                  progressRingOffset={6}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Gold Luxury</h3>
              <p>Gold ring with dark background</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#ffd700"
                  progressRingTrackStrokeColor="#2a2a2a"
                  progressRingTrackStrokeWidth={10}
                  progressRingStrokeWidth={8}
                  progressRingPosition="inside"
                  progressRingOffset={12}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Minimal White</h3>
              <p>Clean white ring on transparent background</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#ffffff"
                  progressRingTrackStrokeColor="transparent"
                  progressRingTrackStrokeWidth={0}
                  progressRingStrokeWidth={3}
                  progressRingPosition="outside"
                  progressRingOffset={4}
                />
              </div>
            </div>

            <div className="player-demo">
              <h3>Dark Theme</h3>
              <p>Dark ring with light background</p>
              <div className="player-container">
                <VideoPlayer
                  src={sampleVideoUrl}
                  thumbnailSrc={sampleThumbnail}
                  size={180}
                  progressRingStrokeColor="#000000"
                  progressRingTrackStrokeColor="#cccccc"
                  progressRingTrackStrokeWidth={7}
                  progressRingStrokeWidth={5}
                  progressRingPosition="inside"
                  progressRingOffset={6}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="showcase-footer">
        <p>This is a development-only showcase page for testing the VideoPlayer component.</p>
      </footer>
    </div>
  );
};

export default DevShowcase;
