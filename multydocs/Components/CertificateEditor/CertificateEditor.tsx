import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CertificateInterface,
  CsvResult,
  _type_TextField,
} from "@/types/types";

interface Props {
  certificate: CertificateInterface;
  csvData: CsvResult | null;
  fields: _type_TextField[];
  selectedId: string | null;
  imgRef: React.RefObject<HTMLImageElement | null>;
  onSelectField: (id: string | null) => void;
  onMoveField: (id: string, x: number, y: number) => void;
  show_prev_next_navigation: boolean;
}

// Draw text fields onto the canvas.
function drawFields(
  ctx: CanvasRenderingContext2D,
  fields: _type_TextField[],
  rowValues: Record<string, string>,
  w: number,
  h: number
) {
  for (const field of fields) {
    const text = rowValues[field.column] ?? "";
    const weight = field.bold ? "bold" : "normal";
    const style = field.italic ? "italic" : "normal";

    ctx.font = `${style} ${weight} ${field.fontSize}px "${field.fontFamily}"`;
    ctx.fillStyle = field.color;
    ctx.textBaseline = "top";

    const x = field.x * w;
    const y = field.y * h;

    ctx.fillText(text, x, y);

    if (field.underline) {
      const textWidth = ctx.measureText(text).width;

      ctx.beginPath();
      ctx.strokeStyle = field.color;
      ctx.lineWidth = Math.max(1, field.fontSize / 16);
      ctx.moveTo(x, y + field.fontSize);
      ctx.lineTo(x + textWidth, y + field.fontSize);
      ctx.stroke();
    }
  }
}

