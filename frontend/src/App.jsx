import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Training from './pages/Training'
import StudentLogin from './pages/StudentLogin'
import StudentSignup from './pages/StudentSignup'
import StudentLog from './pages/Student'
import College from './pages/College'
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
        {/* Add more routes here */}
      </Routes>
    </Router>
  )
}

export default App