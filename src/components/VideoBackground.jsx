import { useState, useEffect, useRef } from 'react'

const VideoBackground = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Only load video after initial page render for better performance
    const timer = setTimeout(() => {
      setShouldLoadVideo(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Ensure video plays on mobile devices
    if (videoRef.current && shouldLoadVideo) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay prevented:', error)
      })
    }
  }, [shouldLoadVideo, isMobile])

  if (!shouldLoadVideo) {
    // Show static background while video loads
    return <div className="hero-bg-smooth" aria-hidden="true" />
  }

  return (
    <div className="hero-video-container">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        role="presentation"
      >
        <source 
          src={isMobile ? '/mcn_bg_mobile.mp4' : '/mcn_bg_desktop.mp4'} 
          type="video/mp4" 
        />
        <track kind="captions" />
      </video>
      
      {/* Gradient overlay for text readability */}
      <div className="hero-video-overlay" />
    </div>
  )
}

export default VideoBackground
