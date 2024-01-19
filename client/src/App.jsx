
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import StudentRegistration from "./components/System/StudentRegistration/StudentRegistrationForm";
import StudentRecords from "./components/System/StudentRecords/StudentRecords";
import PaymentRecords from './components/System/PaymentRecords/PaymentRecords';
import Record from './components/System/StudentRecords/Record';
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<StudentRegistration />} />
        </Routes>
        <Routes>
          <Route path="/records" element={<StudentRecords />} />
        </Routes>
        <Routes>
          <Route path="/payments" element={<PaymentRecords />} />
        </Routes>
        <Routes>
          <Route path="/record" element={<Record />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
