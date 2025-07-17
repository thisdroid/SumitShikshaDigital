import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  view: 'activities',
  students: [
    { id: 1, name: 'John Doe', class: '10A', rollNo: '101', exams: [{ name: 'Math', marks: 85 }, { name: 'Science', marks: 90 }] },
    { id: 2, name: 'Jane Smith', class: '10B', rollNo: '102', exams: [{ name: 'History', marks: 75 }, { name: 'English', marks: 80 }] },
  ],
  requests: [
    { id: 3, name: 'Alice Johnson', class: '10C', rollNo: '103' },
    { id: 4, name: 'Bob Brown', class: '10A', rollNo: '104' },
  ],
};

const collegeStudentsUiSlice = createSlice({
  name: 'collegeStudentsUi',
  initialState,
  reducers: {
    setView: (state, action) => { state.view = action.payload; },
    setStudents: (state, action) => { state.students = action.payload; },
    setRequests: (state, action) => { state.requests = action.payload; },
    acceptRequest: (state, action) => {
      const id = action.payload;
      const newStudent = state.requests.find(request => request.id === id);
      if (newStudent) {
        state.students.push({ ...newStudent, exams: [] });
        state.requests = state.requests.filter(request => request.id !== id);
      }
    },
    rejectRequest: (state, action) => {
      const id = action.payload;
      state.requests = state.requests.filter(request => request.id !== id);
    },
    resetCollegeStudentsUi: (state) => { Object.assign(state, initialState); },
  },
});

export const {
  setView,
  setStudents,
  setRequests,
  acceptRequest,
  rejectRequest,
  resetCollegeStudentsUi,
} = collegeStudentsUiSlice.actions;
export default collegeStudentsUiSlice.reducer; 