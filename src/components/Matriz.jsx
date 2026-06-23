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

const nivelConfig = {
  critical: { label:"CRÍTICO", color:"#ff0033", bg:"rgba(255,0,51,0.18)", border:"rgba(255,0,51,0.6)" },
  high:     { label:"ALTO",    color:"#ff8c00", bg:"rgba(255,140,0,0.15)", border:"rgba(255,140,0,0.5)" },
  medium:   { label:"MEDIO",   color:"#ffd700", bg:"rgba(255,215,0,0.12)", border:"rgba(255,215,0,0.4)" },
  low:      { label:"BAJO",    color:"#00cc44", bg:"rgba(0,204,68,0.10)",  border:"rgba(0,204,68,0.4)" },
};

const probLabels = {3:"ALTA",2:"MEDIA",1:"BAJA"};
const impLabels  = {1:"BAJO",2:"MEDIO",3:"ALTO",4:"CRÍTICO"};

function getCell(prob, imp) {
  return riesgos.filter(r => r.prob === prob && r.impacto === imp);
}

function getCellNivel(prob, imp) {
  const score = prob * imp;
  if (score >= 10) return "critical";
  if (score >= 7)  return "high";
  if (score >= 4)  return "medium";
  if (score >= 1)  return "low";
  return null;
}

