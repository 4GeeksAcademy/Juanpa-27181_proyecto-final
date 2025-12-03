import React from "react";

export default function Footer() {
  return (
    <footer
      className="text-center py-3 mt-4"
      style={{
        background: "#F8F9FA",
        borderTop: "1px solid #E2E8F0",
        color: "#4A5568",
        fontSize: "14px",
      }}
    >
      TeleDomoFarm © {new Date().getFullYear()} – Todos los derechos reservados.
    </footer>
  );
}
