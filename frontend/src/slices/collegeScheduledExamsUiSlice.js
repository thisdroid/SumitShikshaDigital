import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedExam: null,
};

const collegeScheduledExamsUiSlice = createSlice({
  name: 'collegeScheduledExamsUi',
  initialState,
  reducers: {
    setSelectedExam: (state, action) => { state.selectedExam = action.payload; },
    resetCollegeScheduledExamsUi: (state) => { Object.assign(state, initialState); },
  },
});

export const { setSelectedExam, resetCollegeScheduledExamsUi } = collegeScheduledExamsUiSlice.actions;
export default collegeScheduledExamsUiSlice.reducer; 