import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./UpdateCourseDetails.module.css";
import { getItem, setItem } from "../../../utils/storage";
import { Helmet } from "react-helmet-async"; // Use Helmet for SEO
const UpdateCourseDetails = () => {
  const { examName } = useParams();
  const [exam, setExam] = useState(null);
 const [descriptions, setDescriptions] = useState(Array(3).fill(""));
  const [keyPoints, setKeyPoints] = useState(Array(3).fill(""));

  useEffect(() => {
    const allExams = getItem("exams", []);
    const found = allExams.find((e) => e.examName === examName);
    setExam(found || {
      examName: "",
      totalQuestions: "",
      totalMarks: "",
      rating: "",
      price: "",
      discountedPrice: "",
      examDuration: "",
      courseDuration: "",
      tag: "",
      descriptions: Array(3).fill(""),
      keyPoints: Array(3).fill(""),
      image: null,
      examType: "platform",
    });
  }, [examName]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

    const removeDescription = (index) => {
    if (descriptions.length > 1) {
      const updated = [...descriptions];
      updated.splice(index, 1);
      setDescriptions(updated);
    }
  };
  
  const addKeyPoint = () => {
    setKeyPoints([...keyPoints, ""]);
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
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setExam((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const allExams = getItem("exams", []);
    const updatedExams = allExams.map((ex) =>
      ex.examName === examName ? exam : ex
    );
    setItem("exams", updatedExams);
    alert("Exam updated!");
  };

  if (!exam)
    return (
      <div className={styles.container}>
        <h2>Exam not found</h2>
      </div>
    );

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Update Exam: {exam.examName}</title>
        <meta name="description" content={`Update details for the exam: ${exam.examName}`} />
      </Helmet>
      <div className={styles.header}>
        <h1 className={styles.title}>Update Exam: {exam.examName}</h1>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleUpdate}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Exam Name</label>
              <input
                type="text"
                name="examName"
                value={exam.examName}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Total Questions</label>
              <input
                type="text"
                name="totalQuestions"
                value={exam.totalQuestions}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Total Marks</label>
              <input
                type="text"
                name="totalMarks"
                value={exam.totalMarks}
                onChange={handleInputChange}
                className={styles.input}
              />
            </div>
            {exam.examType !== "college" && (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Rating</label>
                  <input
                    type="text"
                    name="rating"
                    value={exam.rating}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Exam Duration</label>
                  <input
                    type="text"
                    name="courseDuration"
                    value={exam.courseDuration}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
              </>
            )}
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
                {exam.image ? "Image selected" : "No file chosen"}
              </span>
            </div>
            {exam.image && (
              <div style={{ marginTop: "1rem" }}>
                <img
                  src={exam.image}
                  alt="Preview"
                  style={{
                    width: 120,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                  }}
                />
              </div>
            )}
          </div>

          {exam.examType !== "college" && (

            <div className={styles.descriptionsSection}>
                                    <h3 className={styles.sectionTitle}>What You'll Learn</h3>
                                    <div className={styles.descriptionsGrid}>
                                      {descriptions.map((desc, index) => (
                                        <div key={index} className={styles.descriptionItemWithRemove}>
                                          <div className={styles.descriptionHeader}>
                                            <label className={styles.descriptionLabel}>Topic {index + 1}</label>
                                            {descriptions.length > 1 && (
                                              <button
                                                type="button"
                                                onClick={() => removeDescription(index)}
                                                className={styles.removeButton}
                                                title="Remove Description"
                                              >
                                                ✕
                                              </button>
                                            )}
                                          </div>
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
                                    <div className={styles.addButtonWrapper}>
                                      <button type="button" onClick={addDescription} className={styles.addButton}>
                                        + Add Description
                                      </button>
                                    </div>
                                  </div>
          )}

          {exam.examType !== "college" && (
            <div className={styles.keyPointsSection}>
                                    <h3 className={styles.sectionTitle}>Key Highlights</h3>
                                    <div className={styles.keyPointsGrid}>
                                      {keyPoints.map((point, index) => (
                                        <div key={index} className={styles.keyPointItemWithRemove}>
                                          <div className={styles.descriptionHeader}>
                                            <label className={styles.keyPointLabel}>Key Point {index + 1}</label>
                                            {keyPoints.length > 1 && (
                                              <button
                                                type="button"
                                                onClick={() => removeKeyPoint(index)}
                                                className={styles.removeButton}
                                                title="Remove Key Point"
                                              >
                                                ✕
                                              </button>
                                            )}
                                          </div>
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
                                    <div className={styles.addButtonWrapper}>
                                      <button type="button" onClick={addKeyPoint} className={styles.addButton}>
                                        + Add Key Point
                                      </button>
                                    </div>
                                  </div>
          )}

          <div className={styles.buttonGroup}>
            <button className={styles.updateButton} type="submit">
              <span className="material-icons">update</span>
              Update Exam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourseDetails;
