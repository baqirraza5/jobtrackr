export type Status = "saved" | "applied" | "interview" | "offer";

export type Job = {
  id: number | string;
  title: string;
  company: string;
  salary: number;
  location: string;
  status: Status;
};

export type JobDraft = {
  title: string;
  company: string;
  salary: string;
  location: string;
};

export type JobCount = Record<Status, number> & { total: number };

export const initialJobs: Job[] = [
  {
    id: 1,
    company: "Google",
    title: "AI Product Engineer",
    salary: 55000,
    status: "saved",
    location: "London",
  },
  {
    id: 2,
    company: "Microsoft",
    title: "Data Analyst",
    salary: 59000,
    status: "saved",
    location: "London",
  },
  {
    id: 3,
    company: "Meta",
    title: "Full Stack Developer",
    salary: 80000,
    location: "London",
    status: "saved",
  },
];

export const STATUSES: Status[] = [
  "saved",
  "applied",
  "interview",
  "offer",
];
