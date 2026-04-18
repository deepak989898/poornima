type FooterProps = {
  sgpa: number;
  totalCredits: number;
  weightedPoints: number;
  issueDate: string;
  backCount: number;
};

export function Footer({ sgpa, totalCredits, weightedPoints, issueDate, backCount }: FooterProps) {
  const promotedBackText = backCount > 0 ? String(backCount) : "NIL";

  return (
    <div className="flex h-full flex-col">
      <section className="px-4 py-2">
        <div className="flex items-baseline justify-between gap-6">
          <p className="text-[16px] font-bold">
            SGPA = {weightedPoints.toFixed(2)} / {totalCredits.toFixed(2)} = {sgpa.toFixed(2)}
          </p>
          <p className="text-[16px] font-bold tracking-[0.01em]">
            Promoted to next semester with{" "}
            <span className="mx-[2px] inline-block border-b border-black px-[2px] leading-none">{promotedBackText}</span>{" "}
            back
          </p>
        </div>
        <p className="mt-[5px] text-[14px]">Jaipur, Date : {issueDate}</p>
      </section>
      <div className="mt-auto">
        <section className="mt-6 mb-4 flex items-end justify-between px-4 pb-2 text-[14px]">
          <div className="flex items-center gap-2">
            <p>Checked by</p>
            <div className="mt-[10px] h-[1px] w-[150px] bg-black" />
          </div>
          <p>Controller of Examinations</p>
        </section>
        <p className="px-4 pb-1 text-[9px] leading-tight text-[#222]">
          In case of any mistake being detected during the preparation of this Grade Card or afterwards
          the University is fully empowered to correct the same.
        </p>
      </div>
    </div>
  );
}
