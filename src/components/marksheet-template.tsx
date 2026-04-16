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

  return (
    <MarksheetLayout>
      <div className="relative flex h-full flex-col bg-[#f2ebeb]">
        {/* Security paper look: subtle 15px square grid + very faint centered seal. */}
        <div className="marksheet-security-bg pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div className="marksheet-security-grid absolute inset-0" />
        </div>

        <div className="relative z-10 flex h-full flex-col">
          <Header personalDetails={record.personalDetails} logoSrc={officialLogo} />
          <div className="px-4 pb-2">
            <StudentDetails personalDetails={record.personalDetails} />
            <div className="relative mx-auto mt-4 w-[96%]">
              <div
                className="marksheet-table-watermark pointer-events-none absolute inset-[6%] z-0 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${officialLogo}')` }}
                aria-hidden
              />
              <div className="relative z-[1]">
                <SubjectTable subjects={record.subjects} />
              </div>
            </div>
            <Footer sgpa={record.sgpa} issueDate={record.personalDetails.issueDate} backCount={backCount} />
          </div>
        </div>
      </div>
    </MarksheetLayout>
  );
}
