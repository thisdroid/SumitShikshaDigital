import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';
import coursesReducer from './slices/coursesSlice';
import examsReducer from './slices/examsSlice';
import certificatesReducer from './slices/certificatesSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    courses: coursesReducer,
    exams: examsReducer,
    certificates: certificatesReducer,
  },
});

export default store;
