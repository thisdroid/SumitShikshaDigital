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
import GetHelp from './components/common_components/GetHelp'

// PROTECTED ROUTES
import StudentDashboardLayout from './pages/studentPortal/StudentDashboardLayout'
import StudentDashboard from './pages/studentPortal/StudentDashboard'
import Courses from './pages/studentPortal/Courses/Courses'
import Examination from './pages/studentPortal/Exams/Examination'
import Certificates from './pages/studentPortal/StudentCertificates/Certificates'
import Profile from './pages/studentPortal/Profile_icon/Profile'
import PersonalDetails from './pages/studentPortal/Profile_icon/PersonalDetails'
import StudentSecurity from './pages/studentPortal/Profile_icon/StudentSecurity'
import StudentPerformance from './pages/studentPortal/StudentPerformance'
import CourseDetails from './pages/studentPortal/Courses/CourseDetails'
import ExamDetails from './pages/studentPortal/Exams/ExamDetails'
import CoursePlayer from './pages/studentPortal/Courses/CoursePlayer';
import ExamTest from './pages/studentPortal/Exams/ExamTest';
import ExamResults from './pages/studentPortal/Exams/ExamResults';

//College
import CollegeDashboardLayout from './pages/collegePortal/CollegeDashboardLayout'
import CollegeDashboard from './pages/collegePortal/CollegeDashboard'
import CollegeStudents from './pages/collegePortal/CollegeStudents'
import CollegeProfile from './pages/collegePortal/CollegeProfile_icon/CollegeProfile'
import CollegeDetails from './pages/collegePortal/CollegeProfile_icon/CollegeDetails'
import CollegeSecurity from './pages/collegePortal/CollegeProfile_icon/CollegeSecurity'
import CollegeCreateExam from './pages/collegePortal/CollegeExaminationSection/CollegeCreateExams'
import CollegeScheduledExams from './pages/collegePortal/CollegeExaminationSection/CollegeScheduledExams'
import CollegeExamHistory from './pages/collegePortal/CollegeExaminationSection/CollegeExamHistory'


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
        <Route path="/GetHelp" element={<GetHelp />} />

        {/* Exam Details Standalone Route */}
        {/* <Route path="/exam-details/:examName" element={<ExamDetails />} /> */}

        {/* NESTED PROTECTED ROUTES */}
        <Route path="/StudentDashboard" element={<StudentDashboardLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="Courses" element={<Courses />} />
          <Route path="Courses/:courseId" element={<CourseDetails />} />
          <Route path="Courses/:courseId/player" element={<CoursePlayer />} />
          <Route path="Examination" element={<Examination />} />
          <Route path="Examination/:examName" element={<ExamDetails />} />
          <Route path="Examination/:examName/test" element={<ExamTest />} />
          <Route path="Examination/:examName/results" element={<ExamResults />} />
          <Route path="Certificates" element={<Certificates />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="PersonalDetails" element={<PersonalDetails />} />
          <Route path="StudentSecurity" element={<StudentSecurity />} />
          <Route path="StudentPerformance" element={<StudentPerformance />} />
        </Route>

        <Route path="/CollegeDashboard" element={<CollegeDashboardLayout/>}>
            <Route index element={<CollegeDashboard/>}/>
            <Route path="CollegeStudents" element={<CollegeStudents/>}/>
            <Route path="CollegeProfile" element={<CollegeProfile/>}/>
            <Route path="CollegeDetails" element={<CollegeDetails/>}/>
            <Route path="CollegeSecurity" element={<CollegeSecurity/>}/>
            <Route path="CreateExam" element={<CollegeCreateExam/>}/>
            <Route path="ScheduledExams" element={<CollegeScheduledExams/>}/>
            <Route path="ExamHistory" element={<CollegeExamHistory/>}/>
            
        </Route>
        
      </Routes>     
    </Router>
  )
}

export default App
