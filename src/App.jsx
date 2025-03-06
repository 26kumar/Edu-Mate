import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
import AttendanceCalculator from './components/AttendanceCalculator';
import HomePage from './components/HomePage'
import SGPAcalculator from './components/SGPAcalculator';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/attendanceCal" element={<AttendanceCalculator/>}/>
      <Route path="/SGPACal" element={<SGPAcalculator/>}/>
    </Routes>
  )
}

export default App
