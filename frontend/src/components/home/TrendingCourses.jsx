import { useEffect } from "react"
import { Link } from "react-router-dom"
import styles from './TrendingCourses.module.css'

const TrendingCourses = () => {
  // Sample course data matching the original structure
  const courses = [
    {
      id: 1,
      title: "Prompt Engineering",
      description: "Highly Innovative Course",
      currentPrice: "1499.0",
      originalPrice: "10990",
      image: "/images/prompt_engineering.png",
    },
    {
      id: 2,
      title: "Cyber Security",
      description: "Essential for Protection",
      currentPrice: "1499.0",
      originalPrice: "10990",
      image: "/images/cyber_security.png",
    },
    {
      id: 3,
      title: "AI Analysis",
      description: "Future-Ready Skill",
      currentPrice: "1499.0",
      originalPrice: "10990",
      image: "/images/ai_analysis.png",
    },
  ]

  useEffect(() => {
    const aiIconContainer = document.getElementById("aiIconContainer");

    // Clear previously appended icons to prevent duplication
    if (aiIconContainer) aiIconContainer.innerHTML = "";

    const aiIcons = [
      "html5", "css3", "javascript", "react", "python",
      "flask", "nodejs", "nextjs", "tailwindcss", "mongodb",
      "express", "docker", "firebase", "git"
    ];

    const totalIcons = 16;

    const generateRandomValue = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < totalIcons; i++) {
      const icon = aiIcons[Math.floor(Math.random() * aiIcons.length)];

      const img = document.createElement("img");
      img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}/${icon}-original.svg`;
      img.alt = `${icon} icon`;
      img.loading = "lazy";

      // Random initial position
      const xPos = Math.random() * 90;
      const yPos = Math.random() * 90;
      img.style.top = `${yPos}%`;
      img.style.left = `${xPos}%`;

      // Set random animation variables
      img.style.setProperty("--ai-x-move1", generateRandomValue(-100, 100));
      img.style.setProperty("--ai-y-move1", generateRandomValue(-100, 100));
      img.style.setProperty("--ai-rotate-move1", generateRandomValue(-360, 360));
      img.style.setProperty("--ai-scale1", generateRandomValue(0.8, 1.2));

      img.style.setProperty("--ai-x-move2", generateRandomValue(-150, 150));
      img.style.setProperty("--ai-y-move2", generateRandomValue(-150, 150));
      img.style.setProperty("--ai-rotate-move2", generateRandomValue(-720, 720));
      img.style.setProperty("--ai-scale2", generateRandomValue(0.7, 1.3));

      img.style.setProperty("--ai-x-move3", generateRandomValue(-100, 100));
      img.style.setProperty("--ai-y-move3", generateRandomValue(-100, 100));
      img.style.setProperty("--ai-rotate-move3", generateRandomValue(-360, 360));
      img.style.setProperty("--ai-scale3", generateRandomValue(0.8, 1.2));

      aiIconContainer.appendChild(img);
    }
  }, []);

  return (
    <div className={styles.theme} id="trending-courses">
      <a href="#3-course-slider" className={styles.exploreMore}>
        Explore More
      </a>
      <div className={styles.aiTrendingContainer} id="3-course-slider">
        <div className={styles.aiTrendingHeader}>
          <h2>
            Trending Courses - <span className={styles.partnerHighlight}>Learn What's in Demand!</span>
          </h2>
        </div>
        <div className={styles.aiTrendingGrid}>
          {courses.map((course) => (
            <div key={course.id} className={styles.aiTrendingCard}>
              <img src={course.image || "/placeholder.svg"} alt={course.title} className={styles.aiTrendingCardImage} />
              <div className={styles.aiTrendingCardContent}>
                <h3 className={styles.aiTrendingCardTitle}>{course.title}</h3>
                <p className={styles.aiTrendingCardDescription}>{course.description}</p>
                <div className={styles.aiTrendingPriceContainer}>
                  <span className={styles.aiTrendingCurrentPrice}>₹{course.currentPrice}</span>
                  <span className={styles.aiTrendingOriginalPrice}>₹{course.originalPrice}</span>
                </div>
                <Link to="/StudentLogin" className={styles.aiTrendingViewDetailsBtn}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.aiFloatingIcons} id="aiIconContainer"></div>
      </div>
    </div>
  )
}

export default TrendingCourses