# 🌀 TelebubblePlayer New Showcase

This document describes the new TelebubblePlayer showcase that demonstrates the sub-component API structure.

## 🚀 Quick Start

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to see both showcases with a toggle button in the top-right corner

3. Click "New TelebubblePlayer Showcase" to explore the new component structure

## 📋 Showcase Features

The new showcase demonstrates:

### 🎯 **Basic Usage**
- Simple TelebubblePlayer with default styling
- Essential props: `src`, `size`, `playing`, `onPlay`, `onPause`, `onEnd`

### 🎨 **Track Variations**
- Thin and thick track configurations
- Different stroke colors and widths
- Customizable background tracks

### ⚡ **Progress Styles**
- Gradient and solid progress indicators
- Minimal and bold styling options
- Color-matched thumbs

### 🎯 **Thumb Styles**
- Large and small thumb variants
- Color coordination with progress
- Custom radius options

### 🎭 **Custom Icons**
- Heart-shaped play buttons
- Star-shaped play buttons
- Square pause buttons
- Custom SVG icons

### 🎨 **Overlay Customization**
- Custom overlay positioning
- Additional UI elements (settings, quality indicators)
- Advanced button placement

### 🚀 **Advanced Combinations**
- Complex overlay layouts
- Multiple custom elements
- Professional video player styling

## 🔧 Component API Structure

```tsx
<TelebubblePlayer src="video.mp4" size="200px">
  <TelebubblePlayer.Track strokeColor="#666" strokeWidth={8} />
  <TelebubblePlayer.Progress strokeColor="#00aaff" strokeWidth={10} />
  <TelebubblePlayer.Thumb radius={5} fill="#fff" />
  <TelebubblePlayer.Overlay>
    <TelebubblePlayer.PlayButton
      icon={<CustomIcon />}
      className="custom-play-btn"
    />
    <TelebubblePlayer.PauseButton
      icon={<CustomIcon />}
      className="custom-pause-btn"
    />
  </TelebubblePlayer.Overlay>
</TelebubblePlayer>
```

## 🎨 Customization Options

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

### PlayButton/PauseButton Props
- `icon`: Custom icon component
- `className`: CSS class for styling
- Automatically shows/hides based on playing state

### Overlay Props
- `className`: CSS class for overlay container
- `children`: Any custom elements to display

## 🎨 CSS Styling

The showcase includes custom CSS for various button styles:

- `.basic-play-btn`, `.basic-pause-btn` - Simple circular buttons
- `.heart-play-btn`, `.heart-pause-btn` - Gradient heart-styled buttons
- `.star-play-btn`, `.star-pause-btn` - Star-themed buttons
- `.overlay-play-btn`, `.overlay-pause-btn` - Overlay-specific styling
- `.advanced-play-btn`, `.advanced-pause-btn` - Professional button styling

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
    <TelebubblePlayer.PlayButton icon={customIcon} />
  </TelebubblePlayer.Overlay>
</TelebubblePlayer>
```

## 🎯 Benefits

1. **Composability**: Mix and match components as needed
2. **Flexibility**: Custom styling per component
3. **Maintainability**: Clear component separation
4. **Extensibility**: Easy to add new sub-components
5. **Developer Experience**: Intuitive API structure

## 🚀 Next Steps

- Explore the showcase by clicking different examples
- Customize the styling by modifying CSS classes
- Create your own custom icons and components
- Experiment with different combinations of sub-components
