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
import StudentDashboardLayout from './pages/studentPortal/StudentDashboardLayout'
import StudentDashboard from './pages/studentPortal/StudentDashboard'
import Courses from './pages/studentPortal/Courses'
import Examination from './pages/studentPortal/Examination'
import Certificates from './pages/studentPortal/Certificates'
import Profile from './pages/studentPortal/Profile'
import PersonalDetails from './pages/studentPortal/PersonalDetails'
import StudentSecurity from './pages/studentPortal/StudentSecurity'

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

        {/* NESTED PROTECTED ROUTES */}
        <Route path="/StudentDashboard" element={<StudentDashboardLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="Courses" element={<Courses />} />
          <Route path="Examination" element={<Examination />} />
          <Route path="Certificates" element={<Certificates />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="PersonalDetails" element={<PersonalDetails />} />
          <Route path="StudentSecurity" element={<StudentSecurity />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
