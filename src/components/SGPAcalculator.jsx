import React, { useState } from "react";

const semesterData = {
  1: { subjects: ["Maths", "English", "Chemistry", "B Etc", "Chemistry Lab", "Yoga", "Engineering Lab", "Comm. Lab", "Elective 1", "Elective 2", "Workshop"], credits: [4, 3, 3, 3, 1, 1, 1, 1, 3, 3, 1] },
  2: { subjects: ["Maths", "Physics", "Sci of Living System", "EVS", "C Progamming Lab", "ED", "Elective 1", "Elective 2"], credits: [4, 4, 3, 3, 4, 1, 1, 1] },
  3: { subjects: ["Maths", "IND 4", "Data Structures", "AFL", "DS Lab", "DSD Lab", "Elective"], credits: [4, 2, 3, 3, 3, 2, 1] },
  4: { subjects: ["Maths", "STW", "OS", "OOPs J", "DBMS", "COA", "OS Lab", "Java Lab", "DBMS Lab", "Elective"], credits: [4, 3, 3, 3, 3, 4, 1, 1, 1, 2] },
  5: { subjects: ["DAA", "SE", "CN", "Engg. Economics", "Elective 1", "Elective 2", "DAA Lab", "CN lab", "K explore"], credits: [3, 4, 3, 3, 3, 3, 1, 1, 2] },
  6: { subjects: ["ML", "AI", "UHV", "SPM", "Open Elective", "AD Lab", "AI Lab", "Minor Project"], credits: [4, 3, 3, 3, 3, 2, 1, 2] },
  7: { subjects: ["Department elective 2", "Department elective 3", "Department elective 4", "Open elective 2", "Legal issues", "AMD Lab", "Project", "Practical Training"], credits: [3,3,3,3,1,2,2,2] },
  8: { subjects: ["Open Elective", "Department Elective", "Project", "Seminar", "Grand Viva"], credits: [3,3,6,2,2] },
};

function SGPAcalculator() {
  const [semester, setSemester] = useState(6);
  const subjects = semesterData[semester].subjects;
  const credits = semesterData[semester].credits;
  const [marks, setMarks] = useState(new Array(subjects.length).fill(""));
  const [sgpa, setSgpa] = useState(null);

  // Function to convert marks (0-100) to grade points (1-10)
  const convertMarksToGradePoint = (marks) => {
    if (marks < 0) return 0;
    if (marks > 100) return 10;
    return Math.floor(marks / 10) + 1; // Divides marks into grade points
  };

  const handleInputChange = (value, index) => {
    let num = Number(value);

    if (Number.isInteger(num) && num >= 0 && num <= 100) {
      const updatedMarks = [...marks];
      updatedMarks[index] = num;
      setMarks(updatedMarks);
    }
  };

  const calculateSGPA = () => {
    const gradePoints = marks.map(convertMarksToGradePoint);
    const creditObtained = gradePoints.reduce((acc, point, index) => acc + (point * credits[index]), 0);
    const totalCredit = credits.reduce((acc, credit) => acc + credit, 0);
    setSgpa((creditObtained / totalCredit).toFixed(2));
  };

  return (
    <div className="bg-blue-900 min-h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-5xl text-white my-8 font-bold">SGPA Calculator</h1>

      <select 
        value={semester} 
        onChange={(e) => setSemester(Number(e.target.value))} 
        className="mb-4 p-3 rounded-lg bg-gray-800 text-white font-semibold"
      >
        {Object.keys(semesterData).map((sem) => (
          <option key={sem} value={sem}>Semester {sem}</option>
        ))}
      </select>
      

      <div className="w-full max-w-2xl overflow-x-auto rounded-lg shadow-lg bg-gray-800">
        <table className="min-w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-900 text-gray-200">
              <th className="border border-gray-700 p-4 text-lg">Subject</th>
              <th className="border border-gray-700 p-4 text-lg">Marks (Out of 100)</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub, index) => (
              <tr key={index} className="odd:bg-gray-700 even:bg-gray-600 hover:bg-gray-500 transition">
                <td className="border border-gray-700 p-4 text-center">
                  <button className="bg-amber-600 px-6 py-3 rounded-lg w-full text-white font-semibold shadow-md hover:bg-amber-700 transition">
                    {sub}
                  </button>
                </td>
                <td className="border border-gray-700 p-4 text-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={marks[index]}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    className="w-full text-center px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-amber-500"
                    placeholder="Enter Marks"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={calculateSGPA} className="bg-amber-600 mt-6 text-white font-bold p-4 rounded-xl hover:bg-amber-700">
        Calculate SGPA
      </button>

      {sgpa !== null && (
        <p className="text-white font-bold text-xl mt-5">Your SGPA is: {sgpa}</p>
      )}
    </div>
  );
}

export default SGPAcalculator;
export { semesterData };
