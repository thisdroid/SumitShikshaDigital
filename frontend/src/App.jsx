import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Training from "./pages/training/Training"
import StudentLogin from "./pages/student/StudentLogin"
import StudentSignUp from "./pages/student/StudentSignup"
import Student from "./pages/student/Student"
import College from "./pages/college/College"
import CollegeLogin from "./pages/college/CollegeLogin"
import CollegeSignUp from "./pages/college/CollegeSignUp"
import ContactUs from "./pages/home/ContactUs"
import AboutUs from "./pages/home/AboutUs"
import GetHelp from "./components/common_components/GetHelp"

// PROTECTED ROUTES
import StudentDashboardLayout from "./pages/studentPortal/StudentDashboardLayout"
import StudentDashboard from "./pages/studentPortal/StudentDashboard"
import Courses from "./pages/studentPortal/Courses/Courses"
import Examination from "./pages/studentPortal/Exams/Examination"
import Certificates from "./pages/studentPortal/StudentCertificates/Certificates"
import Profile from "./pages/studentPortal/Profile_icon/Profile"
import PersonalDetails from "./pages/studentPortal/Profile_icon/PersonalDetails"
import StudentSecurity from "./pages/studentPortal/Profile_icon/StudentSecurity"
import StudentPerformance from "./pages/studentPortal/StudentPerformance"
import CourseDetails from "./pages/studentPortal/Courses/CourseDetails"
import ExamDetails from "./pages/studentPortal/Exams/ExamDetails"
import CoursePlayer from "./pages/studentPortal/Courses/CoursePlayer"
import ExamTest from "./pages/studentPortal/Exams/ExamTest"
import ExamResults from "./pages/studentPortal/Exams/ExamResults"

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
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
        <Route path="/GetHelp" element={<GetHelp />} />

        {/* EXAM TEST ROUTES - OUTSIDE DASHBOARD LAYOUT FOR NO SIDEBAR */}
        <Route path="/StudentDashboard/Examination/:examName/test" element={<ExamTest />} />
        <Route path="/StudentDashboard/Examination/:examName/results" element={<ExamResults />} />

        {/* NESTED PROTECTED ROUTES */}
        <Route path="/StudentDashboard" element={<StudentDashboardLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="Courses" element={<Courses />} />
          <Route path="Courses/:courseId" element={<CourseDetails />} />
          <Route path="/StudentDashboard/Courses/:courseId/player" element={<CoursePlayer />} />
          <Route path="Examination" element={<Examination />} />
          <Route path="Examination/:examName" element={<ExamDetails />} />
          <Route path="Certificates" element={<Certificates />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="PersonalDetails" element={<PersonalDetails />} />
          <Route path="StudentSecurity" element={<StudentSecurity />} />
          <Route path="StudentPerformance" element={<StudentPerformance />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
