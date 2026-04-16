"use client";

import { useState } from "react";

import { captureMarksheetToCanvas } from "@/lib/marksheet-capture";

type PdfGeneratorButtonProps = {
  rootId?: string;
  filename: string;
};

async function preloadImage(src: string) {
  await new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

export function PdfGeneratorButton({
  rootId = "marksheet-print-root",
  filename,
}: PdfGeneratorButtonProps) {
  const [loading, setLoading] = useState(false);

  const onDownload = async () => {
    const element = document.getElementById(rootId);
    if (!element) return;

    setLoading(true);

    await Promise.all([preloadImage("/poornima-university-logo.png")]);

    const originalStyle = {
      boxShadow: element.style.boxShadow,
      transform: element.style.transform,
      background: element.style.background,
    };

    element.style.boxShadow = "none";
    element.style.transform = "none";
    element.style.background = "#ffffff";

    try {
      const canvas = await captureMarksheetToCanvas(element, { scale: 3 });
      const imageData = canvas.toDataURL("image/png");
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

      const pageW = 210;
      const pageH = 297;
      const canvasRatio = canvas.width / canvas.height;
      let imgW = pageW;
      let imgH = pageW / canvasRatio;
      let offsetX = 0;
      const offsetY = 0;
      if (imgH > pageH) {
        imgH = pageH;
        imgW = pageH * canvasRatio;
        offsetX = (pageW - imgW) / 2;
      }
      pdf.addImage(imageData, "PNG", offsetX, offsetY, imgW, imgH, undefined, "SLOW");

      pdf.save(filename);
    } finally {
      element.style.boxShadow = originalStyle.boxShadow;
      element.style.transform = originalStyle.transform;
      element.style.background = originalStyle.background;
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onDownload}
      disabled={loading}
      className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-300"
    >
      {loading ? "Generating PDF..." : "Download PDF"}
    </button>
  );
}

type MarksheetHdPngButtonProps = {
  rootId?: string;
  filename: string;
  /** Device-friendly scale; 4 ≈ sharp HD for ~794px wide marksheet */
  scale?: number;
};

export function MarksheetHdPngButton({
  rootId = "marksheet-print-root",
  filename,
  scale = 4,
}: MarksheetHdPngButtonProps) {
  const [loading, setLoading] = useState(false);

  const onDownload = async () => {
    const element = document.getElementById(rootId);
    if (!element) return;

    setLoading(true);
    await Promise.all([preloadImage("/poornima-university-logo.png")]);

    const originalStyle = {
      boxShadow: element.style.boxShadow,
      transform: element.style.transform,
      background: element.style.background,
    };

    element.style.boxShadow = "none";
    element.style.transform = "none";
    element.style.background = "#ffffff";

    try {
      const canvas = await captureMarksheetToCanvas(element, { scale });
      const name = filename.endsWith(".png") ? filename : `${filename}.png`;
      try {
        await new Promise<void>((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("PNG export failed"));
                return;
              }
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = name;
              link.click();
              URL.revokeObjectURL(url);
              resolve();
            },
            "image/png",
            1,
          );
        });
      } catch {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = name;
        link.click();
      }
    } finally {
      element.style.boxShadow = originalStyle.boxShadow;
      element.style.transform = originalStyle.transform;
      element.style.background = originalStyle.background;
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onDownload}
      disabled={loading}
      className="rounded-md border border-indigo-700 bg-white px-4 py-2 text-sm font-semibold text-indigo-800 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Generating image..." : "Download HD PNG"}
    </button>
  );
}
