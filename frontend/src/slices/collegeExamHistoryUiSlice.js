import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedExam: null,
  filter: 'All',
  isDropdownOpen: false,
};

const collegeExamHistoryUiSlice = createSlice({
  name: 'collegeExamHistoryUi',
  initialState,
  reducers: {
    setSelectedExam: (state, action) => { state.selectedExam = action.payload; },
    setFilter: (state, action) => { state.filter = action.payload; },
    setIsDropdownOpen: (state, action) => { state.isDropdownOpen = action.payload; },
    resetCollegeExamHistoryUi: (state) => { Object.assign(state, initialState); },
  },
});

export const { setSelectedExam, setFilter, setIsDropdownOpen, resetCollegeExamHistoryUi } = collegeExamHistoryUiSlice.actions;
export default collegeExamHistoryUiSlice.reducer; 