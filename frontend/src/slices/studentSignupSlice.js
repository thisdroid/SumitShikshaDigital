import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    college: '',
  },
  showPassword: false,
  showConfirmPassword: false,
};

const studentSignupSlice = createSlice({
  name: 'studentSignup',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setShowConfirmPassword: (state, action) => {
      state.showConfirmPassword = action.payload;
    },
    resetSignupForm: (state) => {
      state.formData = initialState.formData;
      state.showPassword = false;
      state.showConfirmPassword = false;
    },
  },
});

export const { setFormData, setShowPassword, setShowConfirmPassword, resetSignupForm } = studentSignupSlice.actions;
export default studentSignupSlice.reducer; 