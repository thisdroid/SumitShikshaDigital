// VideoPlayer.jsx
import React from "react"

const VideoPlayer = ({ type, url, className = "" }) => {
  if (type === "youtube") {
    let src = url
    if (!src.includes("embed")) {
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/)
      const id = match ? match[1] : ""
      src = `https://www.youtube.com/embed/${id}?autoplay=0&rel=0&modestbranding=1`
    }
    return (
      <iframe
        className={className}
        src={src}
        title="YouTube Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }
  if (type === "vimeo") {
    let src = url
    if (!src.includes("player.vimeo.com")) {
      const match = url.match(/vimeo\.com\/(\d+)/)
      const id = match ? match[1] : ""
      src = `https://player.vimeo.com/video/${id}`
    }
    return (
      <iframe
        className={className}
        src={src}
        title="Vimeo Video"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    )
  }
  if (type === "mp4") {
    // Google Drive fallback
    if (url.includes("drive.google.com")) {
      // Extract file ID and use Google Drive preview embed
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
      const id = match ? match[1] : ""
      const embedUrl = `https://drive.google.com/file/d/${id}/preview`
      return (
        <iframe
          className={className}
          src={embedUrl}
          title="Google Drive Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )
    }
    // Normal mp4
    return (
      <video
        className={className}
        src={url}
        controls
      />
    )
  }
  return null
}

export default VideoPlayer