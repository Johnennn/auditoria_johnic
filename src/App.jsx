import { useState } from "react";
import Resumen from "./components/Resumen";
import SQLi from "./components/SQLi";
import XSS from "./components/XSS";
import Comandos from "./components/Comandos";
import Activos from "./components/Activos";
import Matriz from "./components/Matriz";
import Controles from "./components/Controles";
import Recuperacion from "./components/Recuperacion";
import Prompts from "./components/Prompts";
import "./App.css";

const NAV_ITEMS = [
  { id: "resumen",      label: "01 Resumen",         component: <Resumen /> },
  { id: "sqli",         label: "02 SQL Injection",    component: <SQLi /> },
  { id: "xss",          label: "03 XSS Reflected",    component: <XSS /> },
  { id: "comandos",     label: "04 Cmd Injection",    component: <Comandos /> },
  { id: "activos",      label: "05 Activos",          component: <Activos /> },
  { id: "matriz",       label: "06 Matriz de Riesgo", component: <Matriz /> },
  { id: "controles",    label: "07 Controles",        component: <Controles /> },
  { id: "recuperacion", label: "08 Recuperación",     component: <Recuperacion /> },
  { id: "prompts",      label: "09 Prompts IA",       component: <Prompts /> },
];

export default function App() {
  const [active, setActive] = useState("resumen");
  const [light, setLight] = useState(false);
  const current = NAV_ITEMS.find((i) => i.id === active);

  return (
    <div className={`app-shell${light ? " light" : ""}`}>
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-tag">AUDITORIA</span>
          <h1 className="brand-title">Notaría Central Digital</h1>
          <p className="brand-sub">Seguridad Web — DVWA Low</p>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${active === item.id ? "nav-item--active" : ""}`}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="theme-toggle" onClick={() => setLight(!light)}>
            <span className="theme-toggle-icon">{light ? "🌙" : "☀️"}</span>
            <span className="theme-toggle-label">{light ? "MODO OSCURO" : "MODO CLARO"}</span>
          </button>
          <a
            href="https://github.com/Johnennn"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>Johnennn</span>
          </a>
          <span>Johnen · 2026</span>
        </div>
      </aside>
      <main className="content">
        {current.component}
      </main>
    </div>
  );
}