import { MarksheetLayout } from "@/components/marksheet-layout";
import { StudentRecord } from "@/types/marksheet";

type ProvisionalCertificateTemplateProps = {
  record: StudentRecord;
};

function issueDateParts(issueDate: string) {
  const parsed = new Date(issueDate);
  if (Number.isNaN(parsed.getTime())) {
    return { year: "2016", display: issueDate || "September 27, 2017" };
  }
  return {
    year: String(parsed.getFullYear()),
    display: parsed.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  };
}

export function ProvisionalCertificateTemplate({ record }: ProvisionalCertificateTemplateProps) {
  const officialLogo = "/poornima-university-logo.png";
  const { personalDetails } = record;
  const dateParts = issueDateParts(personalDetails.issueDate);
  const fixedPassingYear = "2016";
  const fixedIssueDateDisplay = "August 26, 2016";

  return (
    <MarksheetLayout>
      <div className="relative flex h-full flex-col bg-[#f2ebeb] text-black">
        <div className="marksheet-security-bg pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div className="marksheet-security-grid absolute inset-0" />
        </div>

        <div className="relative z-10 flex h-full flex-col px-8 py-6">
          <div
            className="marksheet-table-watermark pointer-events-none absolute inset-[14%] z-0 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${officialLogo}')` }}
            aria-hidden
          />
          <div className="relative z-[1] flex h-full flex-col">
            <header className="pb-2">
              <div className="flex items-center justify-center gap-4">
                <img src={officialLogo} alt="Poornima University logo" className="h-[108px] w-[108px]" />
                <div className="text-center leading-none text-[#17258e]">
                  <div className="flex items-end justify-center border-b-2 border-[#17258e] pb-[1px]">
                    <span className="text-[86px] font-bold leading-[0.8] tracking-[2px]">P</span>
                    <span className="-ml-[1px] text-[66px] font-bold leading-[0.8] tracking-[2px]">OORNIMA</span>
                  </div>
                  <p className="pt-[4px] text-[36px] font-bold tracking-[11px]">UNIVERSITY</p>
                </div>
              </div>
              <p className="mt-1 text-center text-[10px] font-semibold leading-none">
                (Estd. by Rajasthan State Legislature vide Act No. 16/2012 & recognized under section 22 (1) of UGC
                Act 1956)
              </p>
            </header>

            <h2 className="mt-8 text-center text-[18px] font-bold tracking-wide">PROVISIONAL CERTIFICATE</h2>

            <section className="mx-auto mt-8 grid w-[86%] grid-cols-[190px_16px_1fr] gap-y-4 text-[15px] leading-[1.25]">
            <p className="whitespace-nowrap font-semibold">Name of Candidate</p>
            <p className="text-center">:</p>
            <p className="whitespace-nowrap">{personalDetails.candidateName}</p>

            <p className="whitespace-nowrap font-semibold">Enrolment No.</p>
            <p className="text-center">:</p>
            <p className="whitespace-nowrap">{personalDetails.enrollmentNumber}</p>

            <p className="whitespace-nowrap font-semibold">Roll No.</p>
            <p className="text-center">:</p>
            <p className="whitespace-nowrap">{personalDetails.rollNumber}</p>

            <p className="whitespace-nowrap font-semibold">Mother&apos;s Name</p>
            <p className="text-center">:</p>
            <p className="whitespace-nowrap">{personalDetails.motherName}</p>

            <p className="whitespace-nowrap font-semibold">Father&apos;s Name</p>
            <p className="text-center">:</p>
            <p className="whitespace-nowrap">{personalDetails.fatherName}</p>

            <p className="whitespace-nowrap font-semibold">School Name</p>
            <p className="text-center">:</p>
            <p className="whitespace-nowrap">School of Engineering & Technology</p>

            <p className="whitespace-nowrap font-semibold">Course</p>
            <p className="text-center">:</p>
            <p className="whitespace-nowrap">Bachelor of Technology</p>

            <p className="whitespace-nowrap font-semibold">Branch/Specialization</p>
            <p className="text-center">:</p>
            <p className="whitespace-nowrap">{personalDetails.branch}</p>

            <p className="whitespace-nowrap font-semibold">Passing Year</p>
            <p className="text-center">:</p>
            <p className="whitespace-nowrap">{fixedPassingYear}</p>

            <p className="whitespace-nowrap font-semibold">CGPA</p>
            <p className="text-center">:</p>
            <p className="whitespace-nowrap">6.58</p>

            <p className="whitespace-nowrap font-semibold">Division</p>
            <p className="text-center">:</p>
            <p className="whitespace-nowrap">Second Division</p>
            </section>

            <section className="mt-44 grid grid-cols-2 items-end text-[15px] font-semibold">
              <div>
                <p>Controller of Examinations</p>
                <p className="mt-5 text-[14px] font-normal">Place : Jaipur</p>
                <p className="mt-2 text-[14px] font-normal">Date of Issue : {fixedIssueDateDisplay}</p>
              </div>
              <div className="text-right">
                <p>Registrar</p>
              </div>
            </section>

            <footer className="mt-auto pt-8 text-center text-[11px] leading-snug">
              <p>( Valid till the original degree is issued at the next convocation )</p>
              <p>
                IS-2027 to 2031, Ramchandrapura, P.O. Vidhani Vatika, Sitapura Extension, Jaipur-303 905 (Rajasthan)
              </p>
              <p>Phone : +91-141-750250-51 * E-mail : info@poornima.edu.in * www.poornima.edu.in</p>
            </footer>
          </div>
        </div>
      </div>
    </MarksheetLayout>
  );
}
