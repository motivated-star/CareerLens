
import CareerLens from "./pages/CareerLens";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Page from "./pages/Page";
import JobSearchPage from "./pages/JobPage";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<SignupForm/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<CareerLens />} />
        <Route path="/resume-analysis" element={<Page />} />
        <Route path="/job-search" element={<JobSearchPage />} />
      </Routes>
    </>
  )
}

export default App
