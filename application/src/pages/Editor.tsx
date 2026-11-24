
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CertificateEditor from "../components/CertificateEditor";
import type { CertificateInterface, CsvResult, _type_TextField, } from "../types";

// function publicUrl(): string {
//   const url = import.meta.env.VITE_R2_PUBLIC_URL;
//   if (!url) {
//     console.warn("VITE_R2_PUBLIC_URL is not set");
//     return "";
//   }
//   return url.replace(/\/$/, "");
// }


export default function Editor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState<CertificateInterface | null>(null);
  const [csvData, setCsvData] = useState<CsvResult | null>(null);
  const [fields, setFields] = useState<_type_TextField[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const imageUrl = `${import.meta.env.VITE_R2_PUBLIC_URL}${id}`;
    let cancelled = false;

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      setCertificate({
        name: "uploaded-template",
        size: 0,
        type: "image/png",
        url: imageUrl,
      });
      imgRef.current = img;
    };
    img.onerror = () => {
      if (cancelled) return;
      setError("Failed to load template. The image id may be invalid.");
    };
    img.src = imageUrl;

    return () => {
      cancelled = true;
    };
  }, [id]);

  const isLoading = !certificate && !error && Boolean(id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <p className="text-(--text-gray)">Loading your template...</p>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3 text-center p-6">
        <p className="text-(--text-red)">{error || "No template found."}</p>
        <button
          onClick={() => navigate("/")}
          className="rounded-xl bg-(--brand-orange) px-8 py-3 font-bold text-white hover:opacity-90 transition-opacity"
        >
          Go to homepage
        </button>
      </div>
    );
  }

  function handleMoveField(fieldId: string, x: number, y: number) {
    setFields((prev) => prev.map((f) => (f.id === fieldId ? { ...f, x, y } : f)));
  }

  return (
    <>
      <Navbar />
      <main className="flex h-(--body-height)">
        <Sidebar
          certificate={certificate}
          fields={fields}
          setFields={setFields}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          onCsvDataChange={setCsvData}
          imgRef={imgRef}
        />
        <CertificateEditor
          show_prev_next_navigation={csvData ? true : false}
          certificate={certificate}
          csvData={csvData}
          fields={fields}
          selectedId={selectedId}
          imgRef={imgRef}
          onSelectField={setSelectedId}
          onMoveField={handleMoveField}
        />
      </main>
    </>
  );
}
