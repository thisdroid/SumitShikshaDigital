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
import SubscriptionPlans from './pages/collegePortal/CollegeProfile_icon/CollegePlan'

//ADMIN PORTAL

import AdminDashboardLayout from './pages/AdminPortal/AdminDashboardLayout'
import AdminDashboard from './pages/AdminPortal/AdminDashboard';
import College_Exams from './pages/AdminPortal/AdminExams/College_Exams'
import Manage_Exams from './pages/AdminPortal/AdminExams/Manage_Exams'
import ManageCollegeQuestions from './pages/AdminPortal/AdminQuestions/ManageCollegeQuestions';
import ManageQuestions from './pages/AdminPortal/AdminQuestions/ManageQuestions';
import Admin_College from './pages/AdminPortal/AdminSection/Admin_College';
import Admin_Student from './pages/AdminPortal/AdminSection/Admin_Student';
import QuestionBank from './pages/AdminPortal/AdminQuestions/QuestionBank'
import AddnewQuestions from './pages/AdminPortal/AdminQuestions/AddnewQuestions'
import AddCollegeQuestions from './pages/AdminPortal/AdminQuestions/AddCollegeQuestions'
import ViewCollegeQuestions from './pages/AdminPortal/AdminQuestions/ViewCollegeQuestions'
import AddnewExams from './pages/AdminPortal/AdminExams/AddnewExams'
import StudentManagement from './pages/AdminPortal/AdminSection/StudentManagement'

import CollegeRegisteredStudents from './pages/AdminPortal/AdminSection/CollegeResiteredStudents'
import MarksWithoutCollege from './pages/AdminPortal/AdminSection/MarksWithoutCollege'
import RegisteredColleges from './pages/AdminPortal/AdminSection/RegisteredColleges'
import PendingColleges from './pages/AdminPortal/AdminSection/PendingColleges'
import CourseManagement from './pages/AdminPortal/AdminExams/CourseManagement'
import ContactManagement from './pages/AdminPortal/ContactManagement'
import UpdateCourseDetails from './pages/AdminPortal/AdminExams/UpdateCourseDetails'
import ExamQuestions from './pages/AdminPortal/AdminExams/ExamQuestions'
import UpdateQuestions from './pages/AdminPortal/AdminExams/UpdateQuestions'
import AdminCourses from './pages/AdminPortal/AdminCourses/AdminCourses'
import AddCourse from './pages/AdminPortal/AdminCourses/AddCourse'
import CourseList from './pages/AdminPortal/AdminCourses/CourseList'
import EditCourse from './pages/AdminPortal/AdminCourses/EditCourse'
import StudentExamList from './pages/AdminPortal/AdminSection/StudentExamList'
import StudentExamDetail from './pages/AdminPortal/AdminSection/StudentExamDetail'
import MarksWithCollege from './pages/AdminPortal/AdminSection/MarksWithCollege'


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
            <Route path="YourPlan" element={<SubscriptionPlans/>}/>
        </Route>

        <Route path="/AdminDashboard" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="StudentSection" element={<Admin_Student />} />
          <Route path='StudentManagement' element={<StudentManagement />} />
          <Route path='MarksWithoutCollege' element={<MarksWithoutCollege />} />
          <Route path='CollegeRegisteredStudents' element={<CollegeRegisteredStudents />} />
          <Route path='MarksWithCollege' element={<MarksWithCollege />} />
          <Route path='ContactManagement' element={<ContactManagement />} />
          <Route path='UpdateQuestions/:examName' element={<UpdateQuestions />} />
          <Route path='ExamQuestions' element={<ExamQuestions />} />
          <Route path="/AdminDashboard/StudentExamList/:studentName" element={<StudentExamList />} />
          <Route path="/AdminDashboard/StudentExamDetail/:studentName/:examName" element={<StudentExamDetail />} />


           {/* COLLEGE SECTION */}
          <Route path="CollegeSection" element={<Admin_College />} />
          <Route path='RegisteredColleges' element={<RegisteredColleges />} />
          <Route path='PendingColleges' element={<PendingColleges />} />
          <Route path="ManageQuestions" element={<ManageQuestions />} />
          <Route path="ManageCollegeQuestions" element={<ManageCollegeQuestions />} />



          {/* QUESTIONS ROUTES */}
          <Route path="QuestionBank" element={<QuestionBank />} />
          <Route path="AddnewQuestions" element={<AddnewQuestions />} />
          <Route path="AddCollegeQuestions" element={<AddCollegeQuestions />} />
          <Route path="ViewCollegeQuestions" element={<ViewCollegeQuestions />} />


           {/* EXAMS ROUTES */}
          <Route path="ManageExams" element={<Manage_Exams />} />
          <Route path="ManageCollegeExams" element={<College_Exams />} />
          <Route path='AddnewExams' element={<AddnewExams examType="platform" />} />
          <Route path='AddnewExamsCollege' element={<AddnewExams examType="college" />} />
          <Route path='CourseManagement' element={<CourseManagement examType="platform" />} />
          <Route path='CourseManagementCollege' element={<CourseManagement examType="college" />} />
          <Route path='Manage_Exams' element={<Manage_Exams />} />
          <Route path='College_Exams' element={<College_Exams />} />
          <Route path='UpdateCourseDetails/:examName' element={<UpdateCourseDetails />} />


            {/* SORTED ROUTES */}
          <Route path='AdminCourses' element={<AdminCourses />} />
          <Route path='AddCourse' element={<AddCourse />} />
          <Route path='CourseList' element={<CourseList />} />
          <Route path="/AdminDashboard/EditCourse/:courseIndex" element={<EditCourse />} />
        </Route>
        
      </Routes>     
    </Router>
  )
}

export default App
