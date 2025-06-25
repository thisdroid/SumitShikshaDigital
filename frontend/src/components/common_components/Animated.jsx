import { useState, useEffect } from "react"
import styles from "./Animated.module.css"

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
    <div className={styles.animatedBackground}>
      <div className={styles.floatingShapes}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
        <div className={`${styles.shape} ${styles.shape4}`}></div>
        <div className={`${styles.shape} ${styles.shape5}`}></div>
      </div>
      <div
        className={styles.mouseFollower}
        style={{
          left: `${mousePosition.x - 100}px`,
          top: `${mousePosition.y - 100}px`,
        }}
      ></div>
    </div>
  )
}

export default AnimatedBackground
