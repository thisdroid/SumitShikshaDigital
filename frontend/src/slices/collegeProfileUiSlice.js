import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  collegeName: '',
  establishedYear: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  contactNumber: '',
  email: '',
  website: '',
  accreditation: '',
  description: '',
};

const collegeProfileUiSlice = createSlice({
  name: 'collegeProfileUi',
  initialState,
  reducers: {
    setIsOpen: (state, action) => { state.isOpen = action.payload; },
    setCollegeName: (state, action) => { state.collegeName = action.payload; },
    setEstablishedYear: (state, action) => { state.establishedYear = action.payload; },
    setAddress: (state, action) => { state.address = action.payload; },
    setCity: (state, action) => { state.city = action.payload; },
    setState: (state, action) => { state.state = action.payload; },
    setZipCode: (state, action) => { state.zipCode = action.payload; },
    setCountry: (state, action) => { state.country = action.payload; },
    setContactNumber: (state, action) => { state.contactNumber = action.payload; },
    setEmail: (state, action) => { state.email = action.payload; },
    setWebsite: (state, action) => { state.website = action.payload; },
    setAccreditation: (state, action) => { state.accreditation = action.payload; },
    setDescription: (state, action) => { state.description = action.payload; },
    setAllCollegeDetails: (state, action) => { Object.assign(state, action.payload); },
    resetCollegeProfileUi: (state) => { Object.assign(state, initialState); },
  },
});

export const {
  setIsOpen,
  setCollegeName,
  setEstablishedYear,
  setAddress,
  setCity,
  setState,
  setZipCode,
  setCountry,
  setContactNumber,
  setEmail,
  setWebsite,
  setAccreditation,
  setDescription,
  setAllCollegeDetails,
  resetCollegeProfileUi,
} = collegeProfileUiSlice.actions;
export default collegeProfileUiSlice.reducer; 