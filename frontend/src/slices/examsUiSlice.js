import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'course-exams',
  examCode: '',
  codeError: '',
  loading: true,
};

const examsUiSlice = createSlice({
  name: 'examsUi',
  initialState,
  reducers: {
    setActiveTab: (state, action) => { state.activeTab = action.payload; },
    setExamCode: (state, action) => { state.examCode = action.payload; },
    setCodeError: (state, action) => { state.codeError = action.payload; },
    setLoading: (state, action) => { state.loading = action.payload; },
    resetExamsUi: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setActiveTab, setExamCode, setCodeError, setLoading, resetExamsUi } = examsUiSlice.actions;
export default examsUiSlice.reducer; 