
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import StudentRegistration from "./components/System/StudentRegistration/StudentRegistrationForm";
import StudentRecords from "./components/System/StudentRecords/StudentRecords";
import PaymentRecords from './components/System/PaymentRecords/PaymentRecords';
import Record from './components/System/StudentRecords/Record';
import ViewPaymentRecord from './components/System/PaymentRecords/ViewPaymentRecord';
import MarkPaymentRecord from './components/System/PaymentRecords/MarkPaymentRecord';
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
        <Routes>
          <Route path="/markPayment" element={<MarkPaymentRecord />} />
        </Routes>
        <Routes>
          <Route path="/viewPayment" element={<ViewPaymentRecord />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
