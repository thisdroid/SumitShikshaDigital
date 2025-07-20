import { useState, useEffect } from "react";
import styles from "./UpdateQuestion.module.css";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const UpdateQuestion = () => {
  const { examName } = useParams();
  const decodedExamName = decodeURIComponent(examName || "");

  const [formData, setFormData] = useState({
    examName: decodedExamName,
    question: "",
    marks: "1",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "Option1",
  });

  const [originalData, setOriginalData] = useState(null);

  // Load question data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("editQuestionData");
    if (storedData) {
      try {
        const questionData = JSON.parse(storedData);
        setOriginalData(questionData); // Save for reference
        setFormData({
          examName: questionData.examName || decodedExamName,
          question: questionData.question || "",
          marks: questionData.marks?.toString() || "1",
          option1: questionData.options?.[0] || "",
          option2: questionData.options?.[1] || "",
          option3: questionData.options?.[2] || "",
          option4: questionData.options?.[3] || "",
          correctAnswer: questionData.correctAnswer || "Option1",
        });
      } catch (error) {
        console.error("Error parsing editQuestionData:", error);
      }
    }
  }, [decodedExamName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateQuestion = (e) => {
    e.preventDefault();
    const exams = JSON.parse(localStorage.getItem("exams") || "[]");
    const examIndex = exams.findIndex(
      (e) => e.examName.toLowerCase() === formData.examName.toLowerCase()
    );

    if (examIndex !== -1 && originalData) {
      const questionIndex = exams[examIndex].questions.findIndex(
        (q) =>
          q.question === originalData.question &&
          q.marks === originalData.marks &&
          q.correctAnswer === originalData.correctAnswer &&
          JSON.stringify(q.options) === JSON.stringify(originalData.options)
      );

      if (questionIndex !== -1) {
        exams[examIndex].questions[questionIndex] = {
          question: formData.question,
          marks: Number(formData.marks),
          options: [
            formData.option1,
            formData.option2,
            formData.option3,
            formData.option4,
          ],
          correctAnswer: formData.correctAnswer,
        };

        localStorage.setItem("exams", JSON.stringify(exams));
        alert("Question updated successfully!");
        window.location.href = `/AdminDashboard/ExamQuestions?exam=${encodeURIComponent(
          formData.examName
        )}`;
      } else {
        alert("Original question not found.");
      }
    } else {
      alert("Exam not found or original data missing.");
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Update Question</title>
        <meta
          name="description"
          content="Update the details of an existing question"
        />
      </Helmet>

      <div className={styles.header}>
        <h1 className={styles.title}>Update Question</h1>
        <p className={styles.subtitle}>Modify the question details below</p>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleUpdateQuestion}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Exam Name</label>
            <input
              type="text"
              name="examName"
              value={formData.examName}
              readOnly
              className={styles.marksInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Question</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              className={styles.questionTextarea}
              rows="4"
              placeholder="Enter your question here..."
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Marks</label>
            <input
              type="number"
              name="marks"
              value={formData.marks}
              onChange={handleInputChange}
              className={styles.marksInput}
              min="1"
              max="10"
            />
          </div>

          <div className={styles.optionsSection}>
            <h3 className={styles.sectionTitle}>Options</h3>
            <div className={styles.optionsGrid}>
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className={styles.optionGroup}>
                  <label className={styles.optionLabel}>Option {n}</label>
                  <input
                    type="text"
                    name={`option${n}`}
                    value={formData[`option${n}`]}
                    onChange={handleInputChange}
                    className={styles.optionInput}
                    placeholder={`Enter option ${n}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Correct Answer</label>
            <select
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="Option1">Option1</option>
              <option value="Option2">Option2</option>
              <option value="Option3">Option3</option>
              <option value="Option4">Option4</option>
            </select>
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.updateButton}>
              <span className="material-icons">update</span>
              Update Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuestion;