import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Training from './pages/training/Training'
import StudentLogin from './pages/student_login_signup/StudentLogin'
import StudentSignup from './pages/student_login_signup/StudentSignup'
import StudentLog from './pages/student/Student'
import College from './pages/college/College'
import CollegeLogin from './pages/college_login_signup/CollegeLogin'
import ContactUs from './pages/home/ContactUs'
import AboutUs from './pages/home/AboutUs'


// import other pages as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Training" element={<Training />} />
        <Route path="/StudentLogin" element={<StudentLogin />} />
        <Route path="/StudentSignup" element={<StudentSignup />} />
        <Route path="/Student" element={<StudentLog />} />
        <Route path="/College" element={<College />} />
        <Route path="/CollegeLogin" element={<CollegeLogin />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        {/* <Route path="/College" element={<College />} /> */}
        {/* Add more routes here */}
      </Routes>
    </Router>
  )
}

export default App