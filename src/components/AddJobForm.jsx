import { useState } from "react";

const initialJobData = {
  title: "",
  company: "",
  salary: "",
  location: "",
};

const AddJobForm = ({ onAdd }) => {
  const [job, setJob] = useState(initialJobData);

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the browser's full-page reload
    if (
      job.title.trim() === "" ||
      job.company.trim() === "" ||
      job.location.trim() === "" ||
      job.salary.trim() === ""
    )
      return; // validation guard 🛡
    onAdd({
      ...job,
      id: crypto.randomUUID(),
      salary: Number(job.salary),
      applied: false,
    });
    setJob(initialJobData); // controlled input → clearing is one setter
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={job.title}
        onChange={(e) => setJob({ ...job, title: e.target.value })}
        placeholder="Job Title"
      />
      <input
        value={job.company}
        onChange={(e) => setJob({ ...job, company: e.target.value })}
        placeholder="Company"
      />
      <input
        value={job.salary}
        type="number"
        onChange={(e) => setJob({ ...job, salary: e.target.value })}
        placeholder="Salary"
      />
      <input
        value={job.location}
        onChange={(e) => setJob({ ...job, location: e.target.value })}
        placeholder="Location"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddJobForm;
