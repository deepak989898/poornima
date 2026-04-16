import { defaultPersonalDetails, PersonalDetails, Subject } from "@/types/marksheet";

export const ADMIN_SEMESTER_COUNT = 8;

export type AdminSemesterNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const ORDINAL = [
  "First",
  "Second",
  "Third",
  "Fourth",
  "Fifth",
  "Sixth",
  "Seventh",
  "Eighth",
] as const;

type SubjectRow = Omit<Subject, "id">;

function assignIds(rows: SubjectRow[]): Subject[] {
  return rows.map((row) => ({ ...row, id: crypto.randomUUID() }));
}

function personalForSemester(sem: AdminSemesterNumber): PersonalDetails {
  if (sem === 1) {
    return {
      ...defaultPersonalDetails,
      rollNumber: "1C/12/017",
      semester: "First Semester (Main)",
      examDate: "2012",
      statementNumber: "130912",
      issueDate: "02-Mar-2013",
    };
  }
  if (sem === 3) {
    return {
      ...defaultPersonalDetails,
      rollNumber: "2012BMEX1139",
      semester: "Third Semester (Main)",
      examDate: "November 2013",
      statementNumber: "141863",
      issueDate: "08-Jan-2014",
    };
  }
  const examDates = [
    "Dec 2012",
    "May 2013",
    "Dec 2013",
    "May 2014",
    "Dec 2014",
    "May 2015",
    "Dec 2015",
    "May 2016",
  ] as const;
  const statementSuffix = 141641 + (sem - 1) * 111;
  return {
    ...defaultPersonalDetails,
    semester: `${ORDINAL[sem - 1]} Semester (Main)`,
    examDate: examDates[sem - 1],
    statementNumber: String(statementSuffix),
    issueDate: defaultPersonalDetails.issueDate,
  };
}

/** Fourth semester — matches original admin sample marksheet. */
const SEMESTER_4_SUBJECTS: SubjectRow[] = [
  {
    type: "Theory",
    code: "BME04101",
    name: "Fluid Mechanics",
    credits: 3.5,
    maxIE: 40,
    maxESE: 60,
    maxTotal: 100,
    obtainedIE: 13,
    obtainedESE: 15,
    obtainedTotal: 28,
    grade: "F",
    status: "Fail",
  },
  {
    type: "Theory",
    code: "BME04102",
    name: "Kinematics of Machines",
    credits: 4.5,
    maxIE: 40,
    maxESE: 60,
    maxTotal: 100,
    obtainedIE: 19,
    obtainedESE: 0,
    obtainedTotal: 19,
    grade: "F",
    status: "Fail",
  },
  {
    type: "Theory",
    code: "BME04103",
    name: "Mechanical Measurements and Automatic Control",
    credits: 3.0,
    maxIE: 40,
    maxESE: 60,
    maxTotal: 100,
    obtainedIE: 14,
    obtainedESE: 12,
    obtainedTotal: 26,
    grade: "F",
    status: "Fail",
  },
  {
    type: "Theory",
    code: "BME04104",
    name: "Design of Machine Element-I",
    credits: 3.0,
    maxIE: 40,
    maxESE: 60,
    maxTotal: 100,
    obtainedIE: 16,
    obtainedESE: 24,
    obtainedTotal: 40,
    grade: "D",
    status: "Pass",
  },
  {
    type: "Theory",
    code: "BME04105",
    name: "Applied Numerical Techniques & Computing",
    credits: 3.5,
    maxIE: 40,
    maxESE: 60,
    maxTotal: 100,
    obtainedIE: 1,
    obtainedESE: 0,
    obtainedTotal: 1,
    grade: "F",
    status: "Fail",
  },
  {
    type: "Theory",
    code: "BME04108",
    name: "Machining and Machine Tools",
    credits: 3.0,
    maxIE: 40,
    maxESE: 60,
    maxTotal: 100,
    obtainedIE: 5,
    obtainedESE: 9,
    obtainedTotal: 14,
    grade: "F",
    status: "Fail",
  },
  {
    type: "Practical",
    code: "BME04211",
    name: "Fluid Mechanics Lab",
    credits: 1.0,
    maxIE: 60,
    maxESE: 40,
    maxTotal: 100,
    obtainedIE: 34,
    obtainedESE: 27,
    obtainedTotal: 61,
    grade: "B",
    status: "Pass",
  },
  {
    type: "Practical",
    code: "BME04212",
    name: "Kinematics of Machine Lab",
    credits: 1.0,
    maxIE: 60,
    maxESE: 40,
    maxTotal: 100,
    obtainedIE: 29,
    obtainedESE: 30,
    obtainedTotal: 59,
    grade: "C",
    status: "Pass",
  },
  {
    type: "Practical",
    code: "BME04213",
    name: "Mechanical Measurements and Automatic Control Lab",
    credits: 1.0,
    maxIE: 60,
    maxESE: 40,
    maxTotal: 100,
    obtainedIE: 28,
    obtainedESE: 22,
    obtainedTotal: 50,
    grade: "C",
    status: "Pass",
  },
  {
    type: "Practical",
    code: "BME04214",
    name: "Machine Design Sessional-I",
    credits: 1.0,
    maxIE: 60,
    maxESE: 40,
    maxTotal: 100,
    obtainedIE: 35,
    obtainedESE: 25,
    obtainedTotal: 60,
    grade: "B",
    status: "Pass",
  },
  {
    type: "Practical",
    code: "BME04215",
    name: "Applied Numerical Techniques & Computing Lab",
    credits: 1.0,
    maxIE: 60,
    maxESE: 40,
    maxTotal: 100,
    obtainedIE: 10,
    obtainedESE: 28,
    obtainedTotal: 38,
    grade: "F",
    status: "Fail",
  },
  {
    type: "Practical",
    code: "BME04216",
    name: "Soft Skills - II",
    credits: 1.0,
    maxIE: 60,
    maxESE: 40,
    maxTotal: 100,
    obtainedIE: 22,
    obtainedESE: 21,
    obtainedTotal: 43,
    grade: "D",
    status: "Pass",
  },
  {
    type: "Practical",
    code: "BME04617",
    name: "Discipline and Talent Enrichment Programme(TEP)-IV",
    credits: 2.0,
    maxIE: 50,
    maxESE: 0,
    maxTotal: 50,
    obtainedIE: 28,
    obtainedESE: 0,
    obtainedTotal: 28,
    grade: "C",
    status: "Pass",
  },
];

