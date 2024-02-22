
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import StudentRegistration from "./components/System/StudentRegistration/StudentRegistrationForm";
import StudentRecords from "./components/System/StudentRecords/StudentRecords";
import Record from './components/System/StudentRecords/Record';
import CambridgePaymentRecords from './components/System/PaymentRecords/CambridgePayments/CambridgePaymentRecords';
import ElocutionPayments from './components/System/PaymentRecords/ElocutionPayments/ElocutionPayments';
import GeneralPayments from './components/System/PaymentRecords/GeneralPayments/GeneralPayments';
import CambridgePaymentRecordsMark from './components/System/PaymentRecords/CambridgePayments/CambridgePaymentRecordsMark';
import CambridgePaymentRecordsView from './components/System/PaymentRecords/CambridgePayments/CambridgePaymentRecordsView';
import ElocutionPaymentRecordsMark from './components/System/PaymentRecords/ElocutionPayments/ElocutionPaymentRecordsMark';
import ElocutionPaymentRecordsView from './components/System/PaymentRecords/ElocutionPayments/ElocutionPaymentRecordsView';
import GeneralPaymentRecordsMark from './components/System/PaymentRecords/GeneralPayments/GeneralPaymentRecordsMark';
import GeneralPaymentRecordsView from './components/System/PaymentRecords/GeneralPayments/GeneralPaymentRecordsView';
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<StudentRegistration />} />
        </Routes>
        <Routes>
          <Route path="/" element={<StudentRecords />} />
        </Routes>
        <Routes>
          <Route path="/record" element={<Record />} />
        </Routes>
        <Routes>
          <Route path="/CambridgePaymentRecords" element={<CambridgePaymentRecords />} />
        </Routes>
        <Routes>
          <Route path="/ElocutionPayments" element={<ElocutionPayments />} />
        </Routes>
        <Routes>
          <Route path="/GeneralPayments" element={<GeneralPayments />} />
        </Routes>
        <Routes>
          <Route path="/CambridgePaymentRecordsMark" element={<CambridgePaymentRecordsMark />} />
        </Routes>
        <Routes>
          <Route path="/CambridgePaymentRecordsView" element={<CambridgePaymentRecordsView />} />
        </Routes>
        <Routes>
          <Route path="/ElocutionPaymentRecordsMark" element={<ElocutionPaymentRecordsMark />} />
        </Routes>
        <Routes>
          <Route path="/ElocutionPaymentRecordsView" element={<ElocutionPaymentRecordsView />} />
        </Routes>
        <Routes>
          <Route path="/GeneralPaymentRecordsMark" element={<GeneralPaymentRecordsMark />} />
        </Routes>
        <Routes>
          <Route path="/GeneralPaymentRecordsView" element={<GeneralPaymentRecordsView />} />
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App
