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
  const base = defaultPersonalDetails;

  if (sem === 1) {
    return {
      ...base,
      semester: "First Semester (Main)",
      examDate: "2012",
      statementNumber: "130419",
      issueDate: "27-Feb-2013",
    };
  }
  if (sem === 2) {
    return {
      ...base,
      semester: "Second Semester (Main)",
      examDate: "May 2013",
      statementNumber: "131963",
      issueDate: "19-Jun-2013",
    };
  }
  if (sem === 3) {
    return {
      ...base,
      semester: "Third Semester (Main)",
      examDate: "November 2013",
      statementNumber: "141863",
      issueDate: "08-Jan-2014",
    };
  }
  if (sem === 4) {
    return {
      ...base,
      statementNumber: "141950",
    };
  }
  if (sem === 5) {
    return {
      ...base,
      semester: "Fifth Semester (Main)",
      examDate: "Dec 2014",
      statementNumber: "142085",
      issueDate: "30-Jan-2015",
    };
  }
  if (sem === 6) {
    return {
      ...base,
      semester: "Sixth Semester (Main)",
      examDate: "May 2015",
      statementNumber: "142196",
      issueDate: "30-Jun-2015",
    };
  }
  if (sem === 8) {
    return {
      ...base,
      semester: "Eighth Semester (Main)",
      examDate: "May 2016",
      statementNumber: "142418",
      issueDate: "30 June 2016",
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
    ...base,
    semester: `${ORDINAL[sem - 1]} Semester (Main)`,
    examDate: examDates[sem - 1],
    statementNumber: String(statementSuffix),
    issueDate: base.issueDate,
  };
}

/** Fourth semester — Poornima sample (May 2014, SGPA 7.16, NIL back). */
const SEMESTER_4_SUBJECTS: SubjectRow[] = [
  t("BME04101", "Fluid Mechanics", 3.5, 28, 39, 67, "B", "Pass"),
  t("BME04102", "Kinematics of Machines", 4.5, 29, 44, 73, "B+", "Pass"),
  t("BME04103", "Mechanical Measurements and Automatic Control", 3, 23, 28, 51, "C", "Pass"),
  t("BME04104", "Design of Machine Element-I", 3, 28, 28, 56, "C", "Pass"),
  t("BME04105", "Applied Numerical Techniques & Computing", 3.5, 30, 31, 61, "B", "Pass"),
  t("BME04108", "Machining and Machine Tools", 3, 27, 35, 62, "B", "Pass"),
  p("BME04211", "Fluid Mechanics Lab", 1, 39, 29, 68, "B", "Pass"),
  p("BME04212", "Kinematics of Machine Lab", 1, 41, 28, 69, "B", "Pass"),
  p("BME04213", "Mechanical Measurements and Automatic Control Lab", 1, 46, 29, 75, "B+", "Pass"),
  p("BME04214", "Machine Design Sessional-I", 1, 37, 26, 63, "B", "Pass"),
  p("BME04215", "Applied Numerical Techniques & Computing Lab", 1, 46, 28, 74, "B+", "Pass"),
  p("BME04216", "Soft Skills - III", 1, 40, 23, 63, "B", "Pass"),
  {
    type: "Practical",
    code: "BME04617",
    name: "Discipline and Talent Enrichment Programme (TEP) - IV",
    credits: 2,
    maxIE: 50,
    maxESE: 0,
    maxTotal: 50,
    obtainedIE: 43,
    obtainedESE: 0,
    obtainedTotal: 43,
    grade: "A",
    status: "Dash",
  },
];

/** First semester — Poornima sample (NIL back). */
const SEMESTER_1_SUBJECTS: SubjectRow[] = [
  t("BT101LN101", "English-I", 2, 25, 30, 55, "C", "Pass"),
  t("BT101PH102", "Engineering Physics-I", 4, 17, 33, 50, "C", "Pass"),
  t("BT101CH103", "Chemistry and Environmental Engineering-I", 4, 25, 37, 62, "B", "Pass"),
  t("BT101MA104", "Engineering Mathematics-I", 4, 24, 40, 64, "B", "Pass"),
  t("BT101ME105", "Engineering Mechanics", 4, 24, 24, 48, "D", "Pass"),
  t("BT101CS106", "Fundamentals of Computer", 2, 26, 29, 55, "C", "Pass"),
  t("BT101PD112", "Professional Development Courses(PDC)-I: Soft Skills", 2, 21, 41, 62, "B", "Pass"),
  p("BT101PH207", "Engineering Physics Lab-1", 1, 24, 21, 45, "D", "Pass"),
  p("BT101CH208", "Engineering Chemistry Lab-I", 1, 38, 33, 71, "B+", "Pass"),
  p("BT101ME209", "Workshop Practice", 1, 48, 24, 72, "B+", "Pass"),
  p("BT101ME210", "Practical Geometry", 1, 25, 25, 50, "C", "Pass"),
  p("BT101CS211", "Fundamentals of Computers Lab", 1, 49, 27, 76, "B+", "Pass"),
  {
    type: "Practical",
    code: "BT101TP613",
    name: "Discipline and Talent Enrichment Program (TEP)-I",
    credits: 2,
    maxIE: 50,
    maxESE: 0,
    maxTotal: 50,
    obtainedIE: 33,
    obtainedESE: 0,
    obtainedTotal: 33,
    grade: "B",
    status: "Dash",
  },
];

