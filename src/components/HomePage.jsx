import React from 'react';
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen p-6 bg-blue-600">
      <h1 className="mb-16 text-6xl font-extrabold text-white text-center">
        Welcome to EduMate !!!
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        <NavLink to="/attendanceCal">
          <button className="green-button">Calculate your Attendance</button>
        </NavLink>

        <NavLink to="/SGPACal">
          <button className="green-button">Calculate your SGPA</button>
        </NavLink>

        <button 
          onClick={() => window.open("https://kiitkatalog.gfgkiit.in/", "_blank")}
          className="green-button">Get PYQ's
        </button>

        <button 
          onClick={() => window.open("https://drive.google.com/drive/folders/1uA3uJgCl_cegUIPbUtEcFQesMoloz9PD", "_blank")}
          className="green-button">Get Semester Notes
        </button>

        <button 
          onClick={() => window.open("https://kiitportal.kiituniversity.net/irj/portal/", "_blank")}
          className="green-button">SAP Portal
        </button>

      </div>
    </div>
  )
}

export default HomePage;
