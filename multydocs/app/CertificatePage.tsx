"use client";
import HomePage from "@/Components/HomePage/HomePage";
import { useCallback, useState } from "react";
import { CertificateInterface } from "@/types/types";

const VITE_APP_URL = "https://app.multydocs.in";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function GenerateCertificate() {
  const [certificate, setCertificate] = useState<CertificateInterface | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleCertificateChange = useCallback(async (file: File) => {
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      return;
    }

    setUploading(true);

    try {
      const dataUrl = await fileToDataUrl(file);

      const cert: CertificateInterface = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: dataUrl,
      };

      const url = `${VITE_APP_URL}?image=${encodeURIComponent(dataUrl)}`;
      window.location.href = url;
    } catch (error) {
      console.error("Failed to process image:", error);
    } finally {
      setUploading(false);
    }
  }, []);

  return <HomePage onCertificateChange={handleCertificateChange} />;
}
