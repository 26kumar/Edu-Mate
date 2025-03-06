import React, { useState } from "react";

function AttendanceCalculator() {
  const [present, setPresent] = useState(0);
  const [total, setTotal] = useState(0);
  const [credit, setCredit] = useState(0);

  const [result, setResult] = useState("");
  const [weeks, setWeeks] = useState("");
  const [attendance, setAttendance] = useState(0);
  const [weeksHidden, setWeeksHidden] = useState(true);
  const [Hidden, setHidden] = useState(true);

  const calculate = (e) => {
    console.log("Running...");
    e.preventDefault();

    if (total === 0) {
      setResult("Total classes cannot be zero");
      return;
    }

    if (present > total) {
      setResult("No. of present days cannot exceed total no. of classes");
      return;
    }

    let daysToAttend = (100 * present) / total;
    setAttendance(daysToAttend.toFixed(2));
    setHidden(false);
    let weeksToAttend = 0;

    if (credit === 0) {
      console.log(credit);
    }

    if (daysToAttend >= 75) {
      setResult(
        `You already have more than 75% attendance (${daysToAttend.toFixed(
          2
        )}%)`
      );
    } else {
      setWeeksHidden(false);
      daysToAttend = 3 * total - 4 * present;
      weeksToAttend = daysToAttend / credit;
      setResult(
        `You need to attend ${daysToAttend} more days to make 75% attendance`
      );
      setWeeks(
        `Hence , You need to attend ${weeksToAttend} more weeks to make 75% attendance`
      );
    }

    return 0;
  };
  return (
    <div className="bg-blue-900 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl text-white my-8 font-bold">
        Attendance Calculator
      </h1>
      <form
        onSubmit={calculate}
        className="flex flex-col bg-blue-400 w-96 p-4 rounded-sm"
      >
        <input
          type="number"
          placeholder="No. of class attended"
          onChange={(e) => setPresent(Number(e.target.value))}
          className="bg-blue-200 rounded p-3 m-2 outline-none hover:bg-blue-300 shadow-2xl"
        />
        <input
          type="number"
          placeholder="Total no. of class"
          onChange={(e) => setTotal(Number(e.target.value))}
          className="bg-blue-200 rounded p-3 m-2 outline-none hover:bg-blue-300 shadow-2xl"
        />

        <input
          type="number"
          placeholder="Subject Credit"
          onChange={(e) => setCredit(Number(e.target.value))}
          className="bg-blue-200 rounded p-3 m-2 outline-none hover:bg-blue-300 shadow-2xl"
        />

        <button
          type="submit"
          className="bg-blue-600 p-3 m-2 rounded-md text-white font-bold hover:bg-blue-700"
        >
          Calculate
        </button>

        <p
          className={`text-white bg-gray-700 p-4 my-2 rounded-md text-center font-bold shadow-md ${
            Hidden ? "hidden" : ""
          }`}
        >
          Current Attendance is: {attendance}%
        </p>

        <p className= {`text-white bg-gray-800 p-4 my-2 rounded-md text-center shadow-md ${
            Hidden ? "hidden" : ""
          }`}>
          {result}
        </p>

        <p
          className={`text-white bg-gray-900 p-4 my-2 rounded-md text-center shadow-md ${
            weeksHidden ? "hidden" : ""
          }`}
        >
          {weeks}
        </p>
      </form>
    </div>
  );
}

export default AttendanceCalculator;
