const prompts = [
  { num:"01", archivo:"01_resumen_johnic.md", prompt:"Dame el contenido para el archivo 01_resumen_johnic.md describiendo la empresa auditada, el portal de clientes, el objetivo de la auditoría y su alcance. La empresa es Notaría Central Digital Servicios Legales.", uso:"Se utilizó como base para redactar la descripción de la empresa, el portal de clientes, el objetivo y el alcance de la auditoría." },
  { num:"02", archivo:"02_sqli_johnic.md", prompt:"Dame el contenido para 02_sqli_johnic.md con inyección SQL: evidencia, por qué ocurre, CVSS v3.1 y defensa. El payload usado fue ' OR '1'='1 en DVWA nivel Low.", uso:"Se utilizó para redactar la explicación técnica de la vulnerabilidad, calcular el vector CVSS y definir los controles de defensa asociados." },
  { num:"03", archivo:"03_xss_johnic.md", prompt:"Dame el contenido para 03_xss_johnic.md con XSS Reflected: evidencia, por qué ocurre, CVSS v3.1 y defensa. El payload usado fue script alert johnen en DVWA nivel Low.", uso:"Se utilizó para documentar la vulnerabilidad de XSS Reflected, su vector CVSS y las medidas de mitigación recomendadas." },
  { num:"04", archivo:"04_comandos_johnic.md", prompt:"Dame el contenido para 04_comandos_johnic.md con inyección de comandos: evidencia, por qué ocurre, CVSS v3.1 y defensa. El payload usado fue 127.0.0.1; cat /etc/passwd en DVWA nivel Low.", uso:"Se utilizó para documentar la vulnerabilidad de inyección de comandos, incluyendo el riesgo de exposición del archivo /etc/passwd y los controles recomendados." },
  { num:"05", archivo:"05_activos_johnic.md", prompt:"Dame el contenido para 05_activos_johnic.md con los activos de información y riesgos según la industria de servicios legales digitales. Debe incluir identificación de activos, valoración y tabla de riesgos.", uso:"Se utilizó para identificar y clasificar los activos de información de la empresa, valorarlos según confidencialidad, integridad y disponibilidad, y asociarlos a los riesgos detectados." },
  { num:"06", archivo:"06_matriz_johnic.md", prompt:"Dame el contenido para 06_matriz_johnic.md con la matriz de riesgo (probabilidad × impacto) y mapa de calor, basado en los riesgos identificados en el archivo de activos.", uso:"Se utilizó para construir la tabla de riesgos con su nivel calculado, el mapa de calor y la priorización final de riesgos." },
  { num:"07", archivo:"07_controles_johnic.md", prompt:"Dame el contenido para 07_controles_johnic.md con políticas de prevención y controles de mitigación para SQL Injection, XSS Reflected y Command Injection, más controles generales transversales alineados con ISO 27001.", uso:"Se utilizó para definir los controles preventivos, detectivos y correctivos por vulnerabilidad, incluyendo su prioridad y justificación." },
  { num:"08", archivo:"08_recuperacion_johnic.md", prompt:"Dame el contenido para 08_recuperacion_johnic.md con mejora tecnológica y plan de recuperación ante desastres (DR). Debe incluir RTO, RPO, fases del plan, estrategia de backup y propuestas de mejora tecnológica.", uso:"Se utilizó para estructurar el plan de recuperación ante desastres con sus fases, responsables, tiempos estimados y propuestas de mejora tecnológica." },
  { num:"09", archivo:"09_prompts_johnic.md", prompt:"Dame el contenido para 09_prompts_johnic.md como bitácora de uso de IA, registrando todos los prompts utilizados durante la auditoría.", uso:"Se utilizó para generar el propio documento de bitácora de uso de IA." },
];

export default function Prompts() {
  return (
    <div>
      <div className="section-header">
        <span className="section-eyebrow">09 — BITÁCORA</span>
        <h2 className="section-title">Bitácora de Uso de IA</h2>
        <p className="section-desc">Registro de prompts utilizados durante la auditoría. Herramienta: Claude Sonnet 4.6 (Anthropic) · Junio 2026.</p>
      </div>

      <div className="card" style={{marginBottom:"24px"}}>
        <p className="card-title">Reflexión sobre el Uso de IA</p>
        <p style={{fontSize:"13px",lineHeight:"1.8"}}>
          El uso de inteligencia artificial fue de gran utilidad como punto de partida para estructurar y redactar los documentos técnicos de la auditoría. Sin embargo, todo el contenido generado fue revisado, adaptado y validado por el auditor, asegurando que los datos, payloads, capturas y vectores CVSS correspondan fielmente a los ataques realmente ejecutados sobre DVWA. La IA actuó como asistente de redacción y no como reemplazo del juicio técnico del auditor.
        </p>
      </div>

      {prompts.map(p => (
        <div className="prompt-entry" key={p.num}>
          <div className="prompt-header">
            <span className="prompt-num">PROMPT {p.num}</span>
            <span className="prompt-file">{p.archivo}</span>
          </div>
          <div className="prompt-body">
            <p className="prompt-q">"{p.prompt}"</p>
            <p className="prompt-use">{p.uso}</p>
          </div>
        </div>
      ))}
    </div>
  );
}