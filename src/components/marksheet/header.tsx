import { PersonalDetails } from "@/types/marksheet";

type HeaderProps = {
  personalDetails: PersonalDetails;
  logoSrc: string;
};

export function Header({ personalDetails, logoSrc }: HeaderProps) {
  const statement = String(personalDetails.statementNumber ?? "").replace(/^\s*No\.?\s*/i, "").trim();

  return (
    <>
      <header
        className="marksheet-top-banner relative grid h-[144px] grid-cols-[88px_minmax(0,1fr)_108px] items-center gap-x-1 px-3 pt-4 pb-2 text-white"
        style={{ background: "#2d3ca8" }}
      >
        <div className="z-10 flex justify-center pl-[52px]">
          <div
            className="mb-[14px] h-[120px] w-[120px] shrink-0 rounded-full bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('${logoSrc}')`, backgroundColor: "#ffffff" }}
          />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-[50.5%] flex min-h-0 min-w-0 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center leading-none">
          <div className="inline-flex max-w-full flex-col items-stretch px-[54px]">
            <div className="flex items-end justify-center whitespace-nowrap border-b border-white pt-[1px] pb-[1px] leading-none">
              <span className="marksheet-brand-title text-[102px] leading-[0.7] tracking-[4px]">P</span>
              <span className="marksheet-brand-title -ml-[1px] text-[64px] leading-[0.82] tracking-[4px]">OORNIMA</span>
            </div>
            <p className="marksheet-brand-subtitle relative left-[14px] w-full pt-[6px] text-center text-[30px] leading-none tracking-[24px]">
              UNIVERSITY
            </p>
          </div>
          <p className="mx-auto mt-[9px] min-w-[690px] whitespace-nowrap px-1 text-center font-serif text-[8.3px] leading-none tracking-[0.02em] text-[#ececec]">
            (Estd. by Rajasthan State Legislature vide Act No. 16/2012, Notification F1(2)6) Vidh/2/2012, dated 16/05/2012)
          </p>
        </div>

        <div className="absolute right-[10px] top-[8px] z-10">
          <div className="rounded-sm border border-black bg-[#d8ecff] px-[10px] py-[5px] text-[15px] font-semibold leading-tight shadow-sm">
            <span className="font-serif text-[#c41e3a]">№</span>
            <span className="ml-0.5 font-mono text-black">{statement}</span>
          </div>
        </div>
      </header>

      <section className="px-4 pt-[14px] text-center text-black">
        <p className="text-[22px] font-bold">Statement of Grades</p>
        <p className="mt-[3px] text-[14px] font-bold">School of Engineering & Technology</p>
        <p className="mt-[3px] text-[20px] font-bold">Bachelor of Technology</p>
        <p className="mt-[6px] text-[14px] font-bold">
          {personalDetails.branch}, {personalDetails.semester} Examination, {personalDetails.examDate}
        </p>
      </section>
    </>
  );
}
