import "./PreviewTestimonials.css"

const PreviewTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Harsh Wanjari",
      image: "/placeholder.svg?height=60&width=60",
      text: "Courses and Exams are excellent !!",
      rating: 5,
    },
    {
      id: 2,
      name: "Aditya Bhujade",
      image: "/placeholder.svg?height=60&width=60",
      text: "good platform.",
      rating: 5,
    },
    {
      id: 3,
      name: "Sumit Prasad",
      image: "/placeholder.svg?height=60&width=60",
      text: "good platform for learning and practising aptitude.",
      rating: 5,
    },
    {
      id: 4,
      name: "Deepika Patle",
      image: "/placeholder.svg?height=60&width=60",
      text: "Shiksha Digital – Empowering learning through seamless, secure, and smart online examinations.",
      rating: 5,
    },
    {
      id: 5,
      name: "Sayali Gomkar",
      image: "/placeholder.svg?height=60&width=60",
      text: "A smooth, reliable, and user-friendly platform that made my online exam experience effortless!",
      rating: 5,
    },
    {
      id: 6,
      name: "Taniya Sukhdeve",
      image: "/placeholder.svg?height=60&width=60",
      text: "Courses and Exams are excellent !!",
      rating: 5,
    },
    {
      id: 7,
      name: "Harsh Gour",
      image: "/placeholder.svg?height=60&width=60",
      text: "very good app!!!",
      rating: 5,
    },
  ]

  // Duplicate testimonials for infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="star">
        ★
      </span>
    ))
  }

  return (
    <section className="test">
      <h2 className="section-heading">
        See what others are <span>achieving through learning</span>
      </h2>
      <div className="testimonials">
        <div className="testimonial-text">
          <h2>
            What Our <br />
            Students Say
          </h2>
          <p>
            Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common.
          </p>
          <a href="/testimonials/">
            <button className="gradient-button">View More</button>
          </a>
        </div>

        <div className="testimonial-cards">
          <div className="testimonial-wrapper">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="card1">
                <div className="side-bar1"></div>
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="testimonial-avatar"
                />
                <div className="card1-content">
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.text}</p>
                  <div className="rating">{renderStars(testimonial.rating)}</div>
                  <span className="quote active">❝</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PreviewTestimonials