/** Second semester — BT102 series (SGPA 7.10, NIL back). Six labs + TEP = 31 credits. */
const SEMESTER_2_SUBJECTS: SubjectRow[] = [
  t("BT102LN101", "English-II", 2, 33, 40, 73, "B+", "Pass"),
  t("BT102PH102", "Engineering Physics-II", 4, 27, 32, 59, "C", "Pass"),
  t("BT102CH103", "Chemistry & Environmental Engineering-II", 4, 33, 15, 48, "D", "GracePass"),
  t("BT102MA104", "Engineering Mathematics-II", 4, 19, 31, 50, "C", "Pass"),
  t("BT102EE105", "Electrical & Electronics Engineering", 4, 27, 38, 65, "B", "Pass"),
  t("BT102CS106", "Programming In C", 3, 30, 43, 73, "B+", "Pass"),
  t(
    "BT102PD112",
    "Professional Development Courses-II: Life and Career Skills",
    2,
    34,
    48,
    82,
    "A",
    "Pass",
  ),
  p("BT102PH207", "Engineering Physics Lab-II", 1, 44, 28, 72, "B+", "Pass"),
  p("BT102CH208", "Engineering Chemistry Lab-II", 1, 56, 33, 89, "A", "Pass"),
  p("BT102EE209", "Electrical & Electronics Lab", 1, 45, 30, 75, "B+", "Pass"),
  p("BT102ME210", "Machine Drawing", 1, 42, 27, 69, "B", "Pass"),
  p("BT102CS211", "Computer Programming Lab", 1, 47, 33, 80, "A", "Pass"),
  p("BT102PD214", "Language Lab", 1, 40, 25, 65, "B", "Pass"),
  {
    type: "Practical",
    code: "BT102TP613",
    name: "Discipline and Talent Enrichment Program",
    credits: 2,
    maxIE: 50,
    maxESE: 0,
    maxTotal: 50,
    obtainedIE: 43,
    obtainedESE: 0,
    obtainedTotal: 43,
    grade: "A",
    status: "Dash",
  },
];

/** Third semester — Poornima sample (Nov 2013, promoted NIL back). */
const SEMESTER_3_SUBJECTS: SubjectRow[] = [
  t("BME03101", "Material Science and Engineering", 3, 25, 48, 73, "B+", "Pass"),
  t("BME03102", "Engineering Thermodynamics", 4.5, 20, 35, 55, "C", "Pass"),
  t("BME03103", "Mechanics of Solids", 4.5, 20, 30, 50, "C", "Pass"),
  t("BME03104", "Manufacturing Processes", 3, 28, 34, 62, "B", "Pass"),
  t("BME03105", "Engineering Mathematics-III", 4.5, 23, 16, 39, "D", "GracePass"),
  t("BOE03121", "Industrial Psychology and Sociology", 3, 28, 27, 55, "C", "Pass"),
  p("BME03206", "Material Science and Engineering Lab", 1, 42, 20, 62, "B", "Pass"),
  p("BME03207", "Thermal Engineering Lab", 1, 51, 19, 70, "B+", "Pass"),
  p("BME03208", "Mechanics of Solid Lab", 1, 51, 30, 81, "A", "Pass"),
  p("BME03209", "Manufacturing Technology Lab-I", 1, 46, 27, 73, "B+", "Pass"),
  p("BME03210", "Object Oriented Programming in C++", 1, 51, 18, 69, "B", "Pass"),
  p("BME03211", "Soft Skills - II", 1, 41, 23, 64, "B", "Pass"),
  {
    type: "Practical",
    code: "BME03212",
    name: "Discipline and Talent Enrichment Programme (TEP) - III",
    credits: 2,
    maxIE: 50,
    maxESE: 0,
    maxTotal: 50,
    obtainedIE: 34,
    obtainedESE: 0,
    obtainedTotal: 34,
    grade: "B",
    status: "Dash",
  },
];

/** Fifth semester — Poornima sample (Dec 2014, SGPA 6.38, NIL back). */
const SEMESTER_5_SUBJECTS: SubjectRow[] = [
  t("BME05101", "Dynamics of Machines", 4.5, 18, 19, 37, "D", "GracePass"),
  t("BME05102", "Heat and Mass Transfer", 4.5, 20, 26, 46, "D", "Pass"),
  t("BME05103", "Manufacturing Science and Technology", 3, 28, 32, 60, "B", "Pass"),
  t("BME05104", "Automobile Engineering", 3, 32, 32, 64, "B", "Pass"),
  t("BOE05128", "Essentials of Management", 4, 21, 36, 57, "C", "Pass"),
  p("BME05205", "Dynamics of Machines Lab", 1, 49, 24, 73, "B+", "Pass"),
  p("BME05206", "Manufacturing Technology Lab-II", 1.5, 38, 36, 74, "B+", "Pass"),
  p("BME05207", "Automobile Engineering Lab", 1, 29, 19, 48, "D", "Pass"),
  p("BME05208", "Heat Transfer Lab", 1, 40, 32, 72, "B+", "Pass"),
  p("BME05209", "Machine Drawing Lab", 1.5, 43, 33, 76, "B+", "Pass"),
  p("BME05410", "Industrial Training Seminar", 0.5, 36, 29, 65, "B", "Pass"),
  {
    type: "Practical",
    code: "BME05611",
    name: "Discipline and Talent Enrichment Programme (TEP) - V",
    credits: 2,
    maxIE: 50,
    maxESE: 0,
    maxTotal: 50,
    obtainedIE: 39,
    obtainedESE: 0,
    obtainedTotal: 39,
    grade: "B+",
    status: "Dash",
  },
];

