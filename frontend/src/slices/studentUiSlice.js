import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mousePosition: { x: 0, y: 0 },
};

const studentUiSlice = createSlice({
  name: 'studentUi',
  initialState,
  reducers: {
    setMousePosition: (state, action) => {
      state.mousePosition = action.payload;
    },
    resetMousePosition: (state) => {
      state.mousePosition = { x: 0, y: 0 };
    },
  },
});

export const { setMousePosition, resetMousePosition } = studentUiSlice.actions;
export default studentUiSlice.reducer; 