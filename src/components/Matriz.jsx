import { useState } from "react";

const riesgos = [
  { id:"R-01", riesgo:"Acceso no autorizado a documentos mediante SQLi", activos:"A-01, A-02, A-04", prob:3, impacto:4, resultado:12, nivel:"critical" },
  { id:"R-02", riesgo:"Robo de sesión mediante XSS", activos:"A-02, A-03", prob:3, impacto:3, resultado:9, nivel:"high" },
  { id:"R-03", riesgo:"Ejecución remota de comandos en el servidor", activos:"A-07, A-08, A-10", prob:2, impacto:4, resultado:8, nivel:"high" },
  { id:"R-04", riesgo:"Suplantación de identidad en trámites notariales", activos:"A-02, A-05", prob:2, impacto:4, resultado:8, nivel:"high" },
  { id:"R-05", riesgo:"Filtración de datos personales de clientes", activos:"A-01, A-09", prob:3, impacto:3, resultado:9, nivel:"high" },
  { id:"R-06", riesgo:"Alteración de documentos firmados electrónicamente", activos:"A-02, A-05", prob:1, impacto:4, resultado:4, nivel:"medium" },
  { id:"R-07", riesgo:"Indisponibilidad del portal en períodos críticos", activos:"A-06, A-08", prob:2, impacto:3, resultado:6, nivel:"medium" },
  { id:"R-08", riesgo:"Exposición del código fuente por mala configuración", activos:"A-10", prob:2, impacto:3, resultado:6, nivel:"medium" },
];

const probLabels = ["3 — Alta","2 — Media","1 — Baja"];
const impLabels  = ["1 — Bajo","2 — Medio","3 — Alto","4 — Crítico"];

function getCell(prob, imp) {
  return riesgos.filter(r => r.prob === prob && r.impacto === imp);
}

function cellClass(prob, imp) {
  const score = prob * imp;
  if (score >= 10) return "cell-critical";
  if (score >= 7)  return "cell-high";
  if (score >= 4)  return "cell-medium";
  if (score >= 1)  return "cell-low";
  return "cell-empty";
}

