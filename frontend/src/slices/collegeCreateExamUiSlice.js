import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    examType: 'college',
    ProfessorName: '',
    examName: '',
    totalQuestions: '',
    totalMarks: '',
    examDurationHours: '',
    examDurationMinutes: '',
    createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    scheduledAt: '',
  },
  excelFile: null,
  parsedQuestions: [],
  showManualEntry: false,
  manualQuestions: [
    { question: '', options: ['', '', '', ''], correctAnswer: '', marks: '' },
  ],
  generatedCode: null,
  showPreview: false,
  minDateTime: '',
  maxDateTime: '',
};

const collegeCreateExamUiSlice = createSlice({
  name: 'collegeCreateExamUi',
  initialState,
  reducers: {
    setFormData: (state, action) => { state.formData = { ...state.formData, ...action.payload }; },
    setExcelFile: (state, action) => { state.excelFile = action.payload; },
    setParsedQuestions: (state, action) => { state.parsedQuestions = action.payload; },
    setShowManualEntry: (state, action) => { state.showManualEntry = action.payload; },
    setManualQuestions: (state, action) => { state.manualQuestions = action.payload; },
    setGeneratedCode: (state, action) => { state.generatedCode = action.payload; },
    setShowPreview: (state, action) => { state.showPreview = action.payload; },
    setMinDateTime: (state, action) => { state.minDateTime = action.payload; },
    setMaxDateTime: (state, action) => { state.maxDateTime = action.payload; },
    resetCollegeCreateExamUi: (state) => { Object.assign(state, initialState); },
  },
});

export const {
  setFormData,
  setExcelFile,
  setParsedQuestions,
  setShowManualEntry,
  setManualQuestions,
  setGeneratedCode,
  setShowPreview,
  setMinDateTime,
  setMaxDateTime,
  resetCollegeCreateExamUi,
} = collegeCreateExamUiSlice.actions;
export default collegeCreateExamUiSlice.reducer; 