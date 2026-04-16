export type SubjectType = "Theory" | "Practical";

export type Subject = {
  id: string;
  type: SubjectType;
  code: string;
  name: string;
  credits: number;
  maxIE: number;
  maxESE: number;
  maxTotal: number;
  obtainedIE: number;
  obtainedESE: number;
  obtainedTotal: number;
  grade: string;
  /** `Dash` renders as "--" (e.g. TEP rows). `GracePass` renders as "GPass". */
  status: "Pass" | "Fail" | "Dash" | "GracePass";
};

export type PersonalDetails = {
  candidateName: string;
  enrollmentNumber: string;
  rollNumber: string;
  motherName: string;
  fatherName: string;
  semester: string;
  branch: string;
  examDate: string;
  statementNumber: string;
  issueDate: string;
};

export type StudentRecord = {
  id: string;
  personalDetails: PersonalDetails;
  subjects: Subject[];
  totalMarks: number;
  sgpa: number;
  createdAt: string;
};

export const defaultPersonalDetails: PersonalDetails = {
  candidateName: "RAVINDRA KUMAR GOCHER",
  enrollmentNumber: "2012/01546",
  rollNumber: "2012BMEXU39",
  motherName: "SANTOSH BAI",
  fatherName: "AMAR LAL GOCHER",
  semester: "Fourth Semester (Main)",
  branch: "Mechanical Engineering",
  examDate: "May 2014",
  statementNumber: "141641",
  issueDate: "30-Jun-2014",
};
