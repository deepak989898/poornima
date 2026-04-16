type FooterProps = {
  sgpa: number;
  issueDate: string;
  backCount: number;
};

export function Footer({ sgpa, issueDate, backCount }: FooterProps) {
  const promotedBackText = backCount > 0 ? String(backCount) : "NIL";

  return (
    <>
      <section className="mt-auto border-t border-black px-4 py-2">
        <div className="flex items-baseline justify-between gap-6">
          <p className="text-[16px] font-bold">SGPA = {(sgpa * 28.5).toFixed(2)} / 28.50 = {sgpa.toFixed(2)}</p>
          <p className="text-[16px] font-bold tracking-[0.01em]">
            Promoted to next semester with{" "}
            <span className="mx-1 inline-block min-w-[28px] border-b border-black text-center">{promotedBackText}</span>{" "}
            back
          </p>
        </div>
        <p className="mt-[5px] text-[14px]">Jaipur, Date : {issueDate}</p>
      </section>
      <section className="mt-6 flex items-end justify-between px-4 pb-2 text-[14px]">
        <div className="flex items-center gap-2">
          <p>Checked by</p>
          <div className="h-[1px] w-[150px] bg-black" />
        </div>
        <p>Controller of Examinations</p>
      </section>
      <p className="px-4 pb-1 text-[9px] leading-tight text-[#222]">
        In case of any mistake being detected during the preparation of this Grade Card or afterwards
        the University is fully empowered to correct the same.
      </p>
    </>
  );
}
