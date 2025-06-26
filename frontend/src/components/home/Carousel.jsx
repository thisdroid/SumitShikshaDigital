

import { useState, useEffect } from "react"
import { Cloud, Shield, Database, Code, Cpu, Server, Smartphone, Wifi, Settings, Zap, Globe, Lock, Monitor, Layers, GitBranch } from 'lucide-react'
import styles from "./Carousel.module.css"
import { Link } from "react-router-dom"

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "REVOLUTIONIZE YOUR LEARNING",
      subtitle:
        "Discover groundbreaking educational programs that combine cutting-edge pedagogy with real-world applications.",
      buttonText: "Enroll Now",
      background: "#0155d3",
      image: "/images/hero1.png",
    },
    {
      title: "LAUNCH YOUR CAREER",
      subtitle:
        "Gain real-world experience through our intensive training programs and exclusive internship opportunities.",
      buttonText: "Training Programs",
      background: "#fb6795",
      image: "/images/hero3.png",
    },
    {
      title: "TECH MASTERY",
      subtitle:
        "Immerse yourself in the latest technologies with our hands-on, project-based curriculum designed by industry leaders.",
      buttonText: "Contact Us",
      background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)",
      image: null,
    },
  ]

  const techIcons = [
    { Icon: Cloud, top: "10%", right: "15%" },
    { Icon: Shield, top: "20%", right: "25%" },
    { Icon: Database, top: "15%", right: "35%" },
    { Icon: Code, top: "25%", right: "45%" },
    { Icon: Cpu, top: "35%", right: "20%" },
    { Icon: Server, top: "40%", right: "40%" },
    { Icon: Smartphone, top: "30%", right: "55%" },
    { Icon: Wifi, top: "45%", right: "30%" },
    { Icon: Settings, top: "50%", right: "50%" },
    { Icon: Zap, top: "55%", right: "25%" },
    { Icon: Globe, top: "60%", right: "45%" },
    { Icon: Lock, top: "65%", right: "35%" },
    { Icon: Monitor, top: "70%", right: "55%" },
    { Icon: Layers, top: "75%", right: "40%" },
    { Icon: GitBranch, top: "80%", right: "30%" },
  ]

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div
        className={`${styles.carouselContainer} ${styles.theme}`}
        style={{
          background: slides[currentSlide].background,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div className={styles.carouselContent}>
          {/* Tech Icons and Floating Dots - Only show on third slide */}
          {currentSlide === 2 && (
            <>
              {/* Tech Icons */}
              <div className={styles.techIconsContainer}>
                {techIcons.map((item, index) => {
                  const IconComponent = item.Icon
                  return (
                    <div
                      key={index}
                      className={styles.techIcon}
                      style={{
                        top: item.top,
                        right: item.right,
                      }}
                    >
                      <IconComponent className={styles.techIconSvg} />
                    </div>
                  )
                })}
              </div>

              {/* Floating Dots */}
              <div className={styles.floatingDotsContainer}>
                <div className={styles.floatingDot} style={{ top: "20%", left: "10%" }} />
                <div className={styles.floatingDot} style={{ top: "40%", left: "20%" }} />
                <div className={styles.floatingDot} style={{ top: "60%", left: "15%" }} />
                <div className={styles.floatingDot} style={{ top: "80%", left: "25%" }} />
                <div className={styles.floatingDot} style={{ top: "30%", right: "10%" }} />
                <div className={styles.floatingDot} style={{ top: "50%", right: "5%" }} />
                <div className={styles.floatingDot} style={{ top: "70%", right: "15%" }} />
                <div className={styles.floatingDot} style={{ top: "90%", right: "20%" }} />
              </div>
            </>
          )}

          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Text Content */}
            <div className={`${styles.textContent} ${currentSlide === 2 ? styles.slideTechMastery : ""}`}>
              <h1
                className={styles.carouselTitle}
                style={{
                  textShadow: currentSlide === 2 ? "0 0 10px rgba(6, 182, 212, 0.3)" : "0 2px 4px rgba(0, 0, 0, 0.3)",
                  color: currentSlide === 2 ? "#06b6d4" : "white",
                }}
              >
                {slides[currentSlide].title}
              </h1>
              <p className={styles.carouselSubtitle}>{slides[currentSlide].subtitle}</p>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.carouselButton}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.5)"
                    e.target.style.transform = "translateY(-2px)"
                    e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  {slides[currentSlide].buttonText}
                </button>
              </div>
            </div>

            {/* Hero Image */}
            {slides[currentSlide].image && (
              <div className={styles.imageContainer}>
                <img
                  src={slides[currentSlide].image || "/placeholder.svg"}
                  alt={slides[currentSlide].title}
                  className={styles.heroImage}
                  draggable="false"
                />
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <button
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            onClick={prevSlide}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
              e.target.style.transform = "translateY(-50%) scale(1.1)"
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
              e.target.style.transform = "translateY(-50%) scale(1)"
            }}
          >
            &#9664;
          </button>

          <button
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={nextSlide}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
              e.target.style.transform = "translateY(-50%) scale(1.1)"
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
              e.target.style.transform = "translateY(-50%) scale(1)"
            }}
          >
            &#9654;
          </button>

          {/* Slide Indicators */}
          <div className={styles.slideIndicators}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentSlide ? styles.indicatorActive : ""}`}
                style={{
                  backgroundColor: index === currentSlide ? "#06b6d4" : "rgba(255, 255, 255, 0.3)",
                }}
                onClick={() => setCurrentSlide(index)}
                onMouseEnter={(e) => {
                  if (index !== currentSlide) {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentSlide) {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Carousel;