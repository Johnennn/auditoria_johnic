export default function Resumen() {
  return (
    <div>
      <div className="section-header">
        <span className="section-eyebrow">01 — RESUMEN</span>
        <h2 className="section-title">Resumen Ejecutivo</h2>
        <p className="section-desc">Auditoría de seguridad web sobre el portal de clientes de Notaría Central Digital Servicios Legales.</p>
      </div>

      <div className="card">
        <p className="card-title">Empresa Auditada</p>
        <table className="audit-table">
          <tbody>
            <tr><td style={{color:"var(--text-dim)",width:"160px"}}>Nombre</td><td>Notaría Central Digital Servicios Legales</td></tr>
            <tr><td style={{color:"var(--text-dim)"}}>Rubro</td><td>Servicios legales y notariales digitales</td></tr>
            <tr><td style={{color:"var(--text-dim)"}}>Descripción</td><td>Empresa que ofrece servicios notariales en línea: firma electrónica de documentos, autenticación de contratos, poderes notariales y certificaciones digitales sin asistencia presencial.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <p className="card-title">Portal de Clientes</p>
        <table className="audit-table">
          <tbody>
            <tr><td style={{color:"var(--text-dim)",width:"160px"}}>Nombre</td><td>Portal de Clientes — Notaría Central Digital</td></tr>
            <tr><td style={{color:"var(--text-dim)"}}>Descripción</td><td>Plataforma web que permite a los usuarios autenticarse para gestionar documentos legales, consultar el estado de trámites, firmar electrónicamente contratos y acceder al historial de operaciones notariales. Maneja información altamente sensible: RUT, datos de identidad, documentos legales y datos financieros.</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <p className="card-title">Objetivo de la Auditoría</p>
        <p style={{fontSize:"13px",lineHeight:"1.7"}}>
          Identificar y documentar vulnerabilidades de seguridad presentes en el portal web mediante pruebas de penetración controladas sobre un entorno simulado (DVWA), con el propósito de evaluar el nivel de exposición al riesgo y proponer controles de mitigación adecuados.
        </p>
      </div>

      <div className="card">
        <p className="card-title">Alcance</p>
        <p style={{fontSize:"13px",marginBottom:"16px"}}>Pruebas realizadas sobre DVWA en nivel de seguridad <strong style={{color:"var(--red)"}}>Low</strong>.</p>
        <table className="audit-table">
          <thead>
            <tr><th>N°</th><th>Tipo de Ataque</th><th>Módulo DVWA</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Inyección SQL</td><td>SQL Injection</td></tr>
            <tr><td>2</td><td>Cross-Site Scripting</td><td>XSS (Reflected)</td></tr>
            <tr><td>3</td><td>Inyección de Comandos</td><td>Command Injection</td></tr>
          </tbody>
        </table>
        <p style={{marginTop:"14px",fontSize:"12px",color:"var(--text-dim)"}}>Fuera del alcance: infraestructura de red, servidores de producción reales y sistemas de terceros.</p>
      </div>
    </div>
  );
}