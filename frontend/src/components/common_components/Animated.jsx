import { useState, useEffect } from "react"
import "./Animated.css"

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="animated-background"> 
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>
      <div
        className="mouse-follower"
        style={{
          left: `${mousePosition.x - 100}px`,
          top: `${mousePosition.y - 100}px`,
        }}
      ></div>
    </div>
  )
}

export default AnimatedBackground