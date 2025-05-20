import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import SignUpForm from './components/SignUp';
import LogInForm from './components/LogIn';
import Page from './pages/Page';



function App() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/home" element={<Page />} />
      </Routes>
    </div>
  );
}

export default App;
