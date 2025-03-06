import React, { useState } from "react";

function SGPAcalculator() {
  const subject = ["ML", "AI", "UHV", "SPM", "Elective", "AD Lab", "AI Lab"];

  const [point, setPoint] = useState(new Array(subject.length).fill(""));

  const [sgpa, setSgpa] = useState(0);
  const [hiddenRes, setHiddenRes] = useState(true);

  const handleInputChange = (value, index) => {
    const updatedPoints = [...point];
    updatedPoints[index] = value;
    setPoint(updatedPoints);
  };

  const CalculateSGPA = () => {

    console.log(point)
    const points = point.map(Number)
    const creditObtained =
      4 * points[0] +
      3 * (points[1] + points[2] + points[3] + points[4]) +
      points[5] +
      points[6];
    const totalCredit = 18;
    const res = parseFloat((creditObtained / totalCredit).toFixed(2));

    console.log(res)
    setSgpa(res);
    setHiddenRes(false);
  };

  return (
    <div className="bg-blue-900 min-h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-5xl text-white my-8 font-bold">SGPA Calculator</h1>

      <div className="w-full max-w-2xl overflow-x-auto rounded-lg shadow-lg bg-gray-800">
        <table className="min-w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-900 text-gray-200">
              <th className="border border-gray-700 p-4 text-lg">Subject</th>
              <th className="border border-gray-700 p-4 text-lg">Points</th>
            </tr>
          </thead>
          <tbody>
            {subject.map((sub, index) => (
              <tr
                key={index}
                className="odd:bg-gray-700 even:bg-gray-600 hover:bg-gray-500 transition"
              >
                <td className="border border-gray-700 p-4 text-center">
                  <button className="bg-amber-600 px-6 py-3 rounded-lg w-full text-white font-semibold shadow-md hover:bg-amber-700 transition">
                    {sub}
                  </button>
                </td>
                <td className="border border-gray-700 p-4 text-center">
                  <input
                  min="0"
                  max="10"
                    value={point[index]}
                    onChange={(e) => handleInputChange(e.target.value, index)}
                    className="w-full text-center px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    type="number"
                    placeholder="Enter Points"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={CalculateSGPA}
        className="bg-amber-600 mt-10 text-white font-bold p-4 rounded-2xl hover:bg-amber-700"
      >
        Calculate
      </button>

      <p
        className={`text-white font-bold text-xl mt-5 ${hiddenRes ? "hidden" : ""}`}
      >
        Your SGPA is: {sgpa}
      </p>
    </div>
  );
}

export default SGPAcalculator;
