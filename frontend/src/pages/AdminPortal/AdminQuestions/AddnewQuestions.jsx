import React, { useState, useEffect } from 'react';
import styles from './AddnewQuestions.module.css';
import { Helmet } from 'react-helmet-async';

const AddnewQuestions = () => {
  const [exams, setExams] = useState([]);
  const [examName, setExamName] = useState('');
  const [questions, setQuestions] = useState([
    {
      question: '',
      marks: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    },
  ]);

  useEffect(() => {
    const allExams = JSON.parse(localStorage.getItem('exams') || '[]');
    setExams(allExams.filter(e => e.examType === 'platform'));
  }, []);

  const handleQuestionChange = (index, name, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addNewQuestionForm = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        marks: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      },
    ]);
  };

  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!examName) {
      alert('Please select an exam.');
      return;
    }

    for (const q of questions) {
      if (!q.question || !q.marks || !q.correctAnswer || q.options.some(opt => opt.trim() === '')) {
        alert('Please fill all fields in each question.');
        return;
      }
    }

    const allExams = JSON.parse(localStorage.getItem('exams') || '[]');
    const examIndex = allExams.findIndex(e => e.examName === examName && e.examType === 'platform');
    if (examIndex === -1) {
      alert('Exam not found!');
      return;
    }

    if (!allExams[examIndex].questions) allExams[examIndex].questions = [];
    allExams[examIndex].questions.push(...questions);
    localStorage.setItem('exams', JSON.stringify(allExams));

    alert('Questions added!');
    setQuestions([
      {
        question: '',
        marks: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      },
    ]);
    setExamName('');
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Add New Question</title>
        <meta name="description" content="Create multiple choice questions for platform exams" />
      </Helmet>

      <h2 className={styles.title}>Add New Question</h2>
      <p className={styles.subtitle}>Create multiple choice questions for your exams</p>

      <form onSubmit={handleSubmit}>
        <select
          className={styles.select}
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          required
        >
          <option value="">Select Exam</option>
          {exams.map((exam, idx) => (
            <option key={idx} value={exam.examName}>{exam.examName}</option>
          ))}
        </select>

        {questions.map((q, i) => (
          <div key={i} className={styles.questionBlock}>
            <div className={styles.questionHeader}>
              <label className={styles.label}>Question {i + 1}</label>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(i)}
                  className={styles.removeBtn}
                >
                  Remove
                </button>
              )}
            </div>

            <textarea
              className={styles.textarea}
              value={q.question}
              onChange={(e) => handleQuestionChange(i, 'question', e.target.value)}
              placeholder="Enter your question"
              required
            />

            <input
              type="number"
              className={styles.input}
              value={q.marks}
              onChange={(e) => handleQuestionChange(i, 'marks', e.target.value)}
              placeholder="Marks"
              required
            />

            <div className={styles.optionsRow}>
              {q.options.map((opt, j) => (
                <input
                  key={j}
                  type="text"
                  className={styles.optionInput}
                  placeholder={`Option ${j + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(i, j, e.target.value)}
                  required
                />
              ))}
            </div>

            <div className={styles.answerRow}>
              <select
                className={styles.select}
                value={q.correctAnswer}
                onChange={(e) => handleQuestionChange(i, 'correctAnswer', e.target.value)}
                required
              >
                <option value="">Select Correct Answer</option>
                {q.options.map((opt, j) => (
                  <option key={j} value={opt}>{`Option ${j + 1}`}</option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <button type="button" className={styles.addAnotherBtn} onClick={addNewQuestionForm}>
          + Add Another Question
        </button>

        <button type="submit" className={styles.submitBtn}>
          <span className="material-icons">save</span> Submit All Questions
        </button>
      </form>
    </div>
  );
};

export default AddnewQuestions;
