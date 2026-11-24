import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Editor from "./pages/Editor";

const SITE_URL = import.meta.env.VITE_SITE_URL;
function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ExternalRedirect to={SITE_URL} />} />
      <Route path="/:id" element={<Editor />} />
    </Routes>
  );
}
