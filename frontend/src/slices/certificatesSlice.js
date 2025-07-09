import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  certificates: [],
  selectedCertificate: null,
};

const certificatesSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    setCertificates: (state, action) => {
      state.certificates = action.payload;
    },
    selectCertificate: (state, action) => {
      state.selectedCertificate = action.payload;
    },
  },
});

export const { setCertificates, selectCertificate } = certificatesSlice.actions;
export default certificatesSlice.reducer; 