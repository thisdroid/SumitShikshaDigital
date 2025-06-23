
import { useState, useEffect } from "react"
import "./TrainingPromo.css"

const TrainingPromo = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 16,
    minutes: 0,
    seconds: 56,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="training-promo-container">
      {/* Heading */}
      <div className="training-promo-heading">
        <h2>
          Pricing & <span className="training-highlight">Training</span>
        </h2>
      </div>

      <div className="training-promo-grid">
        {/* Limited Time Offer Card */}
        <div className="training-promo-card training-special-offer">
          <div className="training-promo-badge">Limited Offer</div>
          <div className="training-card-content">
            <div className="training-card-header">
              <svg className="training-rocket-icon" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
              <h3>Premium Learning Package</h3>
            </div>

            <div className="training-price-section">
              <div className="training-price-row">
                <span className="training-original-price">₹24,999</span>
                <span className="training-current-price">₹14,999</span>
                <span className="training-discount">Save 40%</span>
              </div>
            </div>

            <ul className="training-benefits-list">
              <li>
                <svg className="training-check-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Full 6 months access
              </li>
              <li>
                <svg className="training-check-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                24/7 priority support
              </li>
              <li>
                <svg className="training-check-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Exclusive resources
              </li>
              <li>
                <svg className="training-check-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Certificate included
              </li>
            </ul>

            <a href="/student/studentsignup" className="training-cta-btn">
              Enroll Now
              <svg className="training-arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            <div className="training-countdown">
              <span className="countdown-label">Offer ends in:</span>
              <div className="training-timer">
                <span className="time-unit">
                  <span className="time-value">{timeLeft.days.toString().padStart(2, "0")}</span>d
                </span>
                <span className="time-unit">
                  <span className="time-value">{timeLeft.hours.toString().padStart(2, "0")}</span>h
                </span>
                <span className="time-unit">
                  <span className="time-value">{timeLeft.minutes.toString().padStart(2, "0")}</span>m
                </span>
                <span className="time-unit">
                  <span className="time-value">{timeLeft.seconds.toString().padStart(2, "0")}</span>s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Training Card */}
        <div className="training-promo-card">
          <div className="training-card-image">
            <img src="/training_development.webp?height=180&width=350" alt="AI Training" />
            <div className="training-image-label training-new">
              <span>New</span>
            </div>
          </div>
          <div className="training-card-content">
            <h3>AI Training Program</h3>
            <p>Master artificial intelligence with our comprehensive training designed for all skill levels.</p>

            <div className="training-card-footer">
              <div className="training-rating">
                <div className="training-stars">
                  <svg className="training-star" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg className="training-star" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg className="training-star" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg className="training-star" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg className="training-star-half" fill="currentColor" viewBox="0 0 20 20">
                    <defs>
                      <linearGradient id="half-fill">
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="#e5e7eb" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#half-fill)"
                      d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                    />
                  </svg>
                </div>
                <span>4.7 (128 reviews)</span>
              </div>
              <a href="/training/" className="training-card-btn">
                Explore All
                <svg className="training-chevron-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Specialized Courses Card */}
        <div className="training-promo-card">
          <div className="training-card-image">
            <img src="/specialized_courses.webp?height=180&width=350" alt="Specialized Courses" />
            <div className="training-image-label training-popular">
              <span>Popular</span>
            </div>
          </div>
          <div className="training-card-content">
            <h3>Specialized Courses</h3>
            <p>Discover our curated selection of courses across various cutting-edge technologies.</p>

            <div className="training-card-footer">
              <div className="training-rating">
                <div className="training-stars">
                  <svg className="training-star" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg className="training-star" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg className="training-star" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg className="training-star" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <svg className="training-star" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </div>
                <span>4.9 (256 reviews)</span>
              </div>
              <a href="/home_course_list/" className="training-card-btn">
                Browse All
                <svg className="training-chevron-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainingPromo
