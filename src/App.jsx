import { useEffect, useState } from "react";
import JobCard from "./components/JobCard";

import "./App.css";
import GitHubCard from "./components/GitHubCard";

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
    applied: false,
    location: "London",
  },
  {
    id: 3,
    company: "Meta",
    title: "Full Stack Developer",
    salary: 80000,
    location: "London",
    applied: false,
  },
];

function App() {
  const [showAppliedOnly, setShowAppliedOnly] = useState(false);
  const [query, setQuery] = useState("");

  const q = query.toLowerCase();

  const visibleJobs = jobs.filter(
    (job) =>
      (job.company.toLowerCase().includes(q) ||
        job.title.toLowerCase().includes(q)) &&
      (!showAppliedOnly || job.applied),
  );

  useEffect(() => {
    document.title = `${visibleJobs.length} Jobs Found`;
  }, [visibleJobs.length]);

  return (
    <div className="cardList">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title or company..."
      />
      <button onClick={() => setShowAppliedOnly(!showAppliedOnly)}>
        {showAppliedOnly ? "Show All" : "Show Applied"}
      </button>
      <GitHubCard />
      {visibleJobs.length !== 0 ? (
        visibleJobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <p>0 Jobs FOUND!!</p>
      )}
    </div>
  );
}
export default App;
