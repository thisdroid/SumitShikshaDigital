import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';
import coursesReducer from './slices/coursesSlice';
import examsReducer from './slices/examsSlice';
import certificatesReducer from './slices/certificatesSlice';
import studentSignupReducer from './slices/studentSignupSlice';
import studentLoginReducer from './slices/studentLoginSlice';
import studentUiReducer from './slices/studentUiSlice';
import coursesUiReducer from './slices/coursesUiSlice';
import coursePlayerUiReducer from './slices/coursePlayerUiSlice';
import examsUiReducer from './slices/examsUiSlice';
import collegeProfileUiReducer from './slices/collegeProfileUiSlice';
import collegeSecurityUiReducer from './slices/collegeSecurityUiSlice';
import collegeStudentsUiReducer from './slices/collegeStudentsUiSlice';
import collegeCreateExamUiReducer from './slices/collegeCreateExamUiSlice';
import collegeScheduledExamsUiReducer from './slices/collegeScheduledExamsUiSlice';
import collegeExamHistoryUiReducer from './slices/collegeExamHistoryUiSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    courses: coursesReducer,
    exams: examsReducer,
    certificates: certificatesReducer,
    studentSignup: studentSignupReducer,
    studentLogin: studentLoginReducer,
    studentUi: studentUiReducer,
    coursesUi: coursesUiReducer,
    coursePlayerUi: coursePlayerUiReducer,
    examsUi: examsUiReducer,
    collegeProfileUi: collegeProfileUiReducer,
    collegeSecurityUi: collegeSecurityUiReducer,
    collegeStudentsUi: collegeStudentsUiReducer,
    collegeCreateExamUi: collegeCreateExamUiReducer,
    collegeScheduledExamsUi: collegeScheduledExamsUiReducer,
    collegeExamHistoryUi: collegeExamHistoryUiReducer,
  },
});

export default store;
