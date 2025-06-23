import { useState, useEffect } from "react"
import { BarChart3, Shield, Users } from "lucide-react"
import "./College.css"
import Navbar from "../components/common_components/Navbar"

const College = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
    <Navbar />
    <div className="examination-platform">
      {/* Animated Background */}
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
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🎓 Welcome to the Future of Education</span>
            </div>
            <h1 className="hero-title">
              Hello <span className="highlight">College,</span>
            </h1>
            <h2 className="hero-subtitle">Welcome to Our Online Examination Platform</h2>
            <p className="hero-description">
              Transform your examination process with our comprehensive digital
              <br />
              solution designed for educational institutions
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">
                <span className="btn-icon">+</span>
                <span>CREATE ACCOUNT</span>
                <div className="btn-shine"></div>
              </button>
              <button className="btn-secondary">
                <span className="btn-icon">→</span>
                <span>LOGIN NOW</span>
                <div className="btn-ripple"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features for Modern Education</h2>
            <p className="section-subtitle">Everything you need to manage examinations efficiently</p>
          </div>

          <div className="features-grid">
            {/* Dashboard Analytics Card */}
            <div className="feature-card card-analytics">
              <div className="card-header">
                <div className="feature-icon">
                  <BarChart3 size={32} />
                </div>
                <div className="card-glow"></div>
              </div>
              <div className="card-content"> 
                <h3 className="feature-title">Dashboard Analytics</h3>
                <p className="feature-description">
                  Real-time insights into student performance and exam statistics with advanced reporting tools
                </p>
                <div className="feature-stats">
                  <div className="stat">
                    <span className="stat-number">95%</span>
                    <span className="stat-label">Accuracy</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Monitoring</span>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="learn-more-btn">Learn More</button>
              </div>
            </div>

            {/* Secure Platform Card */}
            <div className="feature-card card-security">
              <div className="card-header">
                <div className="feature-icon">
                  <Shield size={32} />
                </div>
                <div className="card-glow"></div>
              </div>
              <div className="card-content">
                <h3 className="feature-title">Secure Platform</h3>
                <p className="feature-description">
                  Enterprise-grade security to protect your examination data with end-to-end encryption
                </p>
                <div className="security-badges">
                  <span className="badge">SSL Encrypted</span>
                  <span className="badge">GDPR Compliant</span>
                  <span className="badge">ISO 27001</span>
                </div>
              </div>
              <div className="card-footer">
                <button className="learn-more-btn">Learn More</button>
              </div>
            </div>

            {/* Student Management Card */}
            <div className="feature-card card-management">
              <div className="card-header">
                <div className="feature-icon">
                  <Users size={32} />
                </div>
                <div className="card-glow"></div>
              </div>
              <div className="card-content">
                <h3 className="feature-title">Student Management</h3>
                <p className="feature-description">
                  Easily organize and manage all your students in one place with bulk operations and smart filtering
                </p>
                <div className="management-features">
                  <div className="feature-item">✓ Bulk Import/Export</div>
                  <div className="feature-item">✓ Smart Grouping</div>
                  <div className="feature-item">✓ Progress Tracking</div>
                </div>
              </div>
              <div className="card-footer">
                <button className="learn-more-btn">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>Ready to Transform Your Examination Process?</h2>
              <p>Join thousands of educational institutions already using our platform</p>
              <div className="cta-buttons">
                <button className="btn-cta-primary">Start Free Trial</button>
                <button className="btn-cta-secondary">Schedule Demo</button>
              </div>
            </div>
            <div className="cta-visual">
              <div className="floating-elements">
                <div className="element element-1">📊</div>
                <div className="element element-2">🔒</div>
                <div className="element element-3">👥</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default College