import { useEffect, useState } from "react";
import JobCard from "./components/JobCard";

import "./App.css";
import GitHubCard from "./components/GitHubCard";
import { initialJobs, STATUSES } from "./utils/jobs";
import AddJobForm from "./components/AddJobForm";

function App() {
  const migrate = (job) =>
    job.status
      ? job
      : { ...job, status: job.applied ? "applied" : "saved" };

  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved).map(migrate) : initialJobs;
  });

  const [statusFilter, setStatusFilter] = useState("all");
  const [query, setQuery] = useState("");

  const q = query.toLowerCase();

  const visibleJobs = jobs.filter(
    (job) =>
      (job.company.toLowerCase().includes(q) ||
        job.title.toLowerCase().includes(q)) &&
      (statusFilter === "all" || job.status === statusFilter),
  );

  useEffect(() => {
    document.title = `${visibleJobs.length} Jobs Found`;
  }, [visibleJobs.length]);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (newJob) => setJobs([...jobs, newJob]);

  const setStatus = (id, status) =>
    setJobs(jobs.map((j) => (j.id === id ? { ...j, status } : j)));

  const counts = {
    total: jobs.length,
    ...STATUSES.reduce(
      (acc, s) => ({
        ...acc,
        [s]: jobs.filter((j) => j.status === s).length,
      }),
      {},
    ),
  };

  return (
    <div className="card-list">
      <div className="stats">
        {["total", ...STATUSES].map((s) => (
          <div className="stat" key={s}>
            <div className="stat-number">{counts[s]}</div>
            <div className="stat-label">{s}</div>
          </div>
        ))}
      </div>
      <div className="filters">
        <input
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or company..."
        />
        {["all", ...STATUSES].map((s) => (
          <button
            key={s}
            className={statusFilter === s ? "pill active" : "pill"}
            onClick={() => setStatusFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <GitHubCard />
      <AddJobForm onAdd={addJob} />
      {visibleJobs.length !== 0 ? (
        visibleJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onStatusChange={setStatus}
          />
        ))
      ) : (
        <p>0 Jobs FOUND!!</p>
      )}
    </div>
  );
}
export default App;
