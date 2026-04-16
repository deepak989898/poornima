"use client";

import { ReactNode } from "react";

type MarksheetLayoutProps = {
  children: ReactNode;
};

export function MarksheetLayout({ children }: MarksheetLayoutProps) {
  return (
    <div
      id="marksheet-print-root"
      className="marksheet-print-root marksheet-page relative h-[1123px] w-[794px] shrink-0 overflow-hidden border-[12px] border-[#1a237e] bg-white"
      style={{ fontFamily: "Times New Roman, serif", boxSizing: "border-box" }}
    >
      <div className="relative h-full w-full overflow-hidden bg-white">
        <main className="relative z-10 h-full">{children}</main>
      </div>
    </div>
  );
}