function Modal({ items, onClose }) {
  const cfg = nivelConfig[items[0].nivel];
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:99999,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div onClick={e => e.stopPropagation()} style={{background:"var(--surface)",border:`1px solid ${cfg.color}`,borderRadius:"8px",padding:"28px 32px",minWidth:"380px",maxWidth:"520px",width:"90%",boxShadow:`0 0 48px ${cfg.color}33`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{width:"8px",height:"8px",borderRadius:"50%",background:cfg.color,boxShadow:`0 0 8px ${cfg.color}`}}/>
            <span style={{fontFamily:"var(--mono)",fontSize:"10px",color:cfg.color,letterSpacing:"3px"}}>{cfg.label} — SCORE {items[0].prob * items[0].impacto}</span>
          </div>
          <button onClick={onClose} style={{background:"none",border:"1px solid var(--border)",color:"var(--text-dim)",fontFamily:"var(--mono)",fontSize:"11px",cursor:"pointer",padding:"4px 10px",borderRadius:"3px"}}>ESC</button>
        </div>
        {items.map(r => (
          <div key={r.id} style={{borderLeft:`3px solid ${cfg.color}`,paddingLeft:"16px",marginBottom:"16px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
              <span style={{fontFamily:"var(--mono)",color:cfg.color,fontSize:"11px"}}>{r.id}</span>
              <span style={{fontFamily:"var(--mono)",fontSize:"18px",fontWeight:"700",color:cfg.color}}>{r.resultado}</span>
            </div>
            <p style={{fontSize:"13px",color:"var(--text)",marginBottom:"6px",lineHeight:"1.5"}}>{r.riesgo}</p>
            <p style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)"}}>Activos: {r.activos}</p>
            <div style={{display:"flex",gap:"16px",marginTop:"8px"}}>
              <span style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)"}}>PROB <strong style={{color:cfg.color}}>{r.prob}</strong></span>
              <span style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)"}}>IMPACTO <strong style={{color:cfg.color}}>{r.impacto}</strong></span>
              <span style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)"}}>SCORE <strong style={{color:cfg.color}}>{r.resultado}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Matriz() {
  const [modal, setModal] = useState(null);

  return (
    <div>
      <div className="section-header">
        <span className="section-eyebrow">06 — MATRIZ</span>
        <h2 className="section-title">Matriz de Riesgo</h2>
        <p className="section-desc">Probabilidad × Impacto. Haz clic en una celda con riesgos para ver el detalle.</p>
      </div>

      {/* LEYENDA */}
      <div style={{display:"flex",gap:"20px",marginBottom:"24px",flexWrap:"wrap"}}>
        {Object.entries(nivelConfig).map(([key,cfg]) => (
          <div key={key} style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <div style={{width:"10px",height:"10px",borderRadius:"50%",background:cfg.color,boxShadow:`0 0 6px ${cfg.color}`}}/>
            <span style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)",letterSpacing:"1px"}}>{cfg.label}</span>
          </div>
        ))}
      </div>

      {/* MATRIZ */}
      <div className="card" style={{padding:"0",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead>
            <tr>
              <th style={{background:"var(--surface2)",padding:"14px 16px",fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)",letterSpacing:"1px",textAlign:"center",borderBottom:"1px solid var(--border)",borderRight:"1px solid var(--border)",width:"120px"}}>
                PROB \ IMPACTO
              </th>
              {[1,2,3,4].map(imp => (
                <th key={imp} style={{background:"var(--surface2)",padding:"14px",fontFamily:"var(--mono)",fontSize:"10px",color:"var(--red-soft)",letterSpacing:"1.5px",textAlign:"center",borderBottom:"1px solid var(--border)",borderRight:"1px solid var(--border)"}}>
                  <div style={{fontSize:"18px",fontWeight:"700",color:"var(--red)",marginBottom:"2px"}}>{imp}</div>
                  {impLabels[imp]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[3,2,1].map(prob => (
              <tr key={prob}>
                <td style={{background:"var(--surface2)",padding:"14px 16px",fontFamily:"var(--mono)",fontSize:"10px",color:"var(--red-soft)",letterSpacing:"1px",textAlign:"right",borderBottom:"1px solid var(--border)",borderRight:"1px solid var(--border)"}}>
                  <div style={{fontSize:"18px",fontWeight:"700",color:"var(--red)",marginBottom:"2px"}}>{prob}</div>
                  {probLabels[prob]}
                </td>
                {[1,2,3,4].map(imp => {
                  const items = getCell(prob, imp);
                  const nivel = getCellNivel(prob, imp);
                  const cfg = nivel ? nivelConfig[nivel] : null;
                  const score = prob * imp;
                  const hasRiesgos = items.length > 0;
                  return (
                    <td
                      key={imp}
                      onClick={() => hasRiesgos && setModal(items)}
                      style={{
                        padding:"0",
                        borderBottom:"1px solid var(--border)",
                        borderRight:"1px solid var(--border)",
                        cursor: hasRiesgos ? "pointer" : "default",
                        transition:"all 0.2s",
                        background: cfg ? cfg.bg : "var(--surface)",
                        position:"relative",
                        minHeight:"90px",
                      }}
                    >
                      <div style={{
                        position:"absolute",inset:0,
                        border: cfg ? `1px solid ${cfg.border}` : "none",
                        borderRadius:"0",
                        transition:"all 0.2s",
                        pointerEvents:"none",
                      }}/>
                      <div style={{padding:"16px",height:"90px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                        <div style={{fontFamily:"var(--mono)",fontSize:"11px",fontWeight:"700",color: cfg ? cfg.color : "var(--border)",opacity: hasRiesgos ? 1 : 0.3}}>
                          {score}
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:"3px"}}>
                          {hasRiesgos ? items.map(r => (
                            <div key={r.id} style={{fontFamily:"var(--mono)",fontSize:"10px",color:cfg.color,letterSpacing:"0.5px",display:"flex",alignItems:"center",gap:"4px"}}>
                              <div style={{width:"5px",height:"5px",borderRadius:"50%",background:cfg.color,boxShadow:`0 0 4px ${cfg.color}`,flexShrink:0}}/>
                              {r.id}
                            </div>
                          )) : (
                            <span style={{fontFamily:"var(--mono)",fontSize:"11px",color:"var(--border)"}}>—</span>
                          )}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RESUMEN */}
      <div className="card" style={{marginTop:"20px"}}>
        <p className="card-title">Resumen de Scores</p>
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {[...riesgos].sort((a,b) => b.resultado - a.resultado).map(r => {
            const cfg = nivelConfig[r.nivel];
            return (
              <div key={r.id} style={{display:"flex",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
                <span style={{fontFamily:"var(--mono)",fontSize:"10px",color:cfg.color,width:"36px",flexShrink:0}}>{r.id}</span>
                <span style={{flex:1,fontSize:"12px",color:"var(--text)"}}>{r.riesgo}</span>
                <div style={{width:"120px",flexShrink:0}}>
                  <div style={{height:"6px",background:"rgba(255,255,255,0.07)",borderRadius:"3px",overflow:"hidden"}}>
                    <div style={{width:`${(r.resultado/12)*100}%`,height:"100%",background:cfg.color,borderRadius:"3px",boxShadow:`0 0 6px ${cfg.color}`}}/>
                  </div>
                </div>
                <span style={{fontFamily:"var(--mono)",fontSize:"13px",fontWeight:700,color:cfg.color,width:"28px",textAlign:"right",flexShrink:0}}>{r.resultado}</span>
                <span style={{fontFamily:"var(--mono)",fontSize:"9px",color:cfg.color,background:`${cfg.color}18`,border:`1px solid ${cfg.color}44`,padding:"2px 6px",borderRadius:"2px",width:"60px",textAlign:"center",flexShrink:0}}>{cfg.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* EXPLICACION */}
      <div className="card" style={{marginTop:"16px"}}>
        <p className="card-title">¿Cómo se calcula el nivel de riesgo?</p>
        <p style={{fontSize:"13px",color:"var(--text)",marginBottom:"20px",lineHeight:"1.7"}}>
          Cada riesgo se evalúa multiplicando su <strong>probabilidad</strong> de ocurrencia por su <strong>impacto</strong> potencial sobre los activos. El resultado determina el nivel de criticidad.
        </p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"16px",marginBottom:"24px",flexWrap:"wrap"}}>
          {[{label:"PROBABILIDAD",val:"1–3"},{sep:"×"},{label:"IMPACTO",val:"1–4"},{sep:"="},{label:"SCORE",val:"1–12"}].map((item,i) =>
            item.sep ? (
              <span key={i} style={{fontFamily:"var(--mono)",fontSize:"28px",color:"var(--text-dim)"}}>{item.sep}</span>
            ) : (
              <div key={i} style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:"6px",padding:"16px 24px",textAlign:"center",minWidth:"120px"}}>
                <p style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)",letterSpacing:"2px",marginBottom:"6px"}}>{item.label}</p>
                <p style={{fontFamily:"var(--mono)",fontSize:"28px",fontWeight:"700",color:"var(--red)"}}>{item.val}</p>
              </div>
            )
          )}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px"}}>
          {[
            {rango:"10–12",label:"CRÍTICO",color:"#ff0033",bg:"rgba(255,0,51,0.10)"},
            {rango:"7–9",  label:"ALTO",   color:"#ff8c00",bg:"rgba(255,140,0,0.10)"},
            {rango:"4–6",  label:"MEDIO",  color:"#ffd700",bg:"rgba(255,215,0,0.08)"},
            {rango:"1–3",  label:"BAJO",   color:"#00cc44",bg:"rgba(0,204,68,0.08)"},
          ].map(n => (
            <div key={n.label} style={{background:n.bg,border:`1px solid ${n.color}44`,borderRadius:"6px",padding:"14px",textAlign:"center"}}>
              <p style={{fontFamily:"var(--mono)",fontSize:"22px",fontWeight:"700",color:n.color,marginBottom:"4px"}}>{n.rango}</p>
              <p style={{fontFamily:"var(--mono)",fontSize:"10px",color:n.color,letterSpacing:"2px"}}>{n.label}</p>
            </div>
          ))}
        </div>
      </div>

      {modal && <Modal items={modal} onClose={() => setModal(null)} />}
    </div>
  );
}