/** Sixth semester — Poornima sample (May 2015, SGPA 7.87, NIL back). */
const SEMESTER_6_SUBJECTS: SubjectRow[] = [
  t("BME06101", "Design of Machine Element-II", 4.5, 28, 42, 70, "B+", "Pass"),
  t("BME06102", "IC Engines", 4, 30, 43, 73, "B+", "Pass"),
  t("BME06103", "Noise, Vibration and Harshness", 3.5, 23, 39, 62, "B", "Pass"),
  t("BME06104", "Hydraulic Machines and Hydroelectric Power Plants", 3.5, 27, 26, 53, "C", "Pass"),
  t("BME06109", "Industrial Engineering", 3, 33, 39, 72, "B+", "Pass"),
  p("BME06210", "Turbo-Machinery Lab", 1, 49, 31, 80, "A", "Pass"),
  p("BME06211", "IC Engines Lab", 1, 52, 35, 87, "A", "Pass"),
  p("BME06212", "Mechanical Vibration Lab", 1, 47, 34, 81, "A", "Pass"),
  p("BME06213", "Auto CAD Lab", 1, 38, 32, 70, "B+", "Pass"),
  p("BME06214", "Human Skills", 1, 39, 25, 64, "B", "Pass"),
  p("BME06415", "Industrial Training Seminar", 1, 55, 32, 87, "A", "Pass"),
  {
    type: "Practical",
    code: "BME06616",
    name: "Discipline and Talent Enrichment Programme (TEP)-VI",
    credits: 2,
    maxIE: 50,
    maxESE: 0,
    maxTotal: 50,
    obtainedIE: 50,
    obtainedESE: 0,
    obtainedTotal: 50,
    grade: "A+",
    status: "Dash",
  },
];

const SEMESTER_7_SUBJECTS: SubjectRow[] = [
  t("BME07101", "Product Design and Development", 4, 21, 30, 51, "C", "Pass"),
  t("BME07102", "Operations Research", 4.5, 27, 30, 57, "C", "Pass"),
  t("BME07103", "Refrigeration and Air Conditioning", 4.5, 26, 26, 52, "C", "Pass"),
  t("BME07104", "Computer Aided Design", 3, 24, 37, 61, "B", "Pass"),
  t("BME07108", "Computer Integrated Manufacturing", 3, 17, 38, 55, "C", "Pass"),
  t("BOE07139", "Basics of Petro Industry", 3, 19, 26, 45, "D", "Pass"),
  p("BME07210", "Computer-Aided Design (CAD) Lab", 1.5, 45, 33, 78, "B+", "Pass"),
  p("BME07211", "CNC Programming Lab", 1, 45, 28, 73, "B+", "Pass"),
  p("BME07212", "Refrigeration and Air Conditioning Lab", 1, 46, 25, 71, "B+", "Pass"),
  p("BME07313", "Minor Project", 2, 42, 22, 64, "B", "Pass"),
  p("BME07414", "Technical Seminar", 1, 37, 14, 51, "C", "Pass"),
  tep("BME07615", "Discipline & Talent Enrichment Programme (TEP)- VII", 2, 47, "A+", "Dash"),
];

const SEMESTER_8_SUBJECTS: SubjectRow[] = [
  t("BME08101", "Renewable Energy Technology", 3, 21, 29, 50, "D", "Pass"),
  t("BME08102", "Gas Turbine and Gas Power Plant", 3.5, 22, 28, 50, "D", "Pass"),
  t("BME08103", "Mechatronics", 3, 20, 30, 50, "D", "Pass"),
  t("BME08105", "Operation Management", 3, 24, 36, 60, "C", "Pass"),
  p("BME08209", "Industrial Engineering and Robotics Lab", 1.5, 37, 23, 60, "C", "Pass"),
  p("BME08210", "Computational Mechanics Lab", 1.5, 31, 19, 50, "D", "Pass"),
  p("BME08211", "Computer-Aided Engineering (CAE) Lab", 1.5, 36, 24, 60, "C", "Pass"),
  p("BME08312", "Major Project", 6, 38, 22, 60, "C", "Pass"),
  tep("BME08613", "Discipline and Talent Enrichment Programme (TEP)-VIII", 2, 38, "B+", "Dash"),
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
