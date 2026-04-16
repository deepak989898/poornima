import { MarksheetLayout } from "@/components/marksheet-layout";
import { Footer } from "@/components/marksheet/footer";
import { Header } from "@/components/marksheet/header";
import { StudentDetails } from "@/components/marksheet/student-details";
import { SubjectTable } from "@/components/marksheet/subject-table";
import { StudentRecord } from "@/types/marksheet";

type MarksheetTemplateProps = { record: StudentRecord };

export function MarksheetTemplate({ record }: MarksheetTemplateProps) {
  const backCount = record.subjects.filter((subject) => subject.status === "Fail").length;
  const officialLogo = "/poornima-university-logo.png";
  /** Same circular logo as header; faint behind grades table only (official marksheet). */
  const tableWatermarkSrc = officialLogo;

  return (
    <MarksheetLayout>
      <div className="flex h-full flex-col bg-white">
        <Header personalDetails={record.personalDetails} logoSrc={officialLogo} />
        <div className="px-4 pb-2">
          <StudentDetails personalDetails={record.personalDetails} />
          <div className="relative mx-auto mt-4 w-[96%]">
            <div
              className="pointer-events-none absolute left-[9%] right-[9%] top-[6%] bottom-[6%] z-0 bg-contain bg-center bg-no-repeat opacity-[0.15]"
              style={{ backgroundImage: `url('${tableWatermarkSrc}')` }}
              aria-hidden
            />
            <div className="relative z-[1]">
              <SubjectTable subjects={record.subjects} />
            </div>
          </div>
          <Footer sgpa={record.sgpa} issueDate={record.personalDetails.issueDate} backCount={backCount} />
        </div>
      </div>
    </MarksheetLayout>
  );
}
