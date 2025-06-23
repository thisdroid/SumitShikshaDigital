import React from "react"
import { useState, useEffect } from "react"
import {
  Cloud,
  Shield,
  Database,
  Code,
  Cpu,
  Server,
  Smartphone,
  Wifi,
  Settings,
  Zap,
  Globe,
  Lock,
  Monitor,
  Layers,
  GitBranch,
} from "lucide-react"
// import hero1 from '../assets/hero1.png';
// import hero2 from '../assets/hero2.png';


const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "REVOLUTIONIZE YOUR LEARNING",
      subtitle:
        "Discover groundbreaking educational programs that combine cutting-edge pedagogy with real-world applications.",
      buttonText: "Enroll Now",
      background: "#0155d3",
      image: "/images/hero1.png", // Replace with actual image import if needed
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;800&display=swap');
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        .tech-icon {
          animation: float 6s ease-in-out infinite;
        }
        
        .tech-icon:nth-child(odd) {
          animation-delay: -2s;
        }
        
        .tech-icon:nth-child(even) {
          animation-delay: -4s;
        }
        
        .floating-dot {
          animation: float 8s ease-in-out infinite;
        }
        
        .floating-dot:nth-child(1) { animation-delay: 0s; }
        .floating-dot:nth-child(2) { animation-delay: -1s; }
        .floating-dot:nth-child(3) { animation-delay: -2s; }
        .floating-dot:nth-child(4) { animation-delay: -3s; }
        .floating-dot:nth-child(5) { animation-delay: -4s; }
        .floating-dot:nth-child(6) { animation-delay: -5s; }
        .floating-dot:nth-child(7) { animation-delay: -6s; }
        .floating-dot:nth-child(8) { animation-delay: -7s; }
      `}</style>

      <div
        className="w-full relative overflow-hidden"
        style={{
          height: "80vh",
          background: slides[currentSlide].background,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div className="w-full relative" style={{ height: "80vh" }}>
          {/* Tech Icons and Floating Dots - Only show on third slide */}
          {currentSlide === 2 && (
            <>
              {/* Tech Icons */}
              <div className="absolute w-full h-full pointer-events-none">
                {techIcons.map((item, index) => (
                  <div
                    key={index}
                    className="tech-icon absolute w-12 h-12 rounded-full flex items-center justify-center border-2 border-cyan-400"
                    style={{
                      top: item.top,
                      right: item.right,
                      backgroundColor: "rgba(6, 182, 212, 0.1)",
                    }}
                  >
                    <item.Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                ))}
              </div>

              {/* Floating Dots */}
              <div className="absolute w-full h-full pointer-events-none">
                <div
                  className="floating-dot absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                  style={{ top: "20%", left: "10%" }}
                />
                <div
                  className="floating-dot absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                  style={{ top: "40%", left: "20%" }}
                />
                <div
                  className="floating-dot absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                  style={{ top: "60%", left: "15%" }}
                />
                <div
                  className="floating-dot absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                  style={{ top: "80%", left: "25%" }}
                />
                <div
                  className="floating-dot absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                  style={{ top: "30%", right: "10%" }}
                />
                <div
                  className="floating-dot absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                  style={{ top: "50%", right: "5%" }}
                />
                <div
                  className="floating-dot absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                  style={{ top: "70%", right: "15%" }}
                />
                <div
                  className="floating-dot absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                  style={{ top: "90%", right: "20%" }}
                />
              </div>
            </>
          )}

          {/* Main Content */}
          <div className="w-full h-full flex items-center justify-between px-8 max-w-7xl mx-auto relative z-10">
            {/* Text Content */}
            <div className="flex flex-col justify-center max-w-[50%] pr-8">
              <h1
                className="font-extrabold mb-6 leading-tight uppercase text-white tracking-tight"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  textShadow: currentSlide === 2 ? "0 0 10px rgba(6, 182, 212, 0.3)" : "0 2px 4px rgba(0, 0, 0, 0.3)",
                  color: currentSlide === 2 ? "#06b6d4" : "white",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {slides[currentSlide].title}
              </h1>
              <p
                className="mb-10 leading-relaxed text-white font-normal max-w-[85%]"
                style={{
                  fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
                  opacity: 0.9,
                }}
              >
                {slides[currentSlide].subtitle}
              </p>
              <button
                className="text-white px-8 py-3.5 border-none rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 w-fit border-2"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  fontFamily: "Poppins, sans-serif",
                }}
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

            {/* Hero Image */}
            {slides[currentSlide].image && (
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: "min(500px, 40vw)",
                  height: "min(500px, 40vw)",
                }}
              >
                <img
                  src={slides[currentSlide].image || "/placeholder.svg"}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-none cursor-pointer transition-all duration-300 left-8 text-white text-xl"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
            }}
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
            className="absolute top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border-none cursor-pointer transition-all duration-300 right-8 text-white text-xl"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
            }}
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
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-2 border-none rounded cursor-pointer transition-all duration-300 ${
                  index === currentSlide ? "bg-cyan-400 w-16" : "w-12"
                }`}
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

        {/* Responsive Styles */}
        <style>{`
          @media (max-width: 1024px) {
            .hero-image {
              width: min(400px, 35vw) !important;
              height: min(400px, 35vw) !important;
            }
            .content-wrapper {
              max-width: 55% !important;
              padding-right: 1.5rem !important;
            }
            .tech-icon {
              width: 2.5rem !important;
              height: 2.5rem !important;
            }
            .tech-icon svg {
              width: 1.25rem !important;
              height: 1.25rem !important;
            }
          }

          @media (max-width: 768px) {
            .carousel-container {
              height: 70vh !important;
            }
            .carousel-content {
              flex-direction: column !important;
              text-align: center !important;
              padding: 1rem !important;
              gap: 2rem !important;
            }
            .content-wrapper {
              max-width: 100% !important;
              padding-right: 0 !important;
              order: 2 !important;
            }
            .hero-image {
              width: min(300px, 60vw) !important;
              height: min(300px, 60vw) !important;
              order: 1 !important;
            }
            .tech-icon {
              width: 2rem !important;
              height: 2rem !important;
            }
            .tech-icon svg {
              width: 1rem !important;
              height: 1rem !important;
            }
          }

          @media (max-width: 640px) {
            .carousel-container {
              height: 60vh !important;
            }
            .carousel-content {
              padding: 1rem !important;
            }
            .hero-image {
              width: min(250px, 70vw) !important;
              height: min(250px, 70vw) !important;
            }
            .content-wrapper {
              max-width: 100% !important;
            }
          }
        `}</style>
      </div>
    </>
  )
}

export default Carousel