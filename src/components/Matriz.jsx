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
  critical: { label:"CRÍTICO", color:"#ff0033", bg:"rgba(255,0,51,0.12)", border:"#ff0033" },
  high:     { label:"ALTO",    color:"#ff8c00", bg:"rgba(255,140,0,0.10)", border:"#ff8c00" },
  medium:   { label:"MEDIO",   color:"#ffd700", bg:"rgba(255,215,0,0.08)", border:"#ffd700" },
  low:      { label:"BAJO",    color:"#00cc44", bg:"rgba(0,204,68,0.08)",  border:"#00cc44" },
};

const grupos = [
  { nivel:"critical", riesgos: riesgos.filter(r => r.nivel === "critical") },
  { nivel:"high",     riesgos: riesgos.filter(r => r.nivel === "high") },
  { nivel:"medium",   riesgos: riesgos.filter(r => r.nivel === "medium") },
];

function ScoreBar({ value, max = 12, color }) {
  return (
    <div style={{width:"100%",height:"4px",background:"rgba(255,255,255,0.07)",borderRadius:"2px",overflow:"hidden",marginTop:"8px"}}>
      <div style={{width:`${(value/max)*100}%`,height:"100%",background:color,borderRadius:"2px",boxShadow:`0 0 6px ${color}`,transition:"width 0.6s ease"}} />
    </div>
  );
}

