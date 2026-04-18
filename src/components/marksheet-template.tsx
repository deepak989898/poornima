import { MarksheetLayout } from "@/components/marksheet-layout";
import { Footer } from "@/components/marksheet/footer";
import { Header } from "@/components/marksheet/header";
import { StudentDetails } from "@/components/marksheet/student-details";
import { SubjectTable } from "@/components/marksheet/subject-table";
import { computeTotals } from "@/lib/calc";
import { StudentRecord } from "@/types/marksheet";

type MarksheetTemplateProps = { record: StudentRecord };

export function MarksheetTemplate({ record }: MarksheetTemplateProps) {
  const backCount = record.subjects.filter((subject) => subject.status === "Fail").length;
  const { sgpa, totalCredits, weightedPoints } = computeTotals(record.subjects);
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
          <div className="flex flex-1 flex-col px-4 pb-2">
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
            <div className="flex flex-1 flex-col">
              <Footer
                sgpa={sgpa}
                totalCredits={totalCredits}
                weightedPoints={weightedPoints}
                issueDate={record.personalDetails.issueDate}
                backCount={backCount}
              />
            </div>
          </div>
        </div>
      </div>
    </MarksheetLayout>
  );
}
