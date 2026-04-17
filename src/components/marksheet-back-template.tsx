import { MarksheetLayout } from "@/components/marksheet-layout";

const passingRows = [
  { course: "a) B. Tech., BCA, B. Com. & BBA", ese: "35%", total: "40%" },
  { course: "b) B. Arch.", ese: "45%", total: "50%" },
  { course: "c) MBA & M. Tech.", ese: "40%", total: "40%" },
];

const gradeRows = [
  { grade: "A+", performance: "Outstanding", point: "10" },
  { grade: "A", performance: "Excellent", point: "9" },
  { grade: "B+", performance: "Very good", point: "8" },
  { grade: "B", performance: "Good", point: "7" },
  { grade: "C", performance: "Average", point: "6" },
  { grade: "D", performance: "Satisfactory", point: "5" },
  { grade: "F", performance: "Fail", point: "0" },
  { grade: "I", performance: "Incomplete", point: "----" },
  { grade: "W", performance: "Withdrawal", point: "----" },
];

export function MarksheetBackTemplate() {
  return (
    <MarksheetLayout>
      <div className="relative flex h-full flex-col bg-[#f2ebeb] px-8 py-7 text-[15px] text-black">
        <div className="marksheet-security-bg pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div className="marksheet-security-grid absolute inset-0" />
        </div>

        <div className="relative z-10 h-full">
          <h2 className="text-[20px] font-bold text-[#1a237e]">
            Brief Guidelines for Scheme of Evaluation and Grading:-
          </h2>

          <div className="mt-4 space-y-3 text-[15px] leading-snug">
            <div className="flex items-start">
              <span className="w-6 shrink-0">1.</span>
              <p>
                The performance of every student in each subject of a course will be evaluated in two components:
                (1) IE: Internal Evaluation (2) ESE: End Semester Examination.
              </p>
            </div>
            <div className="flex items-start">
              <span className="w-6 shrink-0">2.</span>
              <p>
                The minimum passing marks for various courses in each component of theory as well as practical /
                sessional subjects are as indicated below:
              </p>
            </div>
          </div>

          <table className="mx-auto mt-3 w-[72%] border-collapse text-[14px]">
            <thead>
              <tr className="bg-[#eaf1fb] font-bold text-[#1d2d69]">
                <th className="px-4 py-1 text-left">Courses</th>
                <th className="px-4 py-1 text-center">ESE</th>
                <th className="px-4 py-1 text-center">Total</th>
              </tr>
            </thead>
            <tbody className="font-semibold">
              {passingRows.map((row) => (
                <tr key={row.course}>
                  <td className="px-4 py-1">{row.course}</td>
                  <td className="px-4 py-1 text-center">{row.ese}</td>
                  <td className="px-4 py-1 text-center">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-9 flex items-start text-[15px] leading-snug">
            <span className="w-6 shrink-0">3.</span>
            <p>
              The level of student's academic performance as an aggregate of IE and ESE components will be reflected
              by Letter Grades on a ten point scale as follows:
            </p>
          </div>

          <table className="mx-auto mt-2 w-[72%] border-collapse text-[14px]">
            <thead>
              <tr className="bg-[#eaf1fb] font-bold text-[#1d2d69]">
                <th className="px-4 py-1 text-left">Grade</th>
                <th className="px-4 py-1 text-left">Academic Performance</th>
                <th className="px-4 py-1 text-center">Grade Point (G)</th>
              </tr>
            </thead>
            <tbody className="font-semibold">
              {gradeRows.map((row) => (
                <tr key={row.grade}>
                  <td className="px-4 py-[2px]">{row.grade}</td>
                  <td className="px-4 py-[2px]">{row.performance}</td>
                  <td className="px-4 py-[2px] text-center">{row.point}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 space-y-3 text-[15px] leading-snug">
            <div className="flex items-start">
              <span className="w-6 shrink-0">4.</span>
              <p>
                Semester Grade Point Average (SGPA) is calculated as{" "}
                <span className="inline-block whitespace-nowrap border-b border-black pb-[1px] font-bold">
                  SGPA = (C1G1 + C2G2 + ... + CiGi + ...) / (C1 + C2 + ... + Ci + ...)
                </span>{" "}
                where Ci is the number of credits allotted to the subject "i", Gi is the Grade Point associated to
                the Grade given to that subject "i".
              </p>
            </div>
            <div className="flex items-start">
              <span className="w-6 shrink-0">5.</span>
              <p>
                The Talent Enrichment Program ensures the holistic development of students through active
                participation in varieties of clubs falling in technical/social/literary/personal skills categories
                based on their choice.
              </p>
            </div>
            <div className="flex items-start">
              <span className="w-6 shrink-0">6.</span>
              <p>
                Discipline and Talent Enrichment Program will be counted in calculation of SGPA but it is not a
                backlog subject.
              </p>
            </div>
            <div className="flex items-start">
              <span className="w-6 shrink-0">7.</span>
              <p>GPass: denotes pass by the award of grace determined by Moderation Committee.</p>
            </div>
          </div>

          <p className="absolute bottom-12 text-[14px] leading-snug">
            <span className="font-bold">Note:</span> In case of discrepancy/error, this statement of grades should be
            returned to this office within a week from the date of its receipt. No application will be entertained
            thereafter.
          </p>
        </div>
      </div>
    </MarksheetLayout>
  );
}