function RiskCard({ r, selected, onClick }) {
  const cfg = nivelConfig[r.nivel];
  return (
    <div onClick={onClick} style={{background:selected?cfg.bg:"var(--surface)",border:`1px solid ${selected?cfg.border:"var(--border)"}`,borderRadius:"6px",padding:"14px 16px",cursor:"pointer",transition:"all 0.2s",boxShadow:selected?`0 0 16px ${cfg.color}33`:"none"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"8px"}}>
        <span style={{fontFamily:"var(--mono)",fontSize:"10px",color:cfg.color,letterSpacing:"1px"}}>{r.id}</span>
        <span style={{fontFamily:"var(--mono)",fontSize:"18px",fontWeight:"700",color:cfg.color,lineHeight:1,opacity:selected?1:0.5}}>{r.resultado}</span>
      </div>
      <p style={{fontSize:"12px",lineHeight:"1.4",marginTop:"6px",color:"var(--text)"}}>{r.riesgo}</p>
      <ScoreBar value={r.resultado} color={cfg.color} />
      {selected && (
        <div style={{marginTop:"10px",paddingTop:"10px",borderTop:"1px solid var(--border)"}}>
          <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
            <span style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)"}}>PROB <strong style={{color:cfg.color}}>{r.prob}</strong></span>
            <span style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)"}}>IMPACTO <strong style={{color:cfg.color}}>{r.impacto}</strong></span>
            <span style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)"}}>ACTIVOS <strong style={{color:"var(--text)"}}>{r.activos}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Matriz() {
  const [selected, setSelected] = useState(null);
  const toggle = (id) => setSelected(selected === id ? null : id);

  return (
    <div>
      <div className="section-header">
        <span className="section-eyebrow">06 — MATRIZ</span>
        <h2 className="section-title">Matriz de Riesgo</h2>
        <p className="section-desc">Haz clic en cualquier riesgo para ver su detalle. Ordenados por nivel de criticidad.</p>
      </div>

      {/* LEYENDA */}
      <div style={{display:"flex",gap:"24px",marginBottom:"28px",flexWrap:"wrap"}}>
        {Object.entries(nivelConfig).map(([key,cfg]) => (
          <div key={key} style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <div style={{width:"10px",height:"10px",borderRadius:"50%",background:cfg.color,boxShadow:`0 0 6px ${cfg.color}`}}/>
            <span style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)",letterSpacing:"1px"}}>{cfg.label}</span>
          </div>
        ))}
      </div>

      {/* COLUMNAS POR NIVEL */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px",alignItems:"start"}}>
        {grupos.map(g => {
          const cfg = nivelConfig[g.nivel];
          return (
            <div key={g.nivel}>
              <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px",paddingBottom:"10px",borderBottom:`1px solid ${cfg.color}44`}}>
                <div style={{width:"8px",height:"8px",borderRadius:"50%",background:cfg.color,boxShadow:`0 0 8px ${cfg.color}`,flexShrink:0}}/>
                <span style={{fontFamily:"var(--mono)",fontSize:"11px",color:cfg.color,letterSpacing:"2px"}}>{cfg.label}</span>
                <span style={{marginLeft:"auto",fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)"}}>{g.riesgos.length} riesgo{g.riesgos.length>1?"s":""}</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                {g.riesgos.map(r => (
                  <RiskCard key={r.id} r={r} selected={selected===r.id} onClick={() => toggle(r.id)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* RESUMEN DE SCORES */}
      <div className="card" style={{marginTop:"28px"}}>
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

      {/* EXPLICACION DEL CALCULO */}
      <div className="card" style={{marginTop:"16px"}}>
        <p className="card-title">¿Cómo se calcula el nivel de riesgo?</p>
        <p style={{fontSize:"13px",color:"var(--text)",marginBottom:"20px",lineHeight:"1.7"}}>
          Cada riesgo se evalúa multiplicando su <strong>probabilidad</strong> de ocurrencia por su <strong>impacto</strong> potencial sobre los activos. El resultado determina el nivel de criticidad.
        </p>

        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"16px",marginBottom:"24px",flexWrap:"wrap"}}>
          {[
            {label:"PROBABILIDAD",val:"1–3",border:"var(--border)"},
            {sep:"×"},
            {label:"IMPACTO",val:"1–4",border:"var(--border)"},
            {sep:"="},
            {label:"SCORE",val:"1–12",border:"var(--red-dim)"},
          ].map((item,i) =>
            item.sep ? (
              <span key={i} style={{fontFamily:"var(--mono)",fontSize:"28px",color:"var(--text-dim)"}}>{item.sep}</span>
            ) : (
              <div key={i} style={{background:"var(--surface2)",border:`1px solid ${item.border}`,borderRadius:"6px",padding:"16px 24px",textAlign:"center",minWidth:"120px"}}>
                <p style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)",letterSpacing:"2px",marginBottom:"6px"}}>{item.label}</p>
                <p style={{fontFamily:"var(--mono)",fontSize:"28px",fontWeight:"700",color:"var(--red)"}}>{item.val}</p>
              </div>
            )
          )}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px",marginBottom:"20px"}}>
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

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
          <div>
            <p style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--red)",letterSpacing:"2px",marginBottom:"10px"}}>ESCALA DE PROBABILIDAD</p>
            <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
              {[
                {val:"3",label:"Alta",  desc:"El evento es muy probable que ocurra"},
                {val:"2",label:"Media", desc:"El evento podría ocurrir en algún momento"},
                {val:"1",label:"Baja",  desc:"El evento tiene pocas posibilidades de ocurrir"},
              ].map(p => (
                <div key={p.val} style={{display:"flex",gap:"12px",alignItems:"flex-start",padding:"8px",background:"var(--surface2)",borderRadius:"4px"}}>
                  <span style={{fontFamily:"var(--mono)",fontSize:"16px",fontWeight:"700",color:"var(--red)",width:"20px",flexShrink:0}}>{p.val}</span>
                  <div>
                    <p style={{fontFamily:"var(--mono)",fontSize:"11px",color:"var(--text)",marginBottom:"2px"}}>{p.label}</p>
                    <p style={{fontSize:"11px",color:"var(--text-dim)"}}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--red)",letterSpacing:"2px",marginBottom:"10px"}}>ESCALA DE IMPACTO</p>
            <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
              {[
                {val:"4",label:"Crítico",desc:"Daño irreversible o total sobre el negocio"},
                {val:"3",label:"Alto",   desc:"Consecuencias graves sobre la operación"},
                {val:"2",label:"Medio",  desc:"Afecta parcialmente la operación"},
                {val:"1",label:"Bajo",   desc:"Consecuencias menores, sin afectar operación"},
              ].map(i => (
                <div key={i.val} style={{display:"flex",gap:"12px",alignItems:"flex-start",padding:"8px",background:"var(--surface2)",borderRadius:"4px"}}>
                  <span style={{fontFamily:"var(--mono)",fontSize:"16px",fontWeight:"700",color:"var(--red)",width:"20px",flexShrink:0}}>{i.val}</span>
                  <div>
                    <p style={{fontFamily:"var(--mono)",fontSize:"11px",color:"var(--text)",marginBottom:"2px"}}>{i.label}</p>
                    <p style={{fontSize:"11px",color:"var(--text-dim)"}}>{i.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}