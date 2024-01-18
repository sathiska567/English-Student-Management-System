
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import StudentRegistration from "./components/System/StudentRegistration/StudentRegistrationForm";

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentRegistration />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
