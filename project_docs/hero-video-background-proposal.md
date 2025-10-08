# Hero Section Video Background Design Proposal

## Overview
This proposal outlines a new hero section design that replaces the current static background image with responsive video backgrounds:
- **Mobile**: `public/mcn_bg_mobile.mp4`
- **Desktop**: `public/mcn_bg_desktop.mp4`

## Design Goals
1. **Immersive Experience**: Create a more dynamic and engaging first impression
2. **Performance**: Ensure smooth playback without impacting page load times
3. **Accessibility**: Maintain readability and respect user preferences
4. **Responsive**: Seamlessly adapt between mobile and desktop experiences

## Technical Implementation

### 1. Video Background Component Structure

```jsx
// New VideoBackground component
const VideoBackground = () => {
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="hero-video-container">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        poster="/mcn-2.png" // Fallback poster image
      >
        <source 
          src={isMobile ? '/mcn_bg_mobile.mp4' : '/mcn_bg_desktop.mp4'} 
          type="video/mp4" 
        />
      </video>
      
      {/* Gradient overlay for text readability */}
      <div className="hero-video-overlay" />
    </div>
  )
}
```

### 2. CSS Styling

```css
/* Video Background Container */
.hero-video-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
  filter: grayscale(0.3) contrast(1.1) brightness(0.85);
  backface-visibility: hidden;
  will-change: transform;
}

/* Enhanced overlay for better text contrast */
.hero-video-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(251, 249, 247, 0.4) 0%,
    rgba(248, 240, 230, 0.6) 40%,
    rgba(245, 235, 220, 0.75) 70%,
    rgba(243, 230, 210, 0.85) 100%
  );
  backdrop-filter: blur(2px);
  mix-blend-mode: screen;
}

/* Additional subtle texture overlay */
.hero-video-overlay::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.03) 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, rgba(205, 133, 63, 0.03) 1px, transparent 1px);
  background-size: 50px 50px, 80px 80px;
  opacity: 0.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-video {
    filter: grayscale(0.4) contrast(1.05) brightness(0.8);
  }
  
  .hero-video-overlay {
    background: radial-gradient(
      circle at 50% 50%,
      rgba(251, 249, 247, 0.5) 0%,
      rgba(248, 240, 230, 0.7) 40%,
      rgba(245, 235, 220, 0.85) 70%,
      rgba(243, 230, 210, 0.92) 100%
    );
  }
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .hero-video {
    animation: none;
    display: none;
  }
  
  /* Fallback to static image */
  .hero-video-container::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("/mcn-2.png");
    background-size: cover;
    background-position: center;
    filter: grayscale(1) contrast(0.9) brightness(0.94);
  }
}
```

### 3. Performance Optimizations

#### Lazy Loading Strategy
```jsx
const VideoBackground = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  
  useEffect(() => {
    // Only load video after initial page render
    const timer = setTimeout(() => {
      setShouldLoadVideo(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (!shouldLoadVideo) {
    return (
      <div className="hero-bg-smooth" aria-hidden="true" />
    )
  }
  
  return <VideoBackground />
}
```

#### Preload Hints
```html
<!-- Add to index.html -->
<link rel="preload" as="video" href="/mcn_bg_desktop.mp4" media="(min-width: 768px)">
<link rel="preload" as="video" href="/mcn_bg_mobile.mp4" media="(max-width: 767px)">
```

### 4. Accessibility Considerations

```jsx
<video
  ref={videoRef}
  className="hero-video"
  autoPlay
  loop
  muted
  playsInline
  poster="/mcn-2.png"
  aria-hidden="true" // Decorative video
  role="presentation"
>
  <source 
    src={isMobile ? '/mcn_bg_mobile.mp4' : '/mcn_bg_desktop.mp4'} 
    type="video/mp4" 
  />
  <track kind="captions" /> {/* Empty track for compliance */}
</video>
```

## Design Features

### 1. **Smooth Transitions**
- Fade-in effect when video loads
- Seamless switch between mobile/desktop on resize
- Graceful fallback to poster image

### 2. **Enhanced Visual Hierarchy**
- Gradient overlay ensures text remains readable
- Subtle texture overlay maintains the "sandy" aesthetic
- Video filter creates cohesive brand feel

### 3. **Interactive Elements Preserved**
- Cursor-following sandy mask effect still works
- Character hover animations remain intact
- All existing animations complement the video

### 4. **Performance Metrics**
- Video loads after critical content
- Compressed video files for faster delivery
- Automatic pause when tab is inactive (optional)

## Implementation Checklist

- [ ] Create VideoBackground component
- [ ] Add responsive video switching logic
- [ ] Implement CSS styling with overlays
- [ ] Add performance optimizations (lazy loading)
- [ ] Test on various devices and browsers
- [ ] Verify accessibility compliance
- [ ] Add fallback for reduced motion preference
- [ ] Optimize video file sizes if needed
- [ ] Test with slow network conditions
- [ ] Verify text readability across all states

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile Safari (iOS 12+)
- ✅ Chrome Mobile (Android 5+)

### Fallback Strategy
- Static image for browsers without video support
- Poster image displays during loading
- Reduced motion users see static background

## File Size Considerations

### Recommended Video Specs
- **Desktop Video**: 1920x1080, H.264, ~2-3MB, 10-15 seconds loop
- **Mobile Video**: 720x1280, H.264, ~1-2MB, 10-15 seconds loop
- **Compression**: Use tools like HandBrake or FFmpeg for optimization

### Example FFmpeg Commands
```bash
# Desktop video optimization
ffmpeg -i mcn_bg_desktop.mp4 -vcodec h264 -crf 28 -preset slow -vf scale=1920:1080 -an mcn_bg_desktop_optimized.mp4

# Mobile video optimization
ffmpeg -i mcn_bg_mobile.mp4 -vcodec h264 -crf 30 -preset slow -vf scale=720:1280 -an mcn_bg_mobile_optimized.mp4
```

## Alternative Approaches

### Option A: Single Video with CSS Cropping
- Use one high-quality video
- Crop differently for mobile/desktop via CSS
- Pros: Single file to manage
- Cons: Larger file size for mobile users

### Option B: Animated Background (CSS/Canvas)
- Create animated gradient/particle effect
- No video files needed
- Pros: Smaller file size, more control
- Cons: Less cinematic feel

### Option C: Hybrid Approach
- Video on desktop only
- Animated gradient on mobile
- Pros: Best performance on mobile
- Cons: Inconsistent experience

## Recommended Approach

**Primary Recommendation**: Implement the dual-video approach with:
1. Separate optimized videos for mobile/desktop
2. Lazy loading after initial render
3. Graceful fallbacks for all scenarios
4. Maintained sandy mask and text animations

This provides the best balance of:
- Visual impact
- Performance
- Accessibility
- User experience consistency

## Next Steps

1. **Review & Approve**: Stakeholder review of this proposal
2. **Video Optimization**: Ensure video files are properly compressed
3. **Implementation**: Build VideoBackground component
4. **Testing**: Cross-browser and device testing
5. **Deployment**: Staged rollout with monitoring

## Questions to Consider

1. Should the video pause when the user scrolls past the hero section?
2. Do we want a play/pause control for user preference?
3. Should we add a loading progress indicator?
4. What's the fallback strategy for very slow connections?
5. Should we detect data-saver mode and skip video?

---

**Status**: Proposal Ready for Review  
**Estimated Implementation Time**: 4-6 hours  
**Risk Level**: Low (with proper fallbacks)  
**Impact**: High (significantly enhanced user experience)
