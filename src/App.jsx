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
          <span>Johnen · 2026</span>
        </div>
      </aside>
      <main className="content">
        {current.component}
      </main>
    </div>
  );
}