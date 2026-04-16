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
        className="marksheet-top-banner grid h-[132px] grid-cols-[88px_minmax(0,1fr)_108px] items-center gap-x-1 px-3 py-2 text-white"
        style={{ background: "#1a237e" }}
      >
        <div className="flex justify-center pl-0.5">
          <div
            className="h-[78px] w-[78px] shrink-0 rounded-full bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('${logoSrc}')`, backgroundColor: "#ffffff" }}
          />
        </div>

        <div className="-translate-x-[50px] flex min-h-0 min-w-0 flex-col items-center justify-center text-center leading-none">
          {/* Border-bottom on P+OORNIMA row = full underline; OORNIMA sits on line (items-end + leading-none). Width drives UNIVERSITY. */}
          <div className="inline-flex max-w-full flex-col items-stretch px-1">
            <div className="flex items-end justify-center gap-0 whitespace-nowrap border-b-[1.5px] border-white pb-0 leading-none">
              <span className="font-serif font-bold text-[68px] leading-[0.66]">P</span>
              <span className="font-serif pl-[1px] font-bold text-[51px] leading-none tracking-[0.05em]">OORNIMA</span>
            </div>
            <p className="w-full pt-[6px] text-center font-serif text-[26px] font-bold leading-none tracking-[0.60em]">
              UNIVERSITY
            </p>
          </div>
          <p className="mx-auto mt-[6px] max-w-[32rem] px-1 text-center text-[8.5px] leading-snug text-[#ececec]">
            (Estd. by Rajasthan State Legislature vide Act No. 16/2012, Notification F1(2)6) Vidh/2/2012,
            dated 16/05/2012)
          </p>
        </div>

        <div className="flex justify-center pr-0.5">
          <div className="rounded-sm border border-black bg-white px-[10px] py-[5px] text-[15px] font-semibold leading-tight shadow-sm">
            <span className="font-serif text-[#c41e3a]">№</span>
            <span className="ml-0.5 font-mono text-black">{statement}</span>
          </div>
        </div>
      </header>

      <section className="px-4 pt-[14px] text-center text-black">
        <p className="text-[22px] font-bold">Statement of Grades</p>
        <p className="mt-[3px] text-[14px]">School of Engineering & Technology</p>
        <p className="mt-[3px] text-[20px] font-bold">Bachelor of Technology</p>
        <p className="mt-[6px] text-[14px]">
          {personalDetails.branch}, {personalDetails.semester} Examination, {personalDetails.examDate}
        </p>
      </section>
    </>
  );
}
