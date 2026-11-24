export interface CertificateInterface {
  name: string;
  size: number;
  type: string;
  url: string;
}

export type CsvResult =
  | { ok: true; headers: string[]; rows: Record<string, string[]>; filename: string }
  | { ok: false; error: Error };

export type _type_CsvResult =
  | { ok: true; headers: string[]; rows: Record<string, string[]>; filename: string }
  | { ok: false; error: Error };

export type Notice = {
  type: "success" | "error";
  message: string;
};

export interface _type_TextField {
  id: string;
  column: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

export interface SidebarProps {
  certificate: CertificateInterface | null;
  fields: _type_TextField[];
  setFields: React.Dispatch<React.SetStateAction<_type_TextField[]>>;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  onCsvDataChange: (data: CsvResult | null) => void;
  imgRef: React.RefObject<HTMLImageElement | null>;
}
