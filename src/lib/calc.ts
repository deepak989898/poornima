import { Subject } from "@/types/marksheet";

const gradePoints: Record<string, number> = {
  "A+": 10,
  A: 9,
  "B+": 8,
  B: 7,
  C: 6,
  D: 5,
  F: 0,
};

export function getDefaultSubject(type: Subject["type"]): Subject {
  return {
    id: crypto.randomUUID(),
    type,
    code: "",
    name: "",
    credits: 0,
    maxIE: type === "Theory" ? 40 : 60,
    maxESE: type === "Theory" ? 60 : 40,
    maxTotal: 100,
    obtainedIE: 0,
    obtainedESE: 0,
    obtainedTotal: 0,
    grade: "C",
    status: "Pass",
  };
}

export function syncObtainedTotal(subject: Subject): Subject {
  return {
    ...subject,
    obtainedTotal: Number(subject.obtainedIE) + Number(subject.obtainedESE),
  };
}

export function computeTotals(subjects: Subject[]) {
  const totalMarks = subjects.reduce(
    (sum, subject) => sum + Number(subject.obtainedTotal || 0),
    0,
  );

  const totals = subjects.reduce(
    (acc, subject) => {
      const credits = Number(subject.credits || 0);

      // Rows like "--", I, or W are not part of SGPA formula denominator.
      if (subject.status === "Dash") return acc;

      const grade = subject.status === "Fail" ? "F" : subject.grade.toUpperCase().trim();
      const gradePoint = gradePoints[grade];

      if (gradePoint === undefined) return acc;

      acc.totalCredits += credits;
      acc.weightedPoints += credits * gradePoint;
      return acc;
    },
    { totalCredits: 0, weightedPoints: 0 },
  );

  const sgpa =
    totals.totalCredits > 0 ? Number((totals.weightedPoints / totals.totalCredits).toFixed(2)) : 0;

  return { totalMarks, sgpa, totalCredits: totals.totalCredits, weightedPoints: totals.weightedPoints };
}

export function gradeColor(grade: string): string {
  const upper = grade.toUpperCase();
  if (upper === "A+" || upper === "A") return "text-[#047857]";
  if (upper === "B+" || upper === "B") return "text-[#1d4ed8]";
  if (upper === "C") return "text-[#ea580c]";
  if (upper === "D") return "text-[#a16207]";
  return "text-[#b91c1c]";
}