export default function CertificateEditor({
  certificate,
  csvData,
  fields,
  selectedId,
  imgRef,
  onSelectField,
  onMoveField,
  show_prev_next_navigation = false,
}: Props) {
  const previewRef = useRef<HTMLCanvasElement>(null);

  const draggingRef = useRef<{
    id: string;
    ox: number;
    oy: number;
  } | null>(null);

  const fieldsRef = useRef(fields);
  fieldsRef.current = fields;

  const [currentIndex, setCurrentIndex] = useState(0);

  const totalImages = csvData?.ok
    ? Math.max(
      0,
      ...csvData.headers.map(
        (header) => csvData.rows[header]?.length ?? 0
      )
    )
    : 1;

  // Draw the selected recipient's data.
  const redraw = useCallback(
    (
      currentFields: _type_TextField[],
      img: HTMLImageElement | null = imgRef.current
    ) => {
      const canvas = previewRef.current;

      if (!canvas || !img) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);

      const previewValues: Record<string, string> = {};

      if (csvData?.ok) {
        for (const header of csvData.headers) {
          previewValues[header] =
            csvData.rows[header]?.[currentIndex] ?? "";
        }
      } else {
        for (const field of currentFields) {
          previewValues[field.column] = field.column;
        }
      }

      drawFields(
        ctx,
        currentFields,
        previewValues,
        img.naturalWidth,
        img.naturalHeight
      );

      // Highlight the selected field.
      for (const field of currentFields) {
        if (field.id !== selectedId) continue;

        const weight = field.bold ? "bold" : "normal";
        const style = field.italic ? "italic" : "normal";

        ctx.font = `${style} ${weight} ${field.fontSize}px "${field.fontFamily}"`;

        const text = previewValues[field.column] ?? field.column;
        const textWidth = ctx.measureText(text).width;
        const textHeight = field.fontSize * 1.2;

        const px = field.x * img.naturalWidth;
        const py = field.y * img.naturalHeight;

        ctx.strokeStyle = "#2563eb";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          px - 2,
          py - 2,
          textWidth + 4,
          textHeight + 4
        );
      }
    },
    [csvData, currentIndex, selectedId, imgRef]
  );

  // Load the certificate background.
  useEffect(() => {
    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      if (cancelled) return;

      imgRef.current = img;
      redraw(fieldsRef.current, img);
    };

    img.onerror = () => {
      console.error("Failed to load certificate image:", certificate.url);
    };

    img.src = certificate.url;

    return () => {
      cancelled = true;
    };
  }, [certificate.url, imgRef, redraw]);

  // Redraw whenever fields, selection, or recipient data changes.
  useEffect(() => {
    redraw(fields);
  }, [fields, selectedId, redraw]);

  // Reset to the first recipient when the dataset changes.
  useEffect(() => {
    setCurrentIndex(0);
  }, [csvData]);

  function goToPrevious() {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }

  function goToNext() {
    setCurrentIndex((prev) =>
      Math.min(Math.max(0, totalImages - 1), prev + 1)
    );
  }

  // Convert mouse coordinates to normalized canvas coordinates.
  function toNorm(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = previewRef.current!;

    const rect = canvas.getBoundingClientRect();

    return {
      nx: (e.clientX - rect.left) / rect.width,
      ny: (e.clientY - rect.top) / rect.height,
    };
  }

  function onMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    setIsGrabbing(true);
    const { nx, ny } = toNorm(e);
    const img = imgRef.current;
    const canvas = previewRef.current;

    if (!img || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check fields from top to bottom visually.
    for (let i = fields.length - 1; i >= 0; i--) {
      const field = fields[i];

      const weight = field.bold ? "bold" : "normal";
      const style = field.italic ? "italic" : "normal";

      ctx.font = `${style} ${weight} ${field.fontSize}px "${field.fontFamily}"`;

      const previewVal = csvData?.ok
        ? csvData.rows[field.column]?.[currentIndex] ?? ""
        : field.column;

      const textWidth =
        ctx.measureText(previewVal).width / img.naturalWidth;

      const textHeight =
        (field.fontSize * 1.2) / img.naturalHeight;

      if (
        nx >= field.x &&
        nx <= field.x + textWidth &&
        ny >= field.y &&
        ny <= field.y + textHeight
      ) {
        onSelectField(field.id);

        draggingRef.current = {
          id: field.id,
          ox: nx - field.x,
          oy: ny - field.y,
        };

        return;
      }
    }

    onSelectField(null);
  }

  function onMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const drag = draggingRef.current;

    if (!drag) return;

    const { nx, ny } = toNorm(e);

    onMoveField(
      drag.id,
      Math.max(0, Math.min(0.98, nx - drag.ox)),
      Math.max(0, Math.min(0.98, ny - drag.oy))
    );
  }

  function onMouseUp() {
    draggingRef.current = null;
    setIsGrabbing(false);
  }

  const [zoom, setZoom] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [indexInput, setIndexInput] = useState("");

  function zoomIn() { setZoom((z) => Math.min(3, parseFloat((z + 0.25).toFixed(2)))); }
  function zoomOut() { setZoom((z) => Math.max(0.25, parseFloat((z - 0.25).toFixed(2)))); }
  function zoomReset() { setZoom(1); }

  // ── Keyboard shortcuts ──────────────────────────────────────────────────
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      // Don't fire when typing in an input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Ctrl+R → reset zoom (prevent browser reload)
      if (e.ctrlKey && e.key === "r") {
        e.preventDefault();
        zoomReset();
        return;
      }

      // Shift+ArrowUp → zoom in, Shift+ArrowDown → zoom out
      if (e.shiftKey && e.key === "ArrowUp") { e.preventDefault(); zoomIn(); return; }
      if (e.shiftKey && e.key === "ArrowDown") { e.preventDefault(); zoomOut(); return; }

      // ArrowUp / ArrowDown → previous / next image (no shift)
      if (!e.shiftKey && e.key === "ArrowLeft") { e.preventDefault(); goToPrevious(); return; }
      if (!e.shiftKey && e.key === "ArrowRight") { e.preventDefault(); goToNext(); return; }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, totalImages, zoom]);

  return (
    <div
      className="relative flex flex-1 items-center justify-center overflow-auto bg-gray-100 p-6"
      onClick={() => setMenuOpen(false)}
    >

      {/* ── Compact toolbar — top-left ── */}

      <div
        className="absolute left-3 top-3 z-20 flex  gap-px rounded-xl border border-black/10 bg-white shadow-md overflow-visible text-xs font-medium text-(--text-gray)"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Re-select */}
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-4 py-2.5 cursor-pointer text-left hover:bg-gray-50 hover:text-(--brand-orange) transition-colors duration-150 rounded-t-xl"
        >
          Re-select
        </button>

        <div className="h-px bg-black/8" />
        <button
          type="button"
          aria-label="More options"
          onClick={() => setMenuOpen((o) => !o)}
          className="px-3 py-2.5 cursor-pointer  hover:bg-gray-50 hover:text-black transition-colors duration-150 rounded-br-xl border-l border-black/8 leading-none"
        >
          ⋮
        </button>

        {/* ── Popover menu ── */}
        {menuOpen && (
          <div className="absolute left-full top-0 ml-2 w-56 rounded-xl border border-black/10 bg-white shadow-xl overflow-hidden text-xs font-medium text-(--text-gray)">

            {show_prev_next_navigation && (
              <>
                <div className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                  Navigate
                </div>

                <button
                  type="button"
                  onClick={() => { goToPrevious(); setMenuOpen(false); }}
                  disabled={currentIndex === 0 || totalImages === 0}
                  className="flex w-full items-center justify-between px-4 py-2.5 hover:bg-gray-50 hover:text-black
                             transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span>Prev Img</span>
                  <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] text-gray-500"> Right KEY</kbd>
                </button>

                <button
                  type="button"
                  onClick={() => { goToNext(); setMenuOpen(false); }}
                  disabled={totalImages === 0 || currentIndex >= totalImages - 1}
                  className="flex w-full items-center justify-between px-4 py-2.5 hover:bg-gray-50 hover:text-black
                             transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span>Next Img</span>
                  <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] text-gray-500">Left KEY</kbd>
                </button>

                <div className="h-px bg-black/8 mx-4" />
              </>
            )}

            <div className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
              Zoom
            </div>

            <button
              type="button"
              onClick={() => { zoomIn(); setMenuOpen(false); }}
              disabled={zoom >= 3}
              className="flex w-full items-center justify-between px-4 py-2.5 hover:bg-gray-50 hover:text-black
                         transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span>Zoom In</span>
              <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] text-gray-500">shift + ↑</kbd>
            </button>

            <button
              type="button"
              onClick={() => { zoomOut(); setMenuOpen(false); }}
              disabled={zoom <= 0.25}
              className="flex w-full items-center justify-between px-4 py-2.5 hover:bg-gray-50 hover:text-black
                         transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span>Zoom Out</span>
              <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] text-gray-500">shift + ↓</kbd>
            </button>

            <button
              type="button"
              onClick={() => { zoomReset(); setMenuOpen(false); }}
              className="flex w-full items-center justify-between px-4 py-2.5 hover:bg-gray-50 hover:text-(--brand-orange)
                         transition-colors"
            >
              <span>Reset Zoom</span>
              <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] text-gray-500">Ctrl + R</kbd>
            </button>

            {/* ── Index navigator ── */}
            <div className={`border-t border-black/8 px-4 py-3 transition-opacity duration-200 ${fields.length === 0 ? "opacity-20 pointer-events-none" : "opacity-70"}`}>
              <p className="mb-1.5 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Jump to</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={totalImages}
                  value={indexInput}
                  placeholder={String(currentIndex + 1)}
                  onChange={(e) => setIndexInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = parseInt(indexInput, 10);
                      if (!isNaN(val)) {
                        setCurrentIndex(Math.min(totalImages - 1, Math.max(0, val - 1)));
                      }
                      setIndexInput("");
                      setMenuOpen(false);
                    }
                  }}
                  onBlur={() => {
                    const val = parseInt(indexInput, 10);
                    if (!isNaN(val)) {
                      setCurrentIndex(Math.min(totalImages - 1, Math.max(0, val - 1)));
                    }
                    setIndexInput("");
                  }}
                  className="w-16 rounded-lg border border-black/10 bg-gray-50 px-2 py-1.5 text-center text-xs tabular-nums
                             focus:outline-none focus:ring-1 focus:ring-(--brand-orange)"
                />
                <span className="text-gray-400 tabular-nums">/ {totalImages}</span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Certificate preview */}
      <canvas
        ref={previewRef}
        style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
        className={`max-h-full max-w-full shadow-xl transition-transform duration-150 ${isGrabbing ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      />
    </div>
  );
}
