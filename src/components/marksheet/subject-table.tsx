import { Subject } from "@/types/marksheet";

type SubjectTableProps = {
  subjects: Subject[];
};

/** Keeps vertical grid continuous (single colspan row breaks column lines). */
function sectionDividerRow(label: string) {
  const filler = (key: string) => (
    <td key={key} className="marksheet-data-cell px-[6px] py-[6px] text-center leading-none">
      {"\u00a0"}
    </td>
  );

  return (
    <tr className="marksheet-section-row font-bold">
      <td className="marksheet-data-cell marksheet-section-first px-[8px] pb-[6px] pt-[10px] underline">{label}</td>
      {filler("c")}
      {filler("m1")}
      {filler("m2")}
      {filler("m3")}
      {filler("o1")}
      {filler("o2")}
      {filler("o3")}
      {filler("g")}
      {filler("s")}
    </tr>
  );
}

function rows(subjects: Subject[], type: Subject["type"]) {
  return subjects
    .filter((subject) => subject.type === type)
    .map((subject) => (
      <tr key={subject.id} className="marksheet-row">
        <td className="marksheet-subject-cell marksheet-data-cell px-[8px] py-[6px]">
          <div className="flex items-start gap-x-3">
            <span className="w-[5.5rem] shrink-0 font-semibold leading-snug">{subject.code}</span>
            <span className="min-w-0 flex-1 leading-snug">{subject.name}</span>
          </div>
        </td>
        <td className="marksheet-data-cell px-[8px] py-[6px] text-center">{subject.credits}</td>
        <td className="marksheet-data-cell px-[8px] py-[6px] text-center">{subject.maxIE}</td>
        <td className="marksheet-data-cell px-[8px] py-[6px] text-center">{subject.maxESE}</td>
        <td className="marksheet-data-cell px-[8px] py-[6px] text-center">{subject.maxTotal}</td>
        <td className="marksheet-data-cell px-[8px] py-[6px] text-center">{subject.obtainedIE}</td>
        <td className="marksheet-data-cell px-[8px] py-[6px] text-center">{subject.obtainedESE}</td>
        <td className="marksheet-data-cell px-[8px] py-[6px] text-center">{subject.obtainedTotal}</td>
        <td className="marksheet-data-cell px-[8px] py-[6px] text-center font-bold">{subject.grade}</td>
        <td className="marksheet-data-cell px-[8px] py-[6px] text-center">
          {subject.status === "Fail" ? "Back" : subject.status === "Dash" ? "--" : "Pass"}
        </td>
      </tr>
    ));
}

export function SubjectTable({ subjects }: SubjectTableProps) {
  return (
    <table className="marksheet-grade-table w-full border-collapse border border-black text-[11px]">
      <colgroup>
        <col style={{ width: "43%" }} />
        <col style={{ width: "7%" }} />
        <col style={{ width: "6%" }} />
        <col style={{ width: "6%" }} />
        <col style={{ width: "6%" }} />
        <col style={{ width: "6%" }} />
        <col style={{ width: "6%" }} />
        <col style={{ width: "6%" }} />
        <col style={{ width: "6%" }} />
        <col style={{ width: "8%" }} />
      </colgroup>
      <thead>
        <tr className="border-b border-black bg-transparent">
          <th rowSpan={2} className="border border-black px-[8px] py-[8px] text-left text-[12px] leading-tight">
            Code and Name of the Subject
          </th>
          <th rowSpan={2} className="border border-black px-[6px] py-[8px] text-[12px] leading-tight">
            Credits
          </th>
          <th colSpan={3} className="border border-black px-[6px] py-[8px] text-[12px] leading-tight">
            Maximum Marks
          </th>
          <th colSpan={3} className="border border-black px-[6px] py-[8px] text-[12px] leading-tight">
            Marks Obtained
          </th>
          <th rowSpan={2} className="border border-black px-[6px] py-[8px] text-[12px] leading-tight">
            Grade
          </th>
          <th rowSpan={2} className="border border-black px-[6px] py-[8px] text-[12px] leading-tight">
            Status
          </th>
        </tr>
        <tr className="border-b border-black bg-transparent">
          {["IE", "ESE", "TOTAL", "IE", "ESE", "TOTAL"].map((label, index) => (
            <th key={`${label}-${index}`} className="border border-black px-[6px] py-[4px] text-[11px] leading-tight">
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sectionDividerRow("Theory")}
        {rows(subjects, "Theory")}
        {sectionDividerRow("Practical / Sessional")}
        {rows(subjects, "Practical")}
      </tbody>
    </table>
  );
}
