import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exams: [],
  currentExam: null,
  results: {},
};

const examsSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    setExams: (state, action) => {
      state.exams = action.payload;
    },
    setCurrentExam: (state, action) => {
      state.currentExam = action.payload;
    },
    setExamResult: (state, action) => {
      const { examId, result } = action.payload;
      state.results[examId] = result;
    },
  },
});

export const { setExams, setCurrentExam, setExamResult } = examsSlice.actions;
export default examsSlice.reducer; 