/** First semester — Poornima official sample (Mechanical, 2012). */
const SEMESTER_1_SUBJECTS: SubjectRow[] = [
  t("BT101LN101", "English-I", 2, 11, 13, 24, "F", "Fail"),
  t("BT101PH102", "Engineering Physics-I", 4, 11, 10, 21, "F", "Fail"),
  t("BT101CH103", "Chemistry and Environmental Engineering-I", 4, 11, 16, 27, "F", "Fail"),
  t("BT101MA104", "Engineering Mathematics-I", 4, 11, 0, 11, "F", "Fail"),
  t("BT101ME105", "Engineering Mechanics", 4, 11, 0, 11, "F", "Fail"),
  t("BT101CS106", "Fundamentals of Computer", 2, 17, 0, 17, "F", "Fail"),
  t(
    "BT101PD112",
    "Professional Development Courses(PDC)-I: Soft Skills",
    2,
    11,
    13,
    24,
    "F",
    "Fail",
  ),
  p("BT101PH207", "Engineering Physics Lab-1", 1, 0, 0, 0, "F", "Fail"),
  p("BT101CH208", "Engineering Chemistry Lab-I", 1, 0, 0, 0, "F", "Fail"),
  p("BT101ME209", "Workshop Practice", 1, 10, 0, 10, "F", "Fail"),
  p("BT101ME210", "Practical Geometry", 1, 0, 0, 0, "F", "Fail"),
  p("BT101CS211", "Fundamentals of Computers Lab", 1, 0, 0, 0, "F", "Fail"),
  {
    type: "Practical",
    code: "BT101TP613",
    name: "Discipline and Talent Enrichment Program (TEP)-I",
    credits: 2,
    maxIE: 50,
    maxESE: 0,
    maxTotal: 50,
    obtainedIE: 29,
    obtainedESE: 0,
    obtainedTotal: 29,
    grade: "C",
    status: "Dash",
  },
];

