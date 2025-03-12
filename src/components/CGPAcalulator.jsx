import React, { useState, useEffect } from "react";
import { semesterData } from "./SGPAcalculator";

function CGPAcalculator() {
  const [totalCummIndex, setIndex] = useState(0);
  const [totalPrevCredit, setTotalCredit] = useState(0);
  const [totalCurrCredit, setCurrCredit] = useState(0);
  const [Hidden, setHidden] = useState(true);

  const [semester, setSemester] = useState(1);
  const [oldCgpa, setOldCgpa] = useState(0);
  const [sgpa, setSgpa] = useState(0);
  const [newCgpa, setNewCgpa] = useState(0);

  // Use useEffect to update totalPreviousCredits and totalCurrentCredits only when semester changes
  useEffect(() => {
    if (semester > 1) {
      const totalPreviousCredits = Object.keys(semesterData)
        .filter((sem) => Number(sem) < semester) // Take only previous semesters
        .reduce(
          (acc, sem) =>
            acc +
            semesterData[sem].credits.reduce((sum, credit) => sum + credit, 0),
          0
        );
      setTotalCredit(totalPreviousCredits);
    }

    const totalCurrentCredits =
      semesterData[semester]?.credits.reduce(
        (acc, credit) => acc + credit,
        0
      ) || 0;
    setCurrCredit(totalCurrentCredits);
  }, [semester]); // Runs only when `semester` changes

  const CalculateCGPA = () => {
    setIndex(totalPrevCredit * oldCgpa);
    const newAggregate = totalCummIndex + totalCurrCredit * sgpa;

    const newCalculatedCgpa =
      newAggregate / (totalCurrCredit + totalPrevCredit);
    console.log(newAggregate);
    console.log(newCalculatedCgpa);
    setNewCgpa(newCalculatedCgpa.toFixed(2));
    setHidden(false);
  };

  return (
    <div className="bg-blue-900 min-h-screen flex flex-col justify-center items-center w-full p-6">
      <h1 className="text-5xl text-white my-6 font-bold text-center">
        CGPA Calculator
      </h1>

      <div className="bg-blue-300 p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6">
          <select
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            className="p-4 w-full sm:w-56 rounded-lg bg-blue-500 text-white font-semibold outline-none shadow-md"
          >
            {Object.keys(semesterData).map((sem) => (
              <option key={sem} value={sem} className="bg-blue-400 text-black">
                Semester {sem}
              </option>
            ))}
          </select>

          <input
            className="bg-blue-500 p-4 rounded-lg w-full sm:w-56 text-white placeholder-gray-200 outline-none shadow-md text-lg"
            type="number"
            placeholder="CGPA till now"
            onChange={(e) => setOldCgpa(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <input
            className="bg-blue-500 p-4 rounded-lg w-full sm:w-56 text-white placeholder-gray-200 outline-none shadow-md text-lg"
            type="number"
            placeholder="SGPA in this sem"
            onChange={(e) => setSgpa(Number(e.target.value))}
          />

          <button
            onClick={CalculateCGPA}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-lg shadow-lg w-full sm:w-56 transition text-lg"
          >
            Calculate
          </button>
        </div>
      </div>

      <p
        className={`text-white bg-gradient-to-r from-blue-600 to-blue-800 p-5 my-4 rounded-xl 
    text-center font-bold shadow-lg border-2 border-blue-400 transition-all duration-300 
    ${Hidden ? "hidden" : "scale-105"}`}
      >
        🎉 Your New CGPA: <span className="text-yellow-300">{newCgpa}</span>
      </p>
    </div>
  );
}

export default CGPAcalculator;
