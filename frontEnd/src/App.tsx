
import CareerLens from "./pages/CareerLens";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Page from "./pages/Page";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    {/* <CareerLens /> */}
    {/* <LoginForm /> */}
    {/* <SignupForm /> */}
     <Routes>
        <Route path="/" element={<SignupForm/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<CareerLens />} />
        <Route path="/resume-analysis" element={<Page />} />
      </Routes>
    </>
  )
}

export default App
