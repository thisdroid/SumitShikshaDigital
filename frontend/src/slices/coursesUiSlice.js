import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'enrolled',
  streak: 1,
  loading: true,
};

const coursesUiSlice = createSlice({
  name: 'coursesUi',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setStreak: (state, action) => {
      state.streak = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetCoursesUi: (state) => {
      state.activeTab = initialState.activeTab;
      state.streak = initialState.streak;
      state.loading = initialState.loading;
    },
  },
});

export const { setActiveTab, setStreak, setLoading, resetCoursesUi } = coursesUiSlice.actions;
export default coursesUiSlice.reducer; 