import { PersonalDetails } from "@/types/marksheet";

type StudentDetailsProps = {
  personalDetails: PersonalDetails;
};

export function StudentDetails({ personalDetails }: StudentDetailsProps) {
  return (
    <section className="mt-4 px-3 py-2 text-[14px]">
      
      <div className="grid grid-cols-[9.5rem_0.45rem_1fr_8rem_0.45rem_1fr] gap-y-[6px]">

        {/* Row 1 */}
        <span className="font-semibold">Name of Candidate</span>
        <span className="flex items-center justify-center font-semibold tracking-tight translate-x-[-1px]">
          :
        </span>
        <span className="col-span-4 pl-[2px] font-semibold">
          {personalDetails.candidateName}
        </span>

        {/* Row 2 */}
        <span className="font-semibold">Enrolment No.</span>
        <span className="flex items-center justify-center translate-x-[-1px]">:</span>
        <span>{personalDetails.enrollmentNumber}</span>

        <span className="font-semibold">Roll No.</span>
        <span className="flex items-center justify-center translate-x-[-1px]">:</span>
        <span>{personalDetails.rollNumber}</span>

        {/* Row 3 */}
        <span className="font-semibold">Mother&apos;s Name</span>
        <span className="flex items-center justify-center translate-x-[-1px]">:</span>
        <span>{personalDetails.motherName}</span>

        <span className="font-semibold">Father&apos;s Name</span>
        <span className="flex items-center justify-center translate-x-[-1px]">:</span>
        <span>{personalDetails.fatherName}</span>

      </div>
    </section>
  );
}