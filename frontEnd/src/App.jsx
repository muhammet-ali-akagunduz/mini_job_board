import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './components/AppLayout'
import CandidateApplicationsPage from './pages/CandidateApplicationsPage'
import EmployerJobsPage from './pages/EmployerJobsPage'
import JobsPage from './pages/JobsPage'
import LoginPage from './pages/LoginPage'
import NewJobPage from './pages/NewJobPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/jobs" replace />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/applications/my" element={<CandidateApplicationsPage />} />
        <Route path="/employer/jobs" element={<EmployerJobsPage />} />
        <Route path="/jobs/new" element={<NewJobPage />} />
      </Route>
    </Routes>
  )
}

export default App
