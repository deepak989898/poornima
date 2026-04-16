import { PersonalDetails } from "@/types/marksheet";

type StudentDetailsProps = {
  personalDetails: PersonalDetails;
};

/**
 * Grid: fixed label columns + narrow colon column so ":" aligns vertically
 * (matches official marksheet). Row 1 spans value across the full width after colon.
 */
export function StudentDetails({ personalDetails }: StudentDetailsProps) {
  return (
    <section className="mt-4 px-3 py-2 text-[14px]">
      <div className="grid grid-cols-[11.5rem_1rem_1fr_11.5rem_1rem_1fr] gap-x-1 gap-y-[7px]">
        <span className="font-bold">Name of Candidate</span>
        <span className="text-center font-bold">:</span>
        <span className="col-span-4 font-bold leading-tight">{personalDetails.candidateName}</span>

        <span className="font-bold">Enrolment No.</span>
        <span className="text-center">:</span>
        <span className="min-w-0">{personalDetails.enrollmentNumber}</span>
        <span className="font-bold">Roll No.</span>
        <span className="text-center">:</span>
        <span className="min-w-0">{personalDetails.rollNumber}</span>

        <span className="font-bold">Mother&apos;s Name</span>
        <span className="text-center">:</span>
        <span className="min-w-0">{personalDetails.motherName}</span>
        <span className="font-bold">Father&apos;s Name</span>
        <span className="text-center">:</span>
        <span className="min-w-0">{personalDetails.fatherName}</span>
      </div>
    </section>
  );
}
