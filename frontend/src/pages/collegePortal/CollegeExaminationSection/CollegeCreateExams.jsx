import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import styles from "./CollegeCreateExams.module.css";
import { getItem, setItem } from "../../../utils/storage";
import { Helmet } from "react-helmet-async";
import CollegeHeader from "../CollegeHeader/CollegeHeaderFile";
import { useSelector, useDispatch } from 'react-redux';
import {
  setFormData,
  setExcelFile,
  setParsedQuestions,
  setShowManualEntry,
  setManualQuestions,
  setGeneratedCode,
  setShowPreview,
  setMinDateTime,
  setMaxDateTime,
} from '../../../slices/collegeCreateExamUiSlice';

const CollegeCreateExam = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.collegeCreateExamUi.formData);
  const excelFile = useSelector((state) => state.collegeCreateExamUi.excelFile);
  const parsedQuestions = useSelector((state) => state.collegeCreateExamUi.parsedQuestions);
  const showManualEntry = useSelector((state) => state.collegeCreateExamUi.showManualEntry);
  const manualQuestions = useSelector((state) => state.collegeCreateExamUi.manualQuestions);
  const generatedCode = useSelector((state) => state.collegeCreateExamUi.generatedCode);
  const showPreview = useSelector((state) => state.collegeCreateExamUi.showPreview);
  const minDateTime = useSelector((state) => state.collegeCreateExamUi.minDateTime);
  const maxDateTime = useSelector((state) => state.collegeCreateExamUi.maxDateTime);

  useEffect(() => {
    const now = new Date();
    const min = now.toISOString().slice(0, 16);
    dispatch(setMinDateTime(min));

    const max = new Date(now);
    max.setDate(now.getDate() + 30);
    const maxISO = max.toISOString().slice(0, 16);
    dispatch(setMaxDateTime(maxISO));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleExcelFileChange = (e) => {
    const file = e.target.files[0];
    dispatch(setExcelFile(file || null));
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const [header, ...rows] = data;
        if (!header) return;
        const normalizedHeader = header.map((h) => (h ? h.toString().trim() : ""));
        const questions = rows
          .filter((row) => row.length > 0 && row[0])
          .map((row) => {
            const rowObj = {};
            normalizedHeader.forEach((h, idx) => {
              rowObj[h] = row[idx];
            });
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
            };
          });
        dispatch(setParsedQuestions(questions));
      };
      reader.readAsBinaryString(file);
    } else {
      dispatch(setParsedQuestions([]));
    }
  };

  const handleManualQuestionChange = (qIndex, field, value) => {
    const updated = [...manualQuestions];
    if (field === "options") {
      updated[qIndex].options = value;
    } else {
      updated[qIndex][field] = value;
    }
    dispatch(setManualQuestions(updated));
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...manualQuestions];
    updated[qIndex].options[optIndex] = value;
    dispatch(setManualQuestions(updated));
  };

  const addManualQuestion = () => {
    const totalQuestions = parseInt(formData.totalQuestions, 10);
    if (manualQuestions.length >= totalQuestions) {
      alert(`${totalQuestions} questions are done. To add more, increase the limit above.`);
      return;
    }
    dispatch(setManualQuestions([
      ...manualQuestions,
      { question: "", options: ["", "", "", ""], correctAnswer: "", marks: "" },
    ]));
  };

  const removeManualQuestion = (index) => {
    if (manualQuestions.length > 1) {
      const updated = manualQuestions.filter((_, i) => i !== index);
      dispatch(setManualQuestions(updated));
    }
  };

  const handleCreateExam = (e) => {
    e.preventDefault();
    const totalMarks = parseInt(formData.totalMarks, 10);
    const totalQuestions = parseInt(formData.totalQuestions, 10);
    const allQuestions = [
      ...parsedQuestions,
      ...manualQuestions.filter((q) => q.question.trim() !== ""),
    ];

    if (allQuestions.length === 0) {
      alert("Please add at least one question manually or upload via Excel.");
      return;
    }

    const totalQuestionsMarks = allQuestions.reduce((sum, question) => sum + parseInt(question.marks, 10), 0);
    if (totalQuestionsMarks > totalMarks) {
      alert(`Marks limit exceeded. Please increase the marks limit above.`);
      return;
    }

    if (allQuestions.length > totalQuestions) {
      alert(`${totalQuestions} questions are done. To add more, increase the limit above.`);
      return;
    }

    const examCode = Math.floor(100000 + Math.random() * 900000).toString();
    const newExam = {
      ...formData,
      examDuration: `${formData.examDurationHours} hours ${formData.examDurationMinutes} minutes`,
      excelFileName: excelFile ? excelFile.name : null,
      questions: allQuestions,
      examCode,
    };

    try {
      setItem("exams", [...getItem("exams", []), newExam]);
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        alert(
          "Storage limit exceeded. Please delete some old exams or reduce the number of questions."
        );
        return;
      }
      throw error;
    }

    alert(`College Exam Created Successfully!\nYour Exam Code is: ${examCode}`);
    dispatch(setGeneratedCode(examCode));
    dispatch(setFormData({
      examType: "college",
      ProfessorName: "",
      examName: "",
      totalQuestions: "",
      totalMarks: "",
      examDurationHours: "",
      examDurationMinutes: "",
      createdAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      scheduledAt: "",
    }));
    dispatch(setExcelFile(null));
    dispatch(setParsedQuestions([]));
    dispatch(setManualQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: "", marks: "" }]));
    dispatch(setShowManualEntry(false));
  };

  const handleFinish = () => {
    dispatch(setShowPreview(true));
  };

  const closePreview = () => {
    dispatch(setShowPreview(false));
  };

  return (
    <div className={styles.container}>
      <CollegeHeader />
      <Helmet>
        <title>Add New College Exam</title>
        <meta name="description" content="Create and configure your college exam with all necessary details including questions." />
      </Helmet>
      <div className={styles.header}>
        <h1 className={styles.title}>Add New College Exam</h1>
        <p className={styles.subtitle}>Create and configure your college exam with all necessary details</p>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleCreateExam}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Professor Name</label>
              <input
                type="text"
                name="ProfessorName"
                value={formData.ProfessorName}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter professor name"
                required
              />
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
                type="number"
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
                type="number"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter total marks"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Exam Duration</label>
              <div className={styles.durationContainer}>
                <input
                  type="number"
                  name="examDurationHours"
                  value={formData.examDurationHours}
                  onChange={handleInputChange}
                  className={styles.durationInput}
                  placeholder="Hours"
                  min="0"
                />
                <span className={styles.durationSeparator}>:</span>
                <input
                  type="number"
                  name="examDurationMinutes"
                  value={formData.examDurationMinutes}
                  onChange={handleInputChange}
                  className={styles.durationInput}
                  placeholder="Minutes"
                  min="0"
                  max="59"
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Created At</label>
              <input
                type="text"
                name="createdAt"
                value={formData.createdAt}
                className={styles.input}
                readOnly
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Schedule At</label>
              <input
                type="datetime-local"
                name="scheduledAt"
                value={formData.scheduledAt}
                onChange={handleInputChange}
                className={styles.input}
                min={minDateTime}
                max={maxDateTime}
              />
            </div>
          </div>
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
          <div className={styles.manualEntrySection}>
            <div className={styles.manualEntryHeader}>
              <h3 className={styles.sectionTitle}>
                <span className="material-icons">edit</span> Add Questions Manually
              </h3>
              <button
                type="button"
                onClick={() => dispatch(setShowManualEntry((prev) => !prev))}
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
          <div className={styles.buttonGroup}>
            <button className={styles.createButton} type="submit">
              <span className="material-icons">add</span> Create Exam
            </button>
            <button type="button" className={styles.finishButton} onClick={handleFinish}>
              Preview
            </button>
          </div>
        </form>
        {generatedCode && (
          <div className={styles.examCodeBox}>
            <strong>Generated Exam Code:</strong> {generatedCode}
          </div>
        )}
      </div>
      {showPreview && (
        <div className={styles.previewOverlay}>
          <div className={styles.previewContent}>
            <h2>Exam Preview</h2>
            <div className={styles.previewQuestions}>
              {manualQuestions.map((question, index) => (
                <div key={index} className={styles.previewQuestion}>
                  <h4>Question {index + 1}: {question.question}</h4>
                  <ul>
                    {question.options.map((option, optIndex) => (
                      <li key={optIndex}>{option}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <button onClick={closePreview} className={styles.closePreviewButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeCreateExam;
