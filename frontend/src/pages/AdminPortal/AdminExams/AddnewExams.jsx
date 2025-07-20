import { useState, useEffect } from "react"
import * as XLSX from "xlsx"
import styles from "./AddnewExams.module.css"
import { getItem, setItem } from "../../../utils/storage"
import { Helmet } from "react-helmet-async"

const AddNewExam = ({ examType }) => {
  const [formData, setFormData] = useState({
    examType: "",
    examName: "",
    totalQuestions: "",
    totalMarks: "",
    rating: "",
    examDuration: "",
    courseDuration: "",
  })

  const [descriptions, setDescriptions] = useState(Array(3).fill(""))
  const [keyPoints, setKeyPoints] = useState(Array(3).fill(""))

  const [excelFile, setExcelFile] = useState(null)
  const [parsedQuestions, setParsedQuestions] = useState([])

  const [showManualEntry, setShowManualEntry] = useState(false)
  const [manualQuestions, setManualQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      marks: "",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCourses, setFilteredCourses] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const [linkedCourse, setLinkedCourse] = useState(null)

  const [generatedCode, setGeneratedCode] = useState(null)

  // Load courses once on mount
  useEffect(() => {
    const courses = getItem("courses", [])
    setAllCourses(courses)
  }, [])

  // Filter courses on searchTerm change
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCourses([])
      return
    }
    const lowerSearch = searchTerm.toLowerCase()
    const matched = allCourses.filter((c) =>
      c.courseName.toLowerCase().includes(lowerSearch)
    )
    setFilteredCourses(matched)
  }, [searchTerm, allCourses])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Descriptions handlers
  const addDescription = () => setDescriptions([...descriptions, ""])
  const removeDescription = (i) => {
    if (descriptions.length > 1) {
      setDescriptions((prev) => prev.filter((_, idx) => idx !== i))
    }
  }
  const handleDescriptionChange = (i, val) => {
    const newDesc = [...descriptions]
    newDesc[i] = val
    setDescriptions(newDesc)
  }

  // KeyPoints handlers
  const addKeyPoint = () => setKeyPoints([...keyPoints, ""])
  const removeKeyPoint = (i) => {
    if (keyPoints.length > 1) {
      setKeyPoints((prev) => prev.filter((_, idx) => idx !== i))
    }
  }
  const handleKeyPointChange = (i, val) => {
    const newKP = [...keyPoints]
    newKP[i] = val
    setKeyPoints(newKP)
  }

  // Handle Excel file upload & parsing
  const handleExcelFileChange = (e) => {
    const file = e.target.files[0]
    setExcelFile(file || null)
    if (file) {
      const reader = new FileReader()
      reader.onload = (evt) => {
        const bstr = evt.target.result
        const wb = XLSX.read(bstr, { type: "binary" })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
        const [header, ...rows] = data
        if (!header) return
        const normalizedHeader = header.map((h) => (h ? h.toString().trim() : ""))
        const questions = rows
          .filter((row) => row.length > 0 && row[0])
          .map((row) => {
            const rowObj = {}
            normalizedHeader.forEach((h, idx) => {
              rowObj[h] = row[idx]
            })
            return {
              question: rowObj["Question"] || "",
              options: [
                rowObj["Option 1"] || "",
                rowObj["Option 2"] || "",
                rowObj["Option 3"] || "",
                rowObj["Option 4"] || "",
              ].filter(Boolean),
              correctAnswer: rowObj["Correct Answer"] || "",
              marks: Number(rowObj["Marks"]) || 0,
            }
          })
        setParsedQuestions(questions)
      }
      reader.readAsBinaryString(file)
    } else {
      setParsedQuestions([])
    }
  }

  // Manual questions handlers
  const handleManualQuestionChange = (qIndex, field, value) => {
    const updated = [...manualQuestions]
    if (field === "options") {
      updated[qIndex].options = value
    } else {
      updated[qIndex][field] = value
    }
    setManualQuestions(updated)
  }

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...manualQuestions]
    updated[qIndex].options[optIndex] = value
    setManualQuestions(updated)
  }

  const addManualQuestion = () => {
    setManualQuestions([
      ...manualQuestions,
      { question: "", options: ["", "", "", ""], correctAnswer: "", marks: "" },
    ])
  }

  const removeManualQuestion = (index) => {
    if (manualQuestions.length > 1) {
      setManualQuestions((prev) => prev.filter((_, i) => i !== index))
    }
  }

  // Course search input change
  const handleSearchChange = (e) => setSearchTerm(e.target.value)

  // Select course from filtered list
  const handleCourseSelect = (course) => {
    setLinkedCourse(course)
    setSearchTerm("")
    setFilteredCourses([])
  }

  // Submit handler for exam creation
  const handleCreateExam = (e) => {
    e.preventDefault()
    const exams = getItem("exams", [])

    const allQuestions = [
      ...parsedQuestions,
      ...manualQuestions.filter((q) => q.question.trim() !== ""),
    ]

    if (allQuestions.length === 0) {
      alert("Please add at least one question manually or upload via Excel.")
      return
    }

    const examCode =
      formData.examType === "college"
        ? Math.floor(100000 + Math.random() * 900000).toString()
        : null

    const newExam = {
      ...formData,
      linkedCourse,
      descriptions,
      keyPoints,
      excelFileName: excelFile ? excelFile.name : null,
      questions: allQuestions,
      examCode,
    }

    try {
      setItem("exams", [...exams, newExam])
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        alert(
          "Storage limit exceeded. Please delete some old exams or reduce the number of questions."
        )
        return
      }
      throw error
    }

    if (examCode) {
      alert(`College Exam Created Successfully!\nYour Exam Code is: ${examCode}`)
      setGeneratedCode(examCode)
    } else {
      alert("Exam and questions added!")
      setGeneratedCode(null)
    }

    setFormData({
      examType: "",
      examName: "",
      totalQuestions: "",
      totalMarks: "",
      rating: "",
      examDuration: "",
      courseDuration: "",
    })
    setDescriptions(Array(3).fill(""))
    setKeyPoints(Array(3).fill(""))
    setExcelFile(null)
    setParsedQuestions([])
    setManualQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: "", marks: "" }])
    setShowManualEntry(false)
    setLinkedCourse(null)
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Add New Exam</title>
        <meta
          name="description"
          content="Create and configure your exam with all necessary details including questions, descriptions, and key points."
        />
      </Helmet>

      <div className={styles.header}>
        <h1 className={styles.title}>Add New Exam</h1>
        <p className={styles.subtitle}>Create and configure your exam with all necessary details</p>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleCreateExam}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Exam Type</label>
              <select
                name="examType"
                value={formData.examType}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="">Select type</option>
                <option value="platform">Platform Exam</option>
                <option value="college">College Exam</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Exam Name</label>
              <input
                type="text"
                name="examName"
                value={formData.examName}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter exam name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Total Questions</label>
              <input
                type="text"
                name="totalQuestions"
                value={formData.totalQuestions}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter total questions"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Total Marks</label>
              <input
                type="text"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter total marks"
              />
            </div>

            {/* Conditional fields for non-college exam */}
            {formData.examType !== "college" && (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Rating</label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="">Select rating</option>
                    <option value="5.0">5.0</option>
                    <option value="4.5">4.5</option>
                    <option value="4.0">4.0</option>
                    <option value="3.5">3.5</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Exam Duration</label>
                  <input
                    type="text"
                    name="courseDuration"
                    value={formData.courseDuration}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Enter exam duration"
                  />
                </div>
              </>
            )}
          </div>

          {/* Course Search Section */}
          {formData.examType !== "college" && (
            <>
          <div className={styles.searchSection}>
            <h3 className={styles.sectionTitle}>Search Existing Courses</h3>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="course-search">
                Search Course Name
              </label>
              <input
                id="course-search"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className={styles.input}
                placeholder="Search by course name..."
              />
            </div>

            {searchTerm.trim() !== "" && filteredCourses.length > 0 && (
              <div className={styles.searchResults}>
                <h4 className={styles.searchResultsTitle}>Matching Courses:</h4>
                <ul className={styles.searchResultsList}>
                  {filteredCourses.map((course, i) => (
                    <li
                      key={i}
                      className={styles.searchResultItem}
                      onClick={() => handleCourseSelect(course)}
                      title="Click to select this course"
                    >
                      {course.courseName} (Type: {course.courseType})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            

            {searchTerm.trim() !== "" && filteredCourses.length === 0 && (
              <p className={styles.noResults}>No matching courses found.</p>
            )}
          </div>

          { linkedCourse && (
            <div className={styles.linkedCourseInfo}>
              Linked Course: {linkedCourse.courseName} (Type: {linkedCourse.courseType}){" "}
              <button type="button" onClick={() => setLinkedCourse(null)}>
                Remove
              </button>
            </div>
          )}
          </>
        )}

          {/* Descriptions for non-college */}
          {formData.examType !== "college" && (
            <div className={styles.descriptionsSection}>
              <h3 className={styles.sectionTitle}>What You'll Learn</h3>
              <div className={styles.descriptionsGrid}>
                {descriptions.map((desc, i) => (
                  <div key={i} className={styles.descriptionItemWithRemove}>
                    <div className={styles.descriptionHeader}>
                      <label className={styles.descriptionLabel}>Topic {i + 1}</label>
                      {descriptions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDescription(i)}
                          className={styles.removeButton}
                          title="Remove Description"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <textarea
                      value={desc}
                      onChange={(e) => handleDescriptionChange(i, e.target.value)}
                      className={styles.textarea}
                      rows="3"
                      placeholder={`Enter description ${i + 1}`}
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

          {/* Key Points for non-college */}
          {formData.examType !== "college" && (
            <div className={styles.keyPointsSection}>
              <h3 className={styles.sectionTitle}>Key Highlights</h3>
              <div className={styles.keyPointsGrid}>
                {keyPoints.map((kp, i) => (
                  <div key={i} className={styles.keyPointItemWithRemove}>
                    <div className={styles.descriptionHeader}>
                      <label className={styles.keyPointLabel}>Key Point {i + 1}</label>
                      {keyPoints.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeKeyPoint(i)}
                          className={styles.removeButton}
                          title="Remove Key Point"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <textarea
                      value={kp}
                      onChange={(e) => handleKeyPointChange(i, e.target.value)}
                      className={styles.textarea}
                      rows="2"
                      placeholder={`Enter key point ${i + 1}`}
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

          {/* Bulk Excel Upload */}
          <div className={styles.bulkUploadSection}>
            <div className={styles.bulkUploadContainer}>
              <h3 className={styles.bulkUploadTitle}>
                <span className="material-icons">upload_file</span>
                Bulk Upload via Excel
              </h3>
              <div className={styles.uploadArea}>
                <div className={styles.uploadIcon}>
                  <span className="material-icons">cloud_upload</span>
                </div>
                <p className={styles.uploadText}>
                  Drag & drop your Excel file here or click to browse
                  <br />
                  Support .xlsx file only
                </p>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  className={styles.fileInput}
                  onChange={handleExcelFileChange}
                />
                <span className={styles.fileText}>{excelFile ? excelFile.name : "No file chosen"}</span>
              </div>
            </div>
          </div>

          {/* Manual Entry Section */}
          <div className={styles.manualEntrySection}>
            <div className={styles.manualEntryHeader}>
              <h3 className={styles.sectionTitle}>
                <span className="material-icons">edit</span> Add Questions Manually
              </h3>
              <button
                type="button"
                onClick={() => setShowManualEntry((prev) => !prev)}
                className={styles.toggleButton}
              >
                {showManualEntry ? "Hide Manual Entry" : "Add Questions Manually"}
              </button>
            </div>

            {showManualEntry && (
              <div className={styles.manualQuestionsWrapper}>
                <div className={styles.manualQuestionsHeader}>
                  <h4 className={styles.manualQuestionsTitle}>Add New Question</h4>
                  <p className={styles.manualQuestionsSubtitle}>
                    Create multiple choice questions for your exams
                  </p>
                </div>
                {manualQuestions.map((question, qIndex) => (
                  <div key={qIndex} className={styles.questionFormCard}>
                    <div className={styles.questionCardHeader}>
                      <h5 className={styles.questionNumber}>Question {qIndex + 1}</h5>
                      {manualQuestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeManualQuestion(qIndex)}
                          className={styles.removeQuestionBtn}
                          title="Remove Question"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div className={styles.questionFormContent}>
                      <div className={styles.questionTextSection}>
                        <textarea
                          value={question.question}
                          onChange={(e) => handleManualQuestionChange(qIndex, "question", e.target.value)}
                          className={styles.questionTextInput}
                          placeholder="Enter your question"
                          rows="4"
                        />
                        <label className={styles.questionTextLabel}>Question Text</label>
                      </div>

                      <div className={styles.marksSection}>
                        <label className={styles.marksLabel}>Marks</label>
                        <input
                          type="number"
                          value={question.marks}
                          onChange={(e) => handleManualQuestionChange(qIndex, "marks", e.target.value)}
                          className={styles.marksInputField}
                          placeholder="Marks"
                        />
                      </div>

                      <div className={styles.optionsSection}>
                        <div className={styles.optionsRow}>
                          {[0, 1].map((optIdx) => (
                            <div key={optIdx} className={styles.optionField}>
                              <label className={styles.optionLabel}>Option {optIdx + 1}</label>
                              <input
                                type="text"
                                value={question.options[optIdx]}
                                onChange={(e) => handleOptionChange(qIndex, optIdx, e.target.value)}
                                className={styles.optionInput}
                                placeholder={`Option ${optIdx + 1}`}
                              />
                            </div>
                          ))}
                        </div>
                        <div className={styles.optionsRow}>
                          {[2, 3].map((optIdx) => (
                            <div key={optIdx} className={styles.optionField}>
                              <label className={styles.optionLabel}>Option {optIdx + 1}</label>
                              <input
                                type="text"
                                value={question.options[optIdx]}
                                onChange={(e) => handleOptionChange(qIndex, optIdx, e.target.value)}
                                className={styles.optionInput}
                                placeholder={`Option ${optIdx + 1}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={styles.correctAnswerSection}>
                        <label className={styles.correctAnswerLabel}>Correct Answer</label>
                        <select
                          value={question.correctAnswer}
                          onChange={(e) => handleManualQuestionChange(qIndex, "correctAnswer", e.target.value)}
                          className={styles.correctAnswerSelect}
                        >
                          <option value="">Select Correct Answer</option>
                          {question.options
                            .filter(Boolean)
                            .map((opt, idx) => (
                              <option key={idx} value={opt}>
                                {opt}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                <div className={styles.addQuestionButtonContainer}>
                  <button type="button" onClick={addManualQuestion} className={styles.addAnotherQuestionBtn}>
                    + Add Another Question
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Show Create Exam button only if questions present */}
          {(excelFile || manualQuestions.some((q) => q.question.trim() !== "")) && (
            <div className={styles.buttonGroup}>
              <button className={styles.createButton} type="submit">
                <span className="material-icons">add</span> Create Exam
              </button>
            </div>
          )}
        </form>

        {/* Display Generated Code for College Exam */}
        {generatedCode && (
          <div className={styles.examCodeBox}>
            <strong>Generated Exam Code:</strong> {generatedCode}
          </div>
        )}
      </div>
    </div>
  )
}

export default AddNewExam
