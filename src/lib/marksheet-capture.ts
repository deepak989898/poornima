import { toCanvas } from "html-to-image";

type ParentSnapshot = {
  el: HTMLElement;
  overflow: string;
  overflowX: string;
  overflowY: string;
  transform: string;
  contain: string;
};

/**
 * Captures the marksheet as a canvas. Uses `html-to-image` first (better tables).
 * Temporarily clears ancestor overflow/transform so layout wrappers do not affect
 * the snapshot. Forces zero horizontal margins on the cloned node so SVG
 * foreignObject does not clip or offset content (mx-auto breaks export).
 */
export async function captureMarksheetToCanvas(
  source: HTMLElement,
  options: { scale?: number } = {},
): Promise<HTMLCanvasElement> {
  const scale = options.scale ?? 3;
  await document.fonts.ready;

  const parents: ParentSnapshot[] = [];
  let p: HTMLElement | null = source.parentElement;
  while (p && p !== document.documentElement && parents.length < 12) {
    parents.push({
      el: p,
      overflow: p.style.overflow,
      overflowX: p.style.overflowX,
      overflowY: p.style.overflowY,
      transform: p.style.transform,
      contain: p.style.contain,
    });
    p.style.overflow = "visible";
    p.style.overflowX = "visible";
    p.style.overflowY = "visible";
    p.style.transform = "none";
    p.style.contain = "none";
    p = p.parentElement;
  }

  void source.offsetHeight;
  await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

  const restoreParents = () => {
    for (const row of parents) {
      row.el.style.overflow = row.overflow;
      row.el.style.overflowX = row.overflowX;
      row.el.style.overflowY = row.overflowY;
      row.el.style.transform = row.transform;
      row.el.style.contain = row.contain;
    }
  };

  const marginSnap = {
    margin: source.style.margin,
    marginLeft: source.style.marginLeft,
    marginRight: source.style.marginRight,
  };

  try {
    return await toCanvas(source, {
      pixelRatio: scale,
      backgroundColor: "#ffffff",
      cacheBust: true,
      style: {
        margin: "0",
        marginLeft: "0",
        marginRight: "0",
        marginTop: "0",
        marginBottom: "0",
      },
    });
  } catch {
    source.style.margin = "0";
    source.style.marginLeft = "0";
    source.style.marginRight = "0";
    try {
      const { default: html2canvas } = await import("html2canvas");
      return await html2canvas(source, {
        scale,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
    } finally {
      source.style.margin = marginSnap.margin;
      source.style.marginLeft = marginSnap.marginLeft;
      source.style.marginRight = marginSnap.marginRight;
    }
  } finally {
    restoreParents();
  }
}
