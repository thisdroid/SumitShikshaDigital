import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    contactNumber: '',
    password: '',
  },
  showPassword: false,
};

const studentLoginSlice = createSlice({
  name: 'studentLogin',
  initialState,
  reducers: {
    setLoginFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setLoginShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    resetLoginForm: (state) => {
      state.formData = initialState.formData;
      state.showPassword = false;
    },
  },
});

export const { setLoginFormData, setLoginShowPassword, resetLoginForm } = studentLoginSlice.actions;
export default studentLoginSlice.reducer; 