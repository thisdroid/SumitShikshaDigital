import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItem, setItem } from "../../../utils/storage";
import styles from "./AddCourse.module.css"; // reuse AddCourse styles
import { Helmet } from "react-helmet-async"; // Use Helmet for SEO
const EditCourse = () => {
  const { courseIndex } = useParams();
  const navigate = useNavigate();
  const idx = Number(courseIndex);

  const [formData, setFormData] = useState({
    courseName: "",
    totalLessons: "",
    totalDuration: "",
    rating: "",
    price: "",
    discountedPrice: "",
    difficulty: "",
    category: "",
    tag: "",
  });
  const [descriptions, setDescriptions] = useState(Array(20).fill(""));
  const [keyPoints, setKeyPoints] = useState(Array(8).fill(""));
  const [videoUploadMethod, setVideoUploadMethod] = useState("file");
  const [videoLink, setVideoLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  useEffect(() => {
  const courses = getItem("courses", []);
  if (courses[idx]) {
    const course = courses[idx];
    setFormData({
      courseName: course.courseName || "",
      totalLessons: course.totalLessons || "",
      totalDuration: course.totalDuration || "",
      rating: course.rating || "",
      price: course.price || "",
      discountedPrice: course.discountedPrice || "",
      difficulty: course.difficulty || "",
      category: course.category || "",
      tag: course.tag || "",
    });
    setDescriptions(course.descriptions || Array(20).fill(""));
    setKeyPoints(course.keyPoints || Array(8).fill(""));
    setVideoUploadMethod(course.videoUploadMethod || "file");
    setVideoLink(course.videoLink || "");
    setImagePreview(course.image || null);

    // Set video preview on load
    if (course.videoUploadMethod === "link" && course.videoLink) {
      setVideoPreview(course.videoLink);
    } else if (
      course.videoUploadMethod === "file" &&
      course.videoFile &&
      course.videoFile !== ""
    ) {
      // Since we can't restore File object from name, show placeholder
      setVideoPreview(`/videos/${course.videoFile}`); // Or fallback message
    }
  }
}, [idx]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const handleKeyPointChange = (index, value) => {
    const newKeyPoints = [...keyPoints];
    newKeyPoints[index] = value;
    setKeyPoints(newKeyPoints);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // When switching upload method, clear the other input
  const handleVideoUploadMethodChange = (e) => {
    const method = e.target.value;
    setVideoUploadMethod(method);
    if (method === "file") {
      setVideoLink("");
      setVideoPreview(null);
    } else {
      setVideoFile(null);
      setVideoPreview(null);
    }
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      setVideoLink(""); // Clear link if file is chosen
    } else {
      setVideoPreview(null);
    }
  };

  const handleVideoLinkChange = (e) => {
    setVideoLink(e.target.value);
    setVideoPreview(e.target.value);
    setVideoFile(null); // Clear file if link is entered
  };

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    const courses = getItem("courses", []);
    const updatedCourse = {
      ...formData,
      descriptions,
      keyPoints,
      videoUploadMethod,
      videoLink,
      image: imagePreview,
    };
    courses[idx] = updatedCourse;
    setItem("courses", courses);
    alert("Course updated!");
    navigate(-1); // go back to the previous page
  };

  const handleVideoUpload = () => {
    if (videoUploadMethod === "file") {
      console.log("Upload video file...");
    } else {
      console.log("Add video link:", videoLink);
    }
  };

  // Utility to extract YouTube video ID
  const getYouTubeId = (url) => {
    const regExp =
      /^.*(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Edit Course</title>
        <meta name="description" content="Update your course details including lessons, duration, rating, price, and more." />
      </Helmet>
      <div className={styles.header}>
        <h1 className={styles.title}>Edit Course</h1>
        <p className={styles.subtitle}>Update your course details below</p>
      </div>
      <form className={styles.formContainer} onSubmit={handleUpdateCourse}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter course name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Total Lessons</label>
            <input
              type="text"
              name="totalLessons"
              value={formData.totalLessons}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter total lessons"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Total Duration</label>
            <input
              type="text"
              name="totalDuration"
              value={formData.totalDuration}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter total duration (hours)"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Rating</label>
            <select name="rating" value={formData.rating} onChange={handleInputChange} className={styles.select}>
              <option value="">Select rating</option>
              <option value="5.0">5.0</option>
              <option value="4.5">4.5</option>
              <option value="4.0">4.0</option>
              <option value="3.5">3.5</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter price"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Discounted Price</label>
            <input
              type="text"
              name="discountedPrice"
              value={formData.discountedPrice}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter discounted price"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Difficulty Level</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="">Select difficulty</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <select name="category" value={formData.category} onChange={handleInputChange} className={styles.select}>
              <option value="">Select category</option>
              <option value="Programming">Programming</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="DevOps">DevOps</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tag</label>
            <select name="tag" value={formData.tag} onChange={handleInputChange} className={styles.select}>
              <option value="">Select tag</option>
              <option value="Bestseller">Bestseller</option>
              <option value="New">New</option>
              <option value="Popular">Popular</option>
              <option value="Featured">Featured</option>
              <option value="Trending">Trending</option>
            </select>
          </div>
        </div>
        <div className={styles.imageSection}>
          <h3 className={styles.sectionTitle}>Course Image</h3>
          <div className={styles.fileUpload}>
            <input
              type="file"
              className={styles.fileInput}
              accept="image/*"
              onChange={handleImageChange}
            />
            <span className={styles.fileText}>
              {imageFile ? imageFile.name : "No file chosen"}
            </span>
          </div>
          {imagePreview && (
            <div style={{ marginTop: "1rem" }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 8, border: "1px solid #e5e7eb" }}
              />
            </div>
          )}
        </div>
        <div className={styles.descriptionsSection}>
          <h3 className={styles.sectionTitle}>Course Descriptions</h3>
          <div className={styles.descriptionsGrid}>
            {descriptions.map((desc, index) => (
              <div key={index} className={styles.descriptionItem}>
                <label className={styles.descriptionLabel}>Description {index + 1}</label>
                <textarea
                  value={desc}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  className={styles.textarea}
                  rows="3"
                  placeholder={`Enter description ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.keyPointsSection}>
          <h3 className={styles.sectionTitle}>Key Points</h3>
          <div className={styles.keyPointsGrid}>
            {keyPoints.map((point, index) => (
              <div key={index} className={styles.keyPointItem}>
                <label className={styles.keyPointLabel}>Key Point {index + 1}</label>
                <textarea
                  value={point}
                  onChange={(e) => handleKeyPointChange(index, e.target.value)}
                  className={styles.textarea}
                  rows="2"
                  placeholder={`Enter key point ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.createButton} type="submit">
            <span className="material-icons">update</span>
            Update Course
          </button>
          <button className={styles.backButton} type="button" onClick={() => navigate(-1)}>
            <span className="material-icons">arrow_back</span>
            Cancel
          </button>
        </div>
      </form>
      <div className={styles.videoUploadSection}>
        <div className={styles.videoUploadContainer}>
          <h3 className={styles.videoUploadTitle}>
            <span className="material-icons">video_library</span>
            Course Video Upload
          </h3>
          <div className={styles.uploadMethodSelector}>
            <div className={styles.methodOptions}>
              <label className={styles.methodOption}>
                <input
                  type="radio"
                  name="uploadMethod"
                  value="file"
                  checked={videoUploadMethod === "file"}
                  onChange={handleVideoUploadMethodChange}
                />
                <span className={styles.methodText}>Upload Video File</span>
              </label>
              <label className={styles.methodOption}>
                <input
                  type="radio"
                  name="uploadMethod"
                  value="link"
                  checked={videoUploadMethod === "link"}
                  onChange={handleVideoUploadMethodChange}
                />
                <span className={styles.methodText}>Add Video Link</span>
              </label>
            </div>
          </div>
          {videoUploadMethod === "file" ? (
            <div className={styles.uploadArea}>
              <div className={styles.uploadIcon}>
                <span className="material-icons">video_file</span>
              </div>
              <p className={styles.uploadText}>
                Drag & drop your video file here or click to browse
                <br />
                Support .mp4, .avi, .mov, .wmv file formats
              </p>
              <input
                type="file"
                className={styles.hiddenFileInput}
                accept="video/*"
                id="videoFile"
                onChange={handleVideoFileChange}
              />
              <button
                className={styles.uploadButton}
                type="button"
                onClick={() => document.getElementById("videoFile").click()}
              >
                <span className="material-icons">upload</span>
                Upload Video File
              </button>
              {videoPreview && (
                <video
                  src={videoPreview}
                  controls
                  style={{ marginTop: "1rem", width: 240, borderRadius: 8, border: "1px solid #e5e7eb" }}
                />
              )}
            </div>
          ) : (
            <div className={styles.linkUploadArea}>
              <div className={styles.linkIcon}>
                <span className="material-icons">link</span>
              </div>
              <p className={styles.linkText}>Enter the video URL from YouTube, Vimeo, or direct video link</p>
              <div className={styles.linkInputGroup}>
                <input
                  type="url"
                  value={videoLink}
                  onChange={handleVideoLinkChange}
                  className={styles.linkInput}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              {/* YouTube Thumbnail Preview */}
              {getYouTubeId(videoLink) ? (
                <div style={{ marginTop: "1rem" }}>
                  <img
                    src={`https://img.youtube.com/vi/${getYouTubeId(videoLink)}/hqdefault.jpg`}
                    alt="YouTube Thumbnail"
                    style={{ width: 240, borderRadius: 8, border: "1px solid #e5e7eb" }}
                  />
                </div>
              ) : (
                videoPreview && videoLink && (
                  <video
                    src={videoPreview}
                    controls
                    style={{ marginTop: "1rem", width: 240, borderRadius: 8, border: "1px solid #e5e7eb" }}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCourse;