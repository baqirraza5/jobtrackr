import { useState } from "react";
import JobCard from "./components/JobCard";

import "./App.css";

const jobs = [
  {
    id: 1,
    company: "Google",
    title: "AI Product Engineer",
    salary: 55000,
    applied: false,
    location: "London",
  },
  {
    id: 2,
    company: "Microsoft",
    title: "Data Analyst",
    salary: 59000,
    applied: true,
    location: "London",
  },
  {
    id: 3,
    company: "Meta",
    title: "Full Stack Developer",
    salary: 80000,
    location: "London",
    applied: true,
  },
];

function App() {
  const [showAppliedOnly, setShowAppliedOnly] = useState(false);

  const visibleJobs = showAppliedOnly
    ? jobs.filter((job) => job.applied)
    : jobs;

  return (
    <div className="cardList">
      <button onClick={() => setShowAppliedOnly(!showAppliedOnly)}>
        {showAppliedOnly ? "Show All" : "Show Applied"}
      </button>
      {visibleJobs.length !== 0 ? (
        visibleJobs.map((job) => <JobCard job={job} />)
      ) : (
        <p>0 Jobs Applied</p>
      )}
    </div>
  );
}
export default App;
