// src/api/api.js

const BASE_URL = 'http://127.0.0.1:8000/api/';

export const fetchCourses = async () => {
  const response = await fetch(`${BASE_URL}courses/`);

  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }

  return await response.json();
};
