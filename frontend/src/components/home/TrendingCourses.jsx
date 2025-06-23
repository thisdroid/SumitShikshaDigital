import { useEffect } from "react"
import './TrendingCourses.css'

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

  // Clear previously appended icons to prevent duplication (important for hot reload)
  if (aiIconContainer) aiIconContainer.innerHTML = "";

  const aiIcons = [
    "html5", "css3", "javascript", "react", "python",
    "flask", "nodejs", "nextjs", "tailwindcss", "mongodb",
    "express", "docker", "firebase", "git"
  ];

  const totalIcons = 16; // 🎯 LIMIT NUMBER OF FLOATING ICONS HERE

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
    <>
      <a href="#3-course-slider" className="explore-more">
        Explore More
      </a>
      <div className="ai-trending-container" id="3-course-slider">
        <div className="ai-trending-header">
          <h2>
            Trending Courses - <span className="partner-highlight">Learn What's in Demand!</span>
          </h2>
        </div>
        <div className="ai-trending-grid">
          {courses.map((course) => (
            <div key={course.id} className="ai-trending-card">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="ai-trending-card-image" />
              <div className="ai-trending-card-content">
                <h3 className="ai-trending-card-title">{course.title}</h3>
                <p className="ai-trending-card-description">{course.description}</p>
                <div className="ai-trending-price-container">
                  <span className="ai-trending-current-price">₹{course.currentPrice}</span>
                  <span className="ai-trending-original-price">₹{course.originalPrice}</span>
                </div>
                <a href={`/course/${course.id}`} className="ai-trending-view-details-btn">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="ai-floating-icons" id="aiIconContainer"></div>
      </div>
    </>
  )
}

export default TrendingCourses