export default function Matriz() {
  const [hover, setHover] = useState(null);

  return (
    <div>
      <div className="section-header">
        <span className="section-eyebrow">06 — MATRIZ</span>
        <h2 className="section-title">Matriz de Riesgo</h2>
        <p className="section-desc">Probabilidad × Impacto. Pasa el cursor sobre una celda para ver los riesgos asociados.</p>
      </div>

      <div className="card">
        <p className="card-title">Escala de Valoración</p>
        <div className="grid-2">
          <div>
            <p style={{fontFamily:"var(--mono)",fontSize:"11px",color:"var(--red)",marginBottom:"8px"}}>PROBABILIDAD</p>
            <table className="audit-table">
              <tbody>
                <tr><td style={{fontFamily:"var(--mono)"}}>3 — Alta</td><td>El evento es muy probable que ocurra</td></tr>
                <tr><td style={{fontFamily:"var(--mono)"}}>2 — Media</td><td>El evento podría ocurrir en algún momento</td></tr>
                <tr><td style={{fontFamily:"var(--mono)"}}>1 — Baja</td><td>El evento tiene pocas posibilidades de ocurrir</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <p style={{fontFamily:"var(--mono)",fontSize:"11px",color:"var(--red)",marginBottom:"8px"}}>IMPACTO</p>
            <table className="audit-table">
              <tbody>
                <tr><td style={{fontFamily:"var(--mono)"}}>4 — Crítico</td><td>Daño irreversible o total sobre el negocio</td></tr>
                <tr><td style={{fontFamily:"var(--mono)"}}>3 — Alto</td><td>Consecuencias graves sobre la operación</td></tr>
                <tr><td style={{fontFamily:"var(--mono)"}}>2 — Medio</td><td>Afecta parcialmente la operación</td></tr>
                <tr><td style={{fontFamily:"var(--mono)"}}>1 — Bajo</td><td>Consecuencias menores, sin afectar operación</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card">
        <p className="card-title">Mapa de Calor</p>
        <div style={{display:"flex",gap:"12px",marginBottom:"16px",flexWrap:"wrap"}}>
          {[
            {cls:"cell-critical",label:"Crítico (10–12)"},
            {cls:"cell-high",label:"Alto (7–9)"},
            {cls:"cell-medium",label:"Medio (4–6)"},
            {cls:"cell-low",label:"Bajo (1–3)"},
          ].map(l => (
            <div key={l.cls} style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <div className={l.cls} style={{width:16,height:16,borderRadius:2,border:"1px solid"}} />
              <span style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)"}}>{l.label}</span>
            </div>
          ))}
        </div>

        <div className="heatmap-wrap">
          <table className="heatmap">
            <thead>
              <tr>
                <th style={{textAlign:"right"}}>Prob \ Impacto</th>
                {impLabels.map(l => <th key={l}>{l}</th>)}
              </tr>
            </thead>
            <tbody>
              {[3,2,1].map(prob => (
                <tr key={prob}>
                  <td className="row-label">{prob === 3 ? "3 — Alta" : prob === 2 ? "2 — Media" : "1 — Baja"}</td>
                  {[1,2,3,4].map(imp => {
                    const items = getCell(prob, imp);
                    const key = `${prob}-${imp}`;
                    return (
                      <td
                        key={imp}
                        className={items.length > 0 ? cellClass(prob, imp) : "cell-empty"}
                        onMouseEnter={() => items.length > 0 && setHover(key)}
                        onMouseLeave={() => setHover(null)}
                        style={{position:"relative"}}
                      >
                        {items.length > 0 ? items.map(r => r.id).join(", ") : "—"}
                        {hover === key && items.length > 0 && (
                          <div style={{
                            position:"absolute",
                            bottom:"calc(100% + 6px)",
                            left:"50%",
                            transform:"translateX(-50%)",
                            background:"#1a000a",
                            border:"1px solid var(--red-dim)",
                            borderRadius:"4px",
                            padding:"10px 14px",
                            zIndex:10,
                            minWidth:"220px",
                            boxShadow:"0 4px 20px rgba(255,0,51,0.2)",
                            pointerEvents:"none",
                          }}>
                            {items.map(r => (
                              <div key={r.id} style={{marginBottom:"6px"}}>
                                <span style={{fontFamily:"var(--mono)",color:"var(--red)",fontSize:"10px"}}>{r.id}</span>
                                <span style={{fontSize:"11px",color:"var(--text)",marginLeft:"8px"}}>{r.riesgo}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <p className="card-title">Tabla de Riesgos</p>
        <table className="audit-table">
          <thead>
            <tr><th>#</th><th>Riesgo</th><th>Activos</th><th>Prob</th><th>Impacto</th><th>Score</th><th>Nivel</th></tr>
          </thead>
          <tbody>
            {riesgos.sort((a,b) => b.resultado - a.resultado).map(r => (
              <tr key={r.id}>
                <td style={{fontFamily:"var(--mono)",color:"var(--red)",fontSize:"11px"}}>{r.id}</td>
                <td style={{fontSize:"12px"}}>{r.riesgo}</td>
                <td style={{fontFamily:"var(--mono)",fontSize:"11px",color:"var(--text-dim)"}}>{r.activos}</td>
                <td style={{textAlign:"center"}}>{r.prob}</td>
                <td style={{textAlign:"center"}}>{r.impacto}</td>
                <td style={{textAlign:"center",fontWeight:700,color: r.nivel==="critical"?"var(--red)": r.nivel==="high"?"#ff8c00":"#ffd700"}}>{r.resultado}</td>
                <td><span className={`badge badge--${r.nivel}`}>{r.nivel==="critical"?"CRÍTICO":r.nivel==="high"?"ALTO":"MEDIO"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}