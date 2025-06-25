import styles from "./previewTestimonials.module.css"

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
      <span key={index} className={styles.star}>
        ★
      </span>
    ))
  }

  return (
    <section id="preview-testimonials" className={`${styles.test} ${styles.theme}`}>
      <h2 className={styles.sectionHeading}>
        See what others are <span>achieving through learning</span>
      </h2>
      <div className={styles.testimonials}>
        <div className={styles.testimonialText}>
          <h2>
            What Our <br />
            Students Say
          </h2>
          <p>
            Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common.
          </p>
          <a href="/testimonials/">
            <button className={styles.gradientButton}>View More</button>
          </a>
        </div>

        <div className={styles.testimonialCards}>
          <div className={styles.testimonialWrapper}>
            {duplicatedTestimonials.map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className={styles.card1}>
                <div className={styles.sideBar1}></div>
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className={styles.testimonialAvatar}
                />
                <div className={styles.card1Content}>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.text}</p>
                  <div className={styles.rating}>{renderStars(testimonial.rating)}</div>
                  <span className={`${styles.quote} ${styles.active}`}>❝</span>
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