const SEMESTER_2_SUBJECTS: SubjectRow[] = [
  t("BME02101", "Engineering Mathematics-II", 4, 24, 40, 64, "B+", "Pass"),
  t("BME02102", "Material Science and Metallurgy", 3, 16, 22, 38, "F", "Fail"),
  t("BME02103", "Basic Electrical & Electronics Engineering", 4, 20, 30, 50, "C", "Pass"),
  t("BME02104", "Programming for Problem Solving", 3, 28, 45, 73, "A", "Pass"),
  t("BME02105", "Environmental Science", 2, 32, 28, 60, "B", "Pass"),
  p("BME02211", "Electrical & Electronics Lab", 1.5, 44, 40, 84, "A", "Pass"),
  p("BME02212", "Programming Lab", 1.5, 38, 42, 80, "B+", "Pass"),
  p("BME02213", "Material Testing Lab", 1, 35, 30, 65, "B", "Pass"),
  tep("BME02614", "Discipline and TEP-II", 2, 42, "B", "Pass"),
];

/** Third semester — Poornima official sample (Nov 2013). */
const SEMESTER_3_SUBJECTS: SubjectRow[] = [
  t("BME03101", "Material Science and Engineering", 3, 12, 27, 39, "F", "Fail"),
  t("BME03102", "Engineering Thermodynamics", 4.5, 7, 0, 7, "F", "Fail"),
  t("BME03103", "Mechanics of Solids", 4.5, 10, 9, 19, "F", "Fail"),
  t("BME03104", "Manufacturing Processes", 3, 12, 18, 30, "F", "Fail"),
  t("BME03105", "Engineering Mathematics-III", 4.5, 6, 0, 6, "F", "Fail"),
  t("BOE03122", "Nano Science and Technology", 3, 12, 9, 21, "F", "Fail"),
  p("BME03206", "Material Science and Engineering Lab", 1, 27, 14, 41, "D", "Pass"),
  p("BME03207", "Thermal Engineering Lab", 1, 35, 15, 50, "C", "Pass"),
  p("BME03208", "Mechanics of Solid Lab", 1, 41, 18, 59, "C", "Pass"),
  p("BME03209", "Manufacturing Technology Lab-I", 1, 0, 17, 17, "F", "Fail"),
  p("BME03210", "Object Oriented Programming in C++", 1, 33, 25, 58, "C", "Pass"),
  p("BME03211", "Soft Skills - II", 1, 34, 16, 50, "C", "Pass"),
  {
    type: "Practical",
    code: "BME03212",
    name: "Discipline and Talent Enrichment Programme (TEP) - III",
    credits: 2,
    maxIE: 50,
    maxESE: 0,
    maxTotal: 50,
    obtainedIE: 20,
    obtainedESE: 0,
    obtainedTotal: 20,
    grade: "D",
    status: "Dash",
  },
];

const SEMESTER_5_SUBJECTS: SubjectRow[] = [
  t("BME05101", "Heat and Mass Transfer", 4, 19, 33, 52, "C", "Pass"),
  t("BME05102", "Design of Machine Elements-II", 3.5, 21, 38, 59, "B", "Pass"),
  t("BME05103", "Industrial Engineering & Management", 3, 25, 42, 67, "B+", "Pass"),
  t("BME05104", "Refrigeration and Air Conditioning", 3, 12, 20, 32, "F", "Fail"),
  t("BME05105", "Finite Element Methods", 3, 18, 30, 48, "D", "Pass"),
  p("BME05211", "Heat Transfer Lab", 1, 38, 36, 74, "B+", "Pass"),
  p("BME05212", "Machine Design Sessional-II", 1.5, 34, 32, 66, "B", "Pass"),
  p("BME05213", "RAC Lab", 1, 30, 28, 58, "C", "Pass"),
  tep("BME05614", "Discipline and TEP-V", 2, 44, "B+", "Pass"),
];

const SEMESTER_6_SUBJECTS: SubjectRow[] = [
  t("BME06101", "Automobile Engineering", 3.5, 24, 40, 64, "B+", "Pass"),
  t("BME06102", "Operations Research", 3, 20, 35, 55, "C", "Pass"),
  t("BME06103", "Power Plant Engineering", 3.5, 16, 25, 41, "D", "Pass"),
  t("BME06104", "Mechatronics", 3, 22, 38, 60, "B", "Pass"),
  t("BME06105", "Minor Project", 2, 40, 45, 85, "A", "Pass"),
  p("BME06211", "Automobile Lab", 1, 36, 34, 70, "B", "Pass"),
  p("BME06212", "Mechatronics Lab", 1, 32, 30, 62, "B", "Pass"),
  tep("BME06613", "Discipline and TEP-VI", 2, 42, "B", "Pass"),
];

