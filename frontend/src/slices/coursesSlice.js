import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  selectedCourse: null,
  progress: {},
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    selectCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    updateProgress: (state, action) => {
      const { courseId, progress } = action.payload;
      state.progress[courseId] = progress;
    },
  },
});

export const { setCourses, selectCourse, updateProgress } = coursesSlice.actions;
export default coursesSlice.reducer; 