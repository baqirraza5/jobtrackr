import { useEffect, useState } from "react";
import JobCard from "./components/JobCard";

import "./App.css";
import GitHubCard from "./components/GitHubCard";
import {
  initialJobs,
  type Job,
  type JobCount,
  type Status,
  STATUSES,
} from "./utils/jobs";
import AddJobForm from "./components/AddJobForm";
import NavBar from "./components/NavBar";

function App() {
  const migrate = (job: Job & { applied?: boolean }) =>
    job.status
      ? job
      : { ...job, status: job.applied ? "applied" : "saved" };

  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved).map(migrate) : initialJobs;
  });

  const [statusFilter, setStatusFilter] = useState<"all" | Status>(
    "all",
  );
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

  const addJob = (newJob: Job) => setJobs([newJob, ...jobs]);

  const setStatus = (id: number | string, status: Status) =>
    setJobs(jobs.map((j) => (j.id === id ? { ...j, status } : j)));

  const statusCounts = STATUSES.reduce(
    (acc, s) => ({
      ...acc,
      [s]: jobs.filter((j) => j.status === s).length,
    }),
    {} as Record<Status, number>,
  );

  const counts: JobCount = { ...statusCounts, total: jobs.length };

  const statKeys: ("total" | Status)[] = ["total", ...STATUSES];
  const filterKeys: ("all" | Status)[] = ["all", ...STATUSES];

  return (
    <div className="card-list">
      <NavBar />
      <div className="stats">
        {statKeys.map((s) => (
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
        <div className="pill-row">
          {filterKeys.map((s) => (
            <button
              key={s}
              className={statusFilter === s ? "pill active" : "pill"}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
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
        <div className="empty-state">
          <p className="empty-title">No jobs match</p>
          <p className="empty-hint">
            Try a different search or filter, or add your first job
            above.
          </p>
        </div>
      )}
      <GitHubCard />
    </div>
  );
}
export default App;