const SEMESTER_7_SUBJECTS: SubjectRow[] = [
  t("BME07101", "Computer Aided Manufacturing", 3, 20, 36, 56, "B", "Pass"),
  t("BME07102", "Total Quality Management", 3, 28, 40, 68, "B+", "Pass"),
  t("BME07103", "Departmental Elective-I", 3, 18, 32, 50, "C", "Pass"),
  t("BME07104", "Open Elective-I", 3, 22, 28, 50, "C", "Pass"),
  {
    type: "Practical",
    code: "BME07105",
    name: "Industrial Training Seminar",
    credits: 2,
    maxIE: 60,
    maxESE: 40,
    maxTotal: 100,
    obtainedIE: 38,
    obtainedESE: 0,
    obtainedTotal: 38,
    grade: "B+",
    status: "Pass",
  },
  p("BME07211", "CAM Lab", 1.5, 40, 38, 78, "A", "Pass"),
  tep("BME07612", "Discipline and TEP-VII", 2, 40, "B", "Pass"),
];

const SEMESTER_8_SUBJECTS: SubjectRow[] = [
  {
    type: "Theory",
    code: "BME08101",
    name: "Major Project",
    credits: 8,
    maxIE: 120,
    maxESE: 80,
    maxTotal: 200,
    obtainedIE: 85,
    obtainedESE: 78,
    obtainedTotal: 163,
    grade: "A",
    status: "Pass",
  },
  t("BME08102", "Departmental Elective-II", 3, 24, 38, 62, "B+", "Pass"),
  t("BME08103", "Open Elective-II", 3, 20, 30, 50, "C", "Pass"),
  t("BME08104", "Professional Ethics & IPR", 2, 35, 35, 70, "B+", "Pass"),
  tep("BME08605", "Discipline and TEP-VIII", 2, 42, "B", "Pass"),
];

function t(
  code: string,
  name: string,
  credits: number,
  ie: number,
  ese: number,
  tot: number,
  grade: string,
  status: Subject["status"],
): SubjectRow {
  return {
    type: "Theory",
    code,
    name,
    credits,
    maxIE: 40,
    maxESE: 60,
    maxTotal: 100,
    obtainedIE: ie,
    obtainedESE: ese,
    obtainedTotal: tot,
    grade,
    status,
  };
}

function p(
  code: string,
  name: string,
  credits: number,
  ie: number,
  ese: number,
  tot: number,
  grade: string,
  status: Subject["status"],
): SubjectRow {
  return {
    type: "Practical",
    code,
    name,
    credits,
    maxIE: 60,
    maxESE: 40,
    maxTotal: 100,
    obtainedIE: ie,
    obtainedESE: ese,
    obtainedTotal: tot,
    grade,
    status,
  };
}

/** TEP / sessional style: IE-only, max 50 (matches official fourth-sem TEP row). */
function tep(
  code: string,
  name: string,
  credits: number,
  ie: number,
  grade: string,
  status: Subject["status"],
): SubjectRow {
  return {
    type: "Practical",
    code,
    name,
    credits,
    maxIE: 50,
    maxESE: 0,
    maxTotal: 50,
    obtainedIE: ie,
    obtainedESE: 0,
    obtainedTotal: ie,
    grade,
    status,
  };
}

const SUBJECTS_BY_SEM: Record<AdminSemesterNumber, SubjectRow[]> = {
  1: SEMESTER_1_SUBJECTS,
  2: SEMESTER_2_SUBJECTS,
  3: SEMESTER_3_SUBJECTS,
  4: SEMESTER_4_SUBJECTS,
  5: SEMESTER_5_SUBJECTS,
  6: SEMESTER_6_SUBJECTS,
  7: SEMESTER_7_SUBJECTS,
  8: SEMESTER_8_SUBJECTS,
};

export type AdminSemesterFormState = {
  personalDetails: PersonalDetails;
  subjects: Subject[];
};

/** Fresh form from the built-in semester template (new UUIDs each call). */
export function buildAdminSemesterPreset(sem: AdminSemesterNumber): AdminSemesterFormState {
  return {
    personalDetails: personalForSemester(sem),
    subjects: assignIds(SUBJECTS_BY_SEM[sem]),
  };
}

export function adminSemesterLabel(sem: AdminSemesterNumber): string {
  return `Semester ${sem} default data`;
}

export function ordinalSemesterTitle(sem: AdminSemesterNumber): string {
  return `${ORDINAL[sem - 1]} Semester (Main)`;
}
