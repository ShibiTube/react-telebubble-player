# React Telebubble Player

A customizable, accessible, and modern circular video player React component. Built with TypeScript and BEM SCSS, this library is designed for easy integration and flexible styling in your React projects.

[![NPM version](https://badge.fury.io/js/react-telebubble-player.svg)](http://badge.fury.io/js/react-telebubble-player)

## ⚠️ Experimental Project Notice

**This project is vibe-coded for fun, lulz, and a few personal projects!** 🎉

While it works and has some cool features, **it's not recommended for production applications** as it hasn't been thoroughly tested across all edge cases and environments. This is more of a creative experiment and learning project.

**If you find bugs or issues**, please let me know! I'd appreciate the feedback and will do my best to fix them when I have time.

**Use at your own risk** - but feel free to fork, modify, and make it your own! 🚀

## 🎉 What's New in v0.5.1

- **🎮 External State Management** - `playing` prop for complete external control
- **📞 State Callbacks** - `onPlay`, `onPause`, `onEnded` for state synchronization
- **🔄 Single Source of Truth** - External state takes precedence when provided
- **🧹 Simplified & Cleaner Code** - Better maintainability and performance
- **🎯 New Component API** - Composable sub-components for flexible styling
- **📦 Zero Extra Dependencies** - Removed clsx, using custom utility functions
- **🔧 Path Aliases** - Clean imports with `@` alias
- **🎨 BEM SCSS** - Converted from SCSS modules to BEM methodology

## 🚀 Quick Start

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to see both showcases with a toggle button in the top-right corner

3. Click "New TelebubblePlayer Showcase" to explore the new component structure

## 🎯 Component API Structure

The new TelebubblePlayer uses a composable API with sub-components:

```tsx
<TelebubblePlayer src="video.mp4" size="200px">
  <TelebubblePlayer.Track strokeColor="#666" strokeWidth={8} />
  <TelebubblePlayer.Progress strokeColor="#00aaff" strokeWidth={10} />
  <TelebubblePlayer.Thumb radius={5} fill="#fff" />
  <TelebubblePlayer.Overlay>
    <TelebubblePlayer.ToggleButton
      playIcon={<CustomIcon />}
      pauseIcon={<CustomIcon />}
      className="custom-toggle-btn"
    />
  </TelebubblePlayer.Overlay>
</TelebubblePlayer>
```

## 📦 Installation

```bash
npm install react-telebubble-player
```

or with yarn:

```bash
yarn add react-telebubble-player
```

## 🎮 Basic Usage

```tsx
import { TelebubblePlayer } from 'react-telebubble-player';

export default function App() {
  return (
    <TelebubblePlayer
      src="/path/to/video.mp4"
      size="200px"
      playing={false}
      onPlay={() => console.log('Playing')}
      onPause={() => console.log('Paused')}
      onEnd={() => console.log('Ended')}
    >
      <TelebubblePlayer.Track strokeColor="#ccc" strokeWidth={8} />
      <TelebubblePlayer.Progress strokeColor="#0af" strokeWidth={10} />
      <TelebubblePlayer.Thumb radius={6} fill="#fff" />
      <TelebubblePlayer.Overlay>
        <TelebubblePlayer.ToggleButton />
      </TelebubblePlayer.Overlay>
    </TelebubblePlayer>
  );
}
```

## 🎨 Customization Options

### Main TelebubblePlayer Props
- `src`: Video source URL (required)
- `size`: Player size (number or string, default: "100%")
- `className`: Custom class for the container
- `playing`: External control of play/pause state
- `onPlay`: Called when video starts playing
- `onPause`: Called when video is paused
- `onEnd`: Called when video ends

### Track Props
- `strokeColor`: Background track color
- `strokeWidth`: Track thickness
- `fill`: Track fill color
- `strokeLinecap`: Track line cap style

### Progress Props
- `strokeColor`: Progress indicator color
- `strokeWidth`: Progress thickness
- `fill`: Progress fill color
- `strokeLinecap`: Progress line cap style

### Thumb Props
- `radius`: Thumb size
- `fill`: Thumb color
- `stroke`: Thumb border color
- `strokeWidth`: Thumb border thickness

### ToggleButton Props
- `playIcon`: Custom play icon component
- `pauseIcon`: Custom pause icon component
- `className`: CSS class for styling
- Automatically shows/hides based on playing state

### Overlay Props
- `className`: CSS class for overlay container
- `children`: Any custom elements to display

## 🎭 Custom Icons

```tsx
import { TelebubblePlayer } from 'react-telebubble-player';

const customPlayIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <polygon points="5,3 19,12 5,21" fill="white"/>
  </svg>
);

const customPauseIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="6" y="4" width="4" height="16" fill="white" rx="2"/>
    <rect x="14" y="4" width="4" height="16" fill="white" rx="2"/>
  </svg>
);

export default function App() {
  return (
    <TelebubblePlayer src="/video.mp4">
      <TelebubblePlayer.Track strokeColor="#666" strokeWidth={8} />
      <TelebubblePlayer.Progress strokeColor="#0af" strokeWidth={10} />
      <TelebubblePlayer.Thumb radius={6} fill="#fff" />
      <TelebubblePlayer.Overlay>
        <TelebubblePlayer.ToggleButton
          playIcon={customPlayIcon}
          pauseIcon={customPauseIcon}
          className="custom-toggle-btn"
        />
      </TelebubblePlayer.Overlay>
    </TelebubblePlayer>
  );
}
```

## 🎨 Size Examples

```tsx
// Default responsive size (100%)
<TelebubblePlayer src="/video.mp4" />

// Fixed pixel size
<TelebubblePlayer src="/video.mp4" size={300} />

// CSS size values
<TelebubblePlayer src="/video.mp4" size="50%" />
<TelebubblePlayer src="/video.mp4" size="20rem" />
<TelebubblePlayer src="/video.mp4" size="50vw" />
```

## 🎮 External State Management

Control playback from external state with the `playing` prop and callbacks:

```tsx
import { TelebubblePlayer } from 'react-telebubble-player';
import { useState } from 'react';

function MyComponent() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <TelebubblePlayer
        src="/video.mp4"
        playing={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnd={() => setIsPlaying(false)}
      >
        <TelebubblePlayer.Track strokeColor="#ccc" strokeWidth={8} />
        <TelebubblePlayer.Progress strokeColor="#0af" strokeWidth={10} />
        <TelebubblePlayer.Thumb radius={6} fill="#fff" />
        <TelebubblePlayer.Overlay>
          <TelebubblePlayer.ToggleButton />
        </TelebubblePlayer.Overlay>
      </TelebubblePlayer>
    </div>
  );
}
```

**When external state is provided:**
- Internal state is ignored
- External `playing` prop becomes the single source of truth
- Callbacks sync your external state with video events
- Perfect for Redux, Zustand, Context, or any state management

## 🎨 CSS Styling

The component uses BEM class names for easy styling:

- `.telebubble-player` - Main container
- `.telebubble-player__video-wrapper` - Video container
- `.telebubble-player__video` - Video element
- `.telebubble-player__thumbnail` - Thumbnail image
- `.telebubble-player__thumbnail--hidden` - Hidden thumbnail state
- `.telebubble-player__play-button` - Play button
- `.progress-ring` - Progress ring container
- `.progress-ring__track` - Background track
- `.progress-ring__progress` - Progress indicator
- `.progress-ring__thumb` - Progress thumb
- `.telebubble-toggle-button` - Toggle button
- `.telebubble-overlay` - Overlay container

## 🔄 Migration from Old API

The new API provides a more declarative and composable structure:

**Old API:**
```tsx
<VideoPlayer
  src="video.mp4"
  size="200px"
  playButtonIcon={customIcon}
  progressRingStrokeColor="#00aaff"
  // ... many individual props
/>
```

**New API:**
```tsx
<TelebubblePlayer src="video.mp4" size="200px">
  <TelebubblePlayer.Track strokeColor="#666" />
  <TelebubblePlayer.Progress strokeColor="#00aaff" />
  <TelebubblePlayer.Thumb radius={5} />
  <TelebubblePlayer.Overlay>
    <TelebubblePlayer.ToggleButton icon={customIcon} />
  </TelebubblePlayer.Overlay>
</TelebubblePlayer>
```

## 🎯 Benefits

1. **Composability**: Mix and match components as needed
2. **Flexibility**: Custom styling per component
3. **Maintainability**: Clear component separation
4. **Extensibility**: Easy to add new sub-components
5. **Developer Experience**: Intuitive API structure
6. **Zero Dependencies**: No external CSS libraries required

## 🚀 Development

### Run Development Showcase

The project includes a comprehensive showcase demonstrating all features:

```bash
npm run dev
```

This will start a development server with examples of:
- Basic TelebubblePlayer with default styling
- Track variations (thin/thick, different colors)
- Progress styles (gradient/solid, minimal/bold)
- Thumb styles (large/small, color coordination)
- Custom icons (heart, star, square shapes)
- Overlay customization (positioning, additional UI elements)
- Advanced combinations (complex layouts, multiple elements)

### Build for Production (Library Mode)

```bash
npm run build
```

This creates the distributable library files in the `dist/` directory.

## 🧹 Technical Improvements

- **Path Aliases**: Clean imports with `@` alias instead of relative paths
- **Custom clsx**: Replaced clsx dependency with lightweight utility function
- **BEM SCSS**: Converted from SCSS modules to BEM methodology for better maintainability
- **TypeScript**: Full type safety with proper interfaces and props
- **Zero Runtime Dependencies**: Only React and React DOM as peer dependencies

## 🤝 Contributing

Pull requests and issues are welcome! Please open an issue to discuss your idea or bug before submitting a PR.

## 📄 License

MIT