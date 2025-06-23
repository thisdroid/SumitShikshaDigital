import "./Training.css"
import Navbar from "../components/common_components/Navbar"
import Footer from "../components/common_components/Footer"
const TrainingPage = () => {
  const courses = [
    {
      title: "FULL STACK DEVELOPMENT",
      image: "/images/fullStack.jpg",
      details: [
        "HTML + CSS + PYTHON (Core + Advance + Framework)+ DATABASE",
        "Framework : Django OR Flask",
        "Duration 2 months Internship + Training",
      ],
    },
    {
      title: "FRONT-END DEVELOPMENT",
      image: "/images/FrontEnd.jpg",
      details: ["HTML + CSS +JAVASCRIPT", "JAVASCRIPT + REACT JS/REACT NATIVE", "Duration 45 days"],
    },
    {
      title: "BACK-END DEVELOPMENT",
      image: "/images/backend.jpg",
      details: [
        "PYTHON (CORE + ADVANCE)",
        "Python(Core + Advance + Framework) Framework = Django OR Flask",
        "Duration 45 days",
      ],
    },
  ]

  return (
    <>
      <Navbar />
      <div className="training-page">
        {/* Banner Section */}
        <div className="banner">
          <div className="banner-content">
            <h2>We make sure your idea creation delivered properly</h2>
            <p>Artificial Intelligence is transforming the way</p>
            <a href="/contactus/">
              <button className="btn12345" title="Send Message">
                Send Message
              </button>
            </a>

            {/* Decorative Elements */}
            <div className="shape orange-wave">
              <svg width="30" height="15" viewBox="0 0 30 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 7.5C5 2.5 10 12.5 15 7.5C20 2.5 25 12.5 30 7.5" stroke="#FF9800" strokeWidth="3" />
              </svg>
            </div>

            <div className="shape blue-moon">🌙</div>

            <div className="shape blue-line">
              <svg width="20" height="40" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="10" y1="0" x2="10" y2="40" stroke="#2196F3" strokeWidth="3" />
              </svg>
            </div>

            <div className="shape yellow-circle"></div>
            <div className="shape green-line"></div>
            <div className="shape pink-circle"></div>

            <div className="shape blue-star">★</div>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="main-card-container">
          <h2 className="heading-text">Unlock Your Potentials - Learn & Grow</h2>

          {courses.map((course, index) => (
            <div key={index} className="card-wrapper-container">
              <div className="card-header">
                <div className="circle-container">
                  <div className="main-circle">
                    <img src={course.image || "/placeholder.svg"} alt="Profile" className="circle-image" />
                  </div>
                  <div className="decorative-element element-1"></div>
                  <div className="decorative-element element-2"></div>
                  <div className="decorative-element element-3"></div>
                  <div className="diagonal-line line-1"></div>
                  <div className="diagonal-line line-2"></div>
                  <div className="small-rect rect-1"></div>
                  <div className="small-rect rect-2"></div>
                  <div className="small-rect rect-3"></div>
                  <div className="small-rect rect-4"></div>
                </div>
                <h2 className="header-title">{course.title}</h2>
              </div>
              <div className="card-content">
                {course.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="content-item">
                    <div className="number-badge">{String(detailIndex + 1).padStart(2, "0")}</div>
                    <p className="content-text">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TrainingPage
