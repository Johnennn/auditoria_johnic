const activos = {
  datos: [
    { id:"A-01", nombre:"Base de datos de clientes", desc:"RUT, nombre, correo, teléfono y dirección de clientes", propietario:"Área TI", c:3,i:3,d:2 },
    { id:"A-02", nombre:"Documentos notariales digitales", desc:"Contratos, poderes notariales, escrituras y certificaciones firmadas", propietario:"Área Legal", c:3,i:3,d:3 },
    { id:"A-03", nombre:"Credenciales de acceso al portal", desc:"Usuario y contraseña de clientes y funcionarios", propietario:"Área TI", c:3,i:3,d:2 },
    { id:"A-04", nombre:"Historial de transacciones", desc:"Registro de trámites realizados, fechas y estados", propietario:"Área Legal", c:2,i:3,d:2 },
    { id:"A-05", nombre:"Certificados de firma electrónica", desc:"Claves privadas y certificados digitales de clientes y notarios", propietario:"Área Legal/TI", c:3,i:3,d:3 },
    { id:"A-09", nombre:"Correos institucionales", desc:"Comunicaciones legales entre clientes y notarios", propietario:"Área Legal", c:2,i:2,d:2 },
  ],
  sistemas: [
    { id:"A-06", nombre:"Portal web de clientes", desc:"Aplicación web que gestiona autenticación y trámites", propietario:"Área TI", c:2,i:2,d:3 },
    { id:"A-10", nombre:"Código fuente del portal", desc:"Lógica de negocio y estructura de la aplicación web", propietario:"Área TI", c:3,i:3,d:1 },
  ],
  infra: [
    { id:"A-07", nombre:"Servidor de base de datos", desc:"Motor MySQL que almacena toda la información", propietario:"Área TI", c:3,i:3,d:3 },
    { id:"A-08", nombre:"Servidor web", desc:"Servidor que aloja y sirve el portal de clientes", propietario:"Área TI", c:2,i:2,d:3 },
  ],
};

const riesgos = [
  { id:"R-01", riesgo:"Acceso no autorizado a documentos mediante SQLi", activos:"A-01, A-02, A-04", prob:"Alta", impacto:"Crítico", resultado:12, nivel:"critical" },
  { id:"R-02", riesgo:"Robo de sesión mediante XSS", activos:"A-02, A-03", prob:"Alta", impacto:"Alto", resultado:9, nivel:"high" },
  { id:"R-03", riesgo:"Ejecución remota de comandos en el servidor", activos:"A-07, A-08, A-10", prob:"Media", impacto:"Crítico", resultado:8, nivel:"high" },
  { id:"R-04", riesgo:"Suplantación de identidad en trámites notariales", activos:"A-02, A-05", prob:"Media", impacto:"Crítico", resultado:8, nivel:"high" },
  { id:"R-05", riesgo:"Filtración de datos personales de clientes", activos:"A-01, A-09", prob:"Alta", impacto:"Alto", resultado:9, nivel:"high" },
  { id:"R-06", riesgo:"Alteración de documentos firmados electrónicamente", activos:"A-02, A-05", prob:"Baja", impacto:"Crítico", resultado:4, nivel:"medium" },
  { id:"R-07", riesgo:"Indisponibilidad del portal en períodos críticos", activos:"A-06, A-08", prob:"Media", impacto:"Alto", resultado:6, nivel:"medium" },
  { id:"R-08", riesgo:"Exposición del código fuente por mala configuración", activos:"A-10", prob:"Media", impacto:"Alto", resultado:6, nivel:"medium" },
];

function ActivosTable({ items, title }) {
  return (
    <div className="card">
      <p className="card-title">{title}</p>
      <table className="audit-table">
        <thead>
          <tr><th>ID</th><th>Activo</th><th>Descripción</th><th>Propietario</th><th>C</th><th>I</th><th>D</th><th>Total</th></tr>
        </thead>
        <tbody>
          {items.map(a => (
            <tr key={a.id}>
              <td style={{fontFamily:"var(--mono)",color:"var(--red)",fontSize:"11px"}}>{a.id}</td>
              <td style={{fontWeight:500}}>{a.nombre}</td>
              <td style={{color:"var(--text-dim)",fontSize:"12px"}}>{a.desc}</td>
              <td style={{color:"var(--text-dim)",fontSize:"12px"}}>{a.propietario}</td>
              <td style={{textAlign:"center"}}>{a.c}</td>
              <td style={{textAlign:"center"}}>{a.i}</td>
              <td style={{textAlign:"center"}}>{a.d}</td>
              <td style={{textAlign:"center",fontWeight:600,color:"var(--red-soft)"}}>{a.c+a.i+a.d}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Activos() {
  return (
    <div>
      <div className="section-header">
        <span className="section-eyebrow">05 — ACTIVOS</span>
        <h2 className="section-title">Activos de Información y Riesgos</h2>
        <p className="section-desc">Identificación, valoración y riesgos asociados según la industria de servicios legales digitales. Escala C/I/D: 1=Bajo, 2=Medio, 3=Alto.</p>
      </div>

      <ActivosTable items={activos.datos} title="Datos" />
      <ActivosTable items={activos.sistemas} title="Sistemas y Software" />
      <ActivosTable items={activos.infra} title="Infraestructura" />

      <div className="card">
        <p className="card-title">Riesgos según la Industria</p>
        <table className="audit-table">
          <thead>
            <tr><th>ID</th><th>Riesgo</th><th>Activos Afectados</th><th>Probabilidad</th><th>Impacto</th><th>Resultado</th><th>Nivel</th></tr>
          </thead>
          <tbody>
            {riesgos.map(r => (
              <tr key={r.id}>
                <td style={{fontFamily:"var(--mono)",color:"var(--red)",fontSize:"11px"}}>{r.id}</td>
                <td style={{fontSize:"12px"}}>{r.riesgo}</td>
                <td style={{fontFamily:"var(--mono)",fontSize:"11px",color:"var(--text-dim)"}}>{r.activos}</td>
                <td>{r.prob}</td>
                <td>{r.impacto}</td>
                <td style={{textAlign:"center",fontWeight:600}}>{r.resultado}</td>
                <td><span className={`badge badge--${r.nivel}`}>{r.nivel === "critical" ? "CRÍTICO" : r.nivel === "high" ? "ALTO" : "MEDIO"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}