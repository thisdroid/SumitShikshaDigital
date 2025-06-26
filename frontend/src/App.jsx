import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Training from './pages/training/Training'
import StudentLogin from './pages/student/StudentLogin'
import StudentSignUp from './pages/student/StudentSignup'
import Student from './pages/student/Student'
import College from './pages/college/College'
import CollegeLogin from './pages/college/CollegeLogin'
import CollegeSignUp from './pages/college/CollegeSignUp'
import ContactUs from './pages/home/ContactUs'
import AboutUs from './pages/home/AboutUs'

// PROTECTED ROUTES
import StudentDashboard from './pages/studentPortal/StudentDashboard'


// import other pages as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Training" element={<Training />} />
        <Route path="/Student" element={<Student />} />
        <Route path="/StudentLogin" element={<StudentLogin />} />
        <Route path="/StudentSignUp" element={<StudentSignUp />} />
        <Route path="/College" element={<College />} />
        <Route path="/CollegeLogin" element={<CollegeLogin />} />
        <Route path="/CollegeSignUp" element={<CollegeSignUp />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />


        {/* PROTECTED ROUTES PUT PROTECTION OVER HERE */}
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
      
      
      </Routes>
    </Router>
  )
}

export default App