import React from 'react';
import { TelebubblePlayer } from '../components';

// Custom icon components for the showcase
const CustomPlayIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polygon points="5,3 19,12 5,21" fill="white" stroke="white" strokeWidth="1" strokeLinejoin="round" />
  </svg>
);

const CustomPauseIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="6" y="4" width="4" height="16" fill="white" rx="2" />
    <rect x="14" y="4" width="4" height="16" fill="white" rx="2" />
  </svg>
);

const HeartPlayIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="white" />
  </svg>
);

const StarPlayIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="white" />
  </svg>
);

const SquarePauseIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="6" y="6" width="12" height="12" fill="white" rx="2" />
  </svg>
);

const NewDevShowcase: React.FC = () => {
  // Use same video and thumbnail as DevShowcase
  const sampleVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const sampleThumbnail = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg";

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem' }}>
        🌀 TelebubblePlayer Showcase
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', width: "100%", minHeight: '400px', maxHeight: '800px' }}>
        <div style={{ width: '100%', height: '100%', maxWidth: '800px', maxHeight: '800px' }}>
          <TelebubblePlayer src={sampleVideoUrl} thumbnailSrc={sampleThumbnail} size="100%">
            <TelebubblePlayer.Track stroke="#ccc" strokeWidth={8} />
            <TelebubblePlayer.Progress strokeColor="#0af" strokeWidth={10} />
            <TelebubblePlayer.Thumb radius={6} fill="#fff" />
            <TelebubblePlayer.Overlay>
              <TelebubblePlayer.ToggleButton
                playIcon={<CustomPlayIcon size={20} />}
                pauseIcon={<CustomPauseIcon size={20} />}
                className="basic-toggle-btn"
              />
            </TelebubblePlayer.Overlay>
          </TelebubblePlayer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>

        {/* Basic Example */}
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '12px', border: '2px solid #444' }}>
          <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '1.2rem' }}>🎯 Basic Usage</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TelebubblePlayer src={sampleVideoUrl} thumbnailSrc={sampleThumbnail} size="200px">
              <TelebubblePlayer.Track stroke="#ccc" strokeWidth={8} />
              <TelebubblePlayer.Progress strokeColor="#0af" strokeWidth={10} />
              <TelebubblePlayer.Thumb radius={6} fill="#fff" />
              <TelebubblePlayer.Overlay>
                <TelebubblePlayer.ToggleButton
                  playIcon={<CustomPlayIcon size={20} />}
                  pauseIcon={<CustomPauseIcon size={20} />}
                  className="basic-toggle-btn"
                />
              </TelebubblePlayer.Overlay>
            </TelebubblePlayer>
          </div>
        </div>

        {/* Track Variations */}
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '12px', border: '2px solid #444' }}>
          <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '1.2rem' }}>🎨 Track Variations</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '10px' }}>Thin Track</p>
              <TelebubblePlayer src={sampleVideoUrl} thumbnailSrc={sampleThumbnail} size="150px">
                <TelebubblePlayer.Track stroke="#666" strokeWidth={4} />
                <TelebubblePlayer.Progress strokeColor="#0af" strokeWidth={6} />
                <TelebubblePlayer.Thumb radius={4} fill="#fff" />
                <TelebubblePlayer.Overlay>
                  <TelebubblePlayer.ToggleButton
                    playIcon={<CustomPlayIcon size={16} />}
                    pauseIcon={<CustomPauseIcon size={16} />}
                    className="basic-toggle-btn"
                  />
                </TelebubblePlayer.Overlay>
              </TelebubblePlayer>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '10px' }}>Thick Track</p>
              <TelebubblePlayer src={sampleVideoUrl} thumbnailSrc={sampleThumbnail} size="150px">
                <TelebubblePlayer.Track stroke="#666" strokeWidth={12} />
                <TelebubblePlayer.Progress strokeColor="#0af" strokeWidth={14} />
                <TelebubblePlayer.Thumb radius={8} fill="#fff" />
                <TelebubblePlayer.Overlay>
                  <TelebubblePlayer.ToggleButton
                    playIcon={<CustomPlayIcon size={16} />}
                    pauseIcon={<CustomPauseIcon size={16} />}
                    className="basic-toggle-btn"
                  />
                </TelebubblePlayer.Overlay>
              </TelebubblePlayer>
            </div>
          </div>
        </div>

        {/* Progress Variations */}
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '12px', border: '2px solid #444' }}>
          <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '1.2rem' }}>⚡ Progress Styles</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '10px' }}>Gradient Progress</p>
              <TelebubblePlayer src={sampleVideoUrl} thumbnailSrc={sampleThumbnail} size="150px">
                <TelebubblePlayer.Track stroke="#333" strokeWidth={8} />
                <TelebubblePlayer.Progress strokeColor="#ff6b6b" strokeWidth={10} />
                <TelebubblePlayer.Thumb radius={6} fill="#ff6b6b" />
                <TelebubblePlayer.Overlay>
                  <TelebubblePlayer.ToggleButton
                    playIcon={<CustomPlayIcon size={16} />}
                    pauseIcon={<CustomPauseIcon size={16} />}
                    className="basic-toggle-btn"
                  />
                </TelebubblePlayer.Overlay>
              </TelebubblePlayer>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '10px' }}>Minimal Progress</p>
              <TelebubblePlayer src={sampleVideoUrl} thumbnailSrc={sampleThumbnail} size="150px">
                <TelebubblePlayer.Track stroke="#555" strokeWidth={6} />
                <TelebubblePlayer.Progress strokeColor="#fff" strokeWidth={8} />
                <TelebubblePlayer.Thumb radius={5} fill="#fff" />
                <TelebubblePlayer.Overlay>
                  <TelebubblePlayer.ToggleButton
                    playIcon={<CustomPlayIcon size={16} />}
                    pauseIcon={<CustomPauseIcon size={16} />}
                    className="basic-toggle-btn"
                  />
                </TelebubblePlayer.Overlay>
              </TelebubblePlayer>
            </div>
          </div>
        </div>

        {/* Thumb Variations */}
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '12px', border: '2px solid #444' }}>
          <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '1.2rem' }}>🎯 Thumb Styles</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '10px' }}>Large Thumb</p>
              <TelebubblePlayer src={sampleVideoUrl} thumbnailSrc={sampleThumbnail} size="150px">
                <TelebubblePlayer.Track stroke="#666" strokeWidth={8} />
                <TelebubblePlayer.Progress strokeColor="#0af" strokeWidth={10} />
                <TelebubblePlayer.Thumb radius={10} fill="#0af" />
                <TelebubblePlayer.Overlay>
                  <TelebubblePlayer.ToggleButton
                    playIcon={<CustomPlayIcon size={16} />}
                    pauseIcon={<CustomPauseIcon size={16} />}
                    className="basic-toggle-btn"
                  />
                </TelebubblePlayer.Overlay>
              </TelebubblePlayer>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '10px' }}>Small Thumb</p>
              <TelebubblePlayer src={sampleVideoUrl} thumbnailSrc={sampleThumbnail} size="150px">
                <TelebubblePlayer.Track stroke="#666" strokeWidth={8} />
                <TelebubblePlayer.Progress strokeColor="#0af" strokeWidth={10} />
                <TelebubblePlayer.Thumb radius={3} fill="#0af" />
                <TelebubblePlayer.Overlay>
                  <TelebubblePlayer.ToggleButton
                    playIcon={<CustomPlayIcon size={16} />}
                    pauseIcon={<CustomPauseIcon size={16} />}
                    className="basic-toggle-btn"
                  />
                </TelebubblePlayer.Overlay>
              </TelebubblePlayer>
            </div>
          </div>
        </div>

        {/* Custom Icons */}
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '12px', border: '2px solid #444' }}>
          <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '1.2rem' }}>🎭 Custom Icons</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '10px' }}>Heart Icons</p>
              <TelebubblePlayer src={sampleVideoUrl} thumbnailSrc={sampleThumbnail} size="150px">
                <TelebubblePlayer.Track stroke="#666" strokeWidth={8} />
                <TelebubblePlayer.Progress strokeColor="#ff6b6b" strokeWidth={10} />
                <TelebubblePlayer.Thumb radius={6} fill="#ff6b6b" />
                <TelebubblePlayer.Overlay>
                  <TelebubblePlayer.ToggleButton
                    playIcon={<HeartPlayIcon size={22} />}
                    pauseIcon={<SquarePauseIcon size={22} />}
                    className="heart-toggle-btn"
                  />
                </TelebubblePlayer.Overlay>
              </TelebubblePlayer>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#ccc', fontSize: '0.9rem', marginBottom: '10px' }}>Star Icons</p>
              <TelebubblePlayer src={sampleVideoUrl} thumbnailSrc={sampleThumbnail} size="150px">
                <TelebubblePlayer.Track stroke="#666" strokeWidth={8} />
                <TelebubblePlayer.Progress strokeColor="#ffd93d" strokeWidth={10} />
                <TelebubblePlayer.Thumb radius={6} fill="#ffd93d" />
                <TelebubblePlayer.Overlay>
                  <TelebubblePlayer.ToggleButton
                    playIcon={<StarPlayIcon size={22} />}
                    pauseIcon={<CustomPauseIcon size={22} />}
                    className="star-toggle-btn"
                  />
                </TelebubblePlayer.Overlay>
              </TelebubblePlayer>
            </div>
          </div>
        </div>

        {/* Overlay Customization */}
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '12px', border: '2px solid #444' }}>
          <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '1.2rem' }}>🎨 Overlay Styling</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TelebubblePlayer src={sampleVideoUrl} thumbnailSrc={sampleThumbnail} size="200px">
              <TelebubblePlayer.Track stroke="#666" strokeWidth={8} />
              <TelebubblePlayer.Progress strokeColor="#7bed9f" strokeWidth={10} />
              <TelebubblePlayer.Thumb radius={6} fill="#7bed9f" />
              <TelebubblePlayer.Overlay className="custom-overlay">
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  padding: '8px',
                  borderRadius: '50%',
                  cursor: 'pointer'
                }}>
                  ⚙️
                </div>
                <TelebubblePlayer.ToggleButton
                  playIcon={<CustomPlayIcon size={24} />}
                  pauseIcon={<CustomPauseIcon size={24} />}
                  className="overlay-toggle-btn"
                />
              </TelebubblePlayer.Overlay>
            </TelebubblePlayer>
          </div>
        </div>

        {/* Advanced Combination */}
        <div style={{ backgroundColor: '#2a2a2a', padding: '20px', borderRadius: '12px', border: '2px solid #444' }}>
          <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '1.2rem' }}>🚀 Advanced Combo</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TelebubblePlayer src={sampleVideoUrl} thumbnailSrc={sampleThumbnail} size="250px">
              <TelebubblePlayer.Track stroke="#2c3e50" strokeWidth={12} />
              <TelebubblePlayer.Progress strokeColor="#e74c3c" strokeWidth={14} />
              <TelebubblePlayer.Thumb radius={9} fill="#e74c3c" />
              <TelebubblePlayer.Overlay className="advanced-overlay">
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  padding: '5px 10px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  color: '#333',
                  fontWeight: 'bold'
                }}>
                  HD
                </div>
                <TelebubblePlayer.ToggleButton
                  playIcon={<CustomPlayIcon size={20} />}
                  pauseIcon={<CustomPauseIcon size={20} />}
                  className="advanced-toggle-btn"
                />
              </TelebubblePlayer.Overlay>
            </TelebubblePlayer>
          </div>
        </div>

      </div>

      {/* CSS for custom styles */}
      <style>{`
        .basic-toggle-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0, 0, 0, 0.7);
          border-radius: 50%;
          padding: 12px;
          transition: all 0.3s ease;
        }

        .basic-toggle-btn:hover {
          background-color: rgba(0, 0, 0, 0.9);
          transform: translate(-50%, -50%) scale(1.1);
        }

        .heart-toggle-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(45deg, #ff6b6b, #ff8e53);
          border-radius: 50%;
          padding: 10px;
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
          transition: all 0.3s ease;
        }

        .heart-toggle-btn:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(255, 107, 107, 0.5);
        }

        .star-toggle-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(45deg, #ffd93d, #ff8e53);
          border-radius: 50%;
          padding: 10px;
          box-shadow: 0 4px 15px rgba(255, 217, 61, 0.3);
          transition: all 0.3s ease;
        }

        .star-toggle-btn:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(255, 217, 61, 0.5);
        }

        .overlay-toggle-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(123, 237, 159, 0.9);
          border-radius: 50%;
          padding: 15px;
          transition: all 0.3s ease;
        }

        .overlay-toggle-btn:hover {
          background-color: rgba(123, 237, 159, 1);
          transform: translate(-50%, -50%) scale(1.1);
        }

        .advanced-toggle-btn {
          position: absolute;
          bottom: 15px;
          right: 15px;
          background-color: rgba(231, 76, 60, 0.9);
          border-radius: 50%;
          padding: 12px;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .advanced-toggle-btn:hover {
          background-color: rgba(231, 76, 60, 1);
          transform: scale(1.1);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .custom-overlay {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default NewDevShowcase;
