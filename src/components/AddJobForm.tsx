import { useState, type SubmitEvent } from "react";
import { type JobDraft, type Job } from "../utils/jobs";

const initialJobData: JobDraft = {
  title: "",
  company: "",
  salary: "",
  location: "",
};

type AddJobFormProps = {
  onAdd: (job: Job) => void;
};

const AddJobForm = ({ onAdd }: AddJobFormProps) => {
  const [job, setJob] = useState(initialJobData);
  const [error, setError] = useState("");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (job.title.trim() === "" || job.company.trim() === "") {
      setError("Title and company are required.");
      return;
    }

    setError("");

    onAdd({
      ...job,
      id: crypto.randomUUID(),
      salary: Number(job.salary),
      status: "saved",
    });
    setJob(initialJobData); // controlled input → clearing is one setter
  };

  return (
    <form onSubmit={handleSubmit} className="add-job-form">
      <h2 className="form-title">Add a job</h2>
      <div className="form-fields">
        <input
          className={
            error && job.title.trim() === ""
              ? "input input-error"
              : "input"
          }
          value={job.title}
          onChange={(e) => {
            setJob({ ...job, title: e.target.value });
            setError("");
          }}
          placeholder="Title *"
        />
        <input
          className={
            error && job.company.trim() === ""
              ? "input input-error"
              : "input"
          }
          value={job.company}
          onChange={(e) => {
            setJob({ ...job, company: e.target.value });
            setError("");
          }}
          placeholder="Company *"
        />
        <input
          className="input"
          value={job.salary}
          type="number"
          onChange={(e) => setJob({ ...job, salary: e.target.value })}
          placeholder="Salary"
        />
        <input
          className="input"
          value={job.location}
          onChange={(e) =>
            setJob({ ...job, location: e.target.value })
          }
          placeholder="Location"
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="btn-primary">
        Add
      </button>
    </form>
  );
};

export default AddJobForm;
