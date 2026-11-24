import { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CertificateEditor from "./components/CertificateEditor";
import type {
  CertificateInterface,
  CsvResult,
  _type_TextField,
} from "./types";

function getImageFromUrl(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("image") ?? null;
}

export default function App() {
  const [certificate, setCertificate] = useState<CertificateInterface | null>(() => {
    const imageUrl = getImageFromUrl();
    return imageUrl
      ? { name: "uploaded-template", size: 0, type: "image/png", url: imageUrl }
      : null;
  });
  const [csvData, setCsvData] = useState<CsvResult | null>(null);
  const [fields, setFields] = useState<_type_TextField[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  function handleMoveField(id: string, x: number, y: number) {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, x, y } : f)));
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
