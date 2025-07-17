import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'email',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  showCurrentPassword: false,
  showNewPassword: false,
  showConfirmPassword: false,
  currentEmail: 'user@example.com',
  newEmail: '',
  confirmEmail: '',
  emailPassword: '',
  showEmailPassword: false,
};

const collegeSecurityUiSlice = createSlice({
  name: 'collegeSecurityUi',
  initialState,
  reducers: {
    setActiveTab: (state, action) => { state.activeTab = action.payload; },
    setCurrentPassword: (state, action) => { state.currentPassword = action.payload; },
    setNewPassword: (state, action) => { state.newPassword = action.payload; },
    setConfirmPassword: (state, action) => { state.confirmPassword = action.payload; },
    setShowCurrentPassword: (state, action) => { state.showCurrentPassword = action.payload; },
    setShowNewPassword: (state, action) => { state.showNewPassword = action.payload; },
    setShowConfirmPassword: (state, action) => { state.showConfirmPassword = action.payload; },
    setCurrentEmail: (state, action) => { state.currentEmail = action.payload; },
    setNewEmail: (state, action) => { state.newEmail = action.payload; },
    setConfirmEmail: (state, action) => { state.confirmEmail = action.payload; },
    setEmailPassword: (state, action) => { state.emailPassword = action.payload; },
    setShowEmailPassword: (state, action) => { state.showEmailPassword = action.payload; },
    setAllSecurityFields: (state, action) => { Object.assign(state, action.payload); },
    resetCollegeSecurityUi: (state) => { Object.assign(state, initialState); },
  },
});

export const {
  setActiveTab,
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword,
  setShowCurrentPassword,
  setShowNewPassword,
  setShowConfirmPassword,
  setCurrentEmail,
  setNewEmail,
  setConfirmEmail,
  setEmailPassword,
  setShowEmailPassword,
  setAllSecurityFields,
  resetCollegeSecurityUi,
} = collegeSecurityUiSlice.actions;
export default collegeSecurityUiSlice.reducer; 