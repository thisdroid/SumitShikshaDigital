import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLesson: 0,
  currentSection: 0,
  isPlaying: false,
  progress: 0,
  notes: '',
  showNotes: false,
  showResources: false,
  completedLessons: [], // store as array of lesson keys
  expandedSections: [0], // first section expanded by default
  loading: true,
};

const coursePlayerUiSlice = createSlice({
  name: 'coursePlayerUi',
  initialState,
  reducers: {
    setCurrentLesson: (state, action) => { state.currentLesson = action.payload; },
    setCurrentSection: (state, action) => { state.currentSection = action.payload; },
    setIsPlaying: (state, action) => { state.isPlaying = action.payload; },
    setProgress: (state, action) => { state.progress = action.payload; },
    setNotes: (state, action) => { state.notes = action.payload; },
    setShowNotes: (state, action) => { state.showNotes = action.payload; },
    setShowResources: (state, action) => { state.showResources = action.payload; },
    setCompletedLessons: (state, action) => { state.completedLessons = action.payload; },
    setExpandedSections: (state, action) => { state.expandedSections = action.payload; },
    setLoading: (state, action) => { state.loading = action.payload; },
    resetCoursePlayerUi: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setCurrentLesson,
  setCurrentSection,
  setIsPlaying,
  setProgress,
  setNotes,
  setShowNotes,
  setShowResources,
  setCompletedLessons,
  setExpandedSections,
  setLoading,
  resetCoursePlayerUi,
} = coursePlayerUiSlice.actions;
export default coursePlayerUiSlice.reducer; 