import { STATUSES } from "../utils/jobs";

const JobCard = ({ job, onStatusChange }) => {
  const meta = [
    job.company,
    job.salary ? `£${job.salary.toLocaleString("en-GB")}` : null,
    job.location || null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    // <div className="card">
    //   <div className="logo" />
    //   <div className="info">
    //     <h3>{job.title}</h3>
    //     <p>
    //       {job.company} - £{job.salary}
    //     </p>
    //     <p>{job.location}</p>
    //   </div>
    //
    // </div>
    <div className="job-card">
      <div className="avatar">{job.company[0].toUpperCase()}</div>
      <div className="job-info">
        <h3 className="job-title">{job.title}</h3>
        <p className="job-meta">{meta}</p>
      </div>
      <select
        className={`badge badge-${job.status}`}
        value={job.status}
        onChange={(e) => onStatusChange(job.id, e.target.value)}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};

export default JobCard;
