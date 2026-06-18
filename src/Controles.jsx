const secciones = [
  {
    titulo: "SQL Injection (R-01, R-05)",
    controles: [
      { id:"C-01", tipo:"Preventivo", control:"Consultas preparadas", desc:"Reemplazar consultas SQL dinámicas por prepared statements con parámetros enlazados.", prioridad:"critical" },
      { id:"C-02", tipo:"Preventivo", control:"ORM", desc:"Utilizar un ORM que abstraiga el acceso a la BD evitando SQL crudo.", prioridad:"high" },
      { id:"C-03", tipo:"Preventivo", control:"Validación de inputs", desc:"Rechazar o escapar caracteres especiales como ', ;, -- en todos los campos.", prioridad:"critical" },
      { id:"C-04", tipo:"Preventivo", control:"Mínimo privilegio en BD", desc:"El usuario de BD del portal debe tener solo permisos de lectura donde corresponda.", prioridad:"high" },
      { id:"C-05", tipo:"Detectivo",  control:"WAF", desc:"Firewall de aplicación web que detecte patrones de inyección SQL conocidos.", prioridad:"high" },
      { id:"C-06", tipo:"Detectivo",  control:"Monitoreo de consultas", desc:"Registrar y alertar sobre consultas que retornen volúmenes anormales de datos.", prioridad:"medium" },
    ]
  },
  {
    titulo: "XSS Reflected (R-02, R-04)",
    controles: [
      { id:"C-07", tipo:"Preventivo", control:"Output Encoding", desc:"Convertir caracteres especiales en entidades HTML antes de insertarlos en la respuesta.", prioridad:"critical" },
      { id:"C-08", tipo:"Preventivo", control:"Content Security Policy", desc:"Cabeceras HTTP que restrinjan la ejecución de scripts no autorizados.", prioridad:"high" },
      { id:"C-09", tipo:"Preventivo", control:"Validación de inputs", desc:"Rechazar entradas con etiquetas HTML o atributos de eventos como onerror u onload.", prioridad:"high" },
      { id:"C-10", tipo:"Preventivo", control:"HttpOnly en cookies", desc:"Marcar cookies de sesión con HttpOnly para impedir su acceso desde JavaScript.", prioridad:"critical" },
      { id:"C-11", tipo:"Preventivo", control:"Frameworks seguros", desc:"Usar React, Angular o Vue que escapen el contenido por defecto al renderizar.", prioridad:"medium" },
      { id:"C-12", tipo:"Detectivo",  control:"WAF", desc:"Detectar y bloquear patrones XSS conocidos en las solicitudes entrantes.", prioridad:"high" },
    ]
  },
  {
    titulo: "Command Injection (R-03)",
    controles: [
      { id:"C-13", tipo:"Preventivo", control:"Eliminar llamadas al SO", desc:"Evitar exec(), shell_exec(), system() con datos provenientes del usuario.", prioridad:"critical" },
      { id:"C-14", tipo:"Preventivo", control:"Validación estricta", desc:"Si el campo espera una IP, validar con regex formato exacto x.x.x.x.", prioridad:"critical" },
      { id:"C-15", tipo:"Preventivo", control:"APIs seguras", desc:"Reemplazar llamadas al sistema por librerías nativas sin invocar una shell.", prioridad:"high" },
      { id:"C-16", tipo:"Preventivo", control:"Mínimo privilegio del servidor", desc:"Ejecutar el servidor web con usuario del sistema con permisos mínimos.", prioridad:"high" },
      { id:"C-17", tipo:"Detectivo",  control:"WAF", desc:"Bloquear patrones peligrosos como ; | && || en los inputs.", prioridad:"high" },
      { id:"C-18", tipo:"Detectivo",  control:"Monitoreo de procesos", desc:"Alertar sobre procesos inusuales ejecutados desde el servidor web.", prioridad:"medium" },
    ]
  },
  {
    titulo: "Controles Transversales",
    controles: [
      { id:"C-19", tipo:"Preventivo",  control:"Capacitación en desarrollo seguro", desc:"Formar al equipo en OWASP Top 10 y buenas prácticas de codificación segura.", prioridad:"high" },
      { id:"C-20", tipo:"Preventivo",  control:"Code Review", desc:"Revisiones de código enfocadas en seguridad antes de cada despliegue.", prioridad:"high" },
      { id:"C-21", tipo:"Preventivo",  control:"Pentesting periódico", desc:"Auditorías de seguridad al menos una vez al año o ante cambios mayores.", prioridad:"medium" },
      { id:"C-22", tipo:"Correctivo",  control:"Plan de respuesta a incidentes", desc:"Procedimientos claros de contención, notificación y recuperación ante brechas.", prioridad:"high" },
      { id:"C-23", tipo:"Preventivo",  control:"Gestión de parches", desc:"Mantener servidor, CMS y dependencias actualizadas frente a vulnerabilidades conocidas.", prioridad:"high" },
      { id:"C-24", tipo:"Detectivo",   control:"Logging y auditoría centralizada", desc:"Registrar todas las acciones del portal con alertas automáticas ante anomalías.", prioridad:"high" },
    ]
  },
];

const tipoBadge = { Preventivo:"medium", Detectivo:"high", Correctivo:"critical" };
const prioLabel = { critical:"INMEDIATA", high:"ALTA", medium:"MEDIA" };

export default function Controles() {
  return (
    <div>
      <div className="section-header">
        <span className="section-eyebrow">07 — CONTROLES</span>
        <h2 className="section-title">Políticas de Prevención y Controles de Mitigación</h2>
        <p className="section-desc">Medidas técnicas y organizacionales clasificadas por tipo y prioridad, alineadas con ISO/IEC 27001.</p>
      </div>

      {secciones.map(s => (
        <div className="card" key={s.titulo}>
          <p className="card-title">{s.titulo}</p>
          <table className="audit-table">
            <thead>
              <tr><th>ID</th><th>Tipo</th><th>Control</th><th>Descripción</th><th>Prioridad</th></tr>
            </thead>
            <tbody>
              {s.controles.map(c => (
                <tr key={c.id}>
                  <td style={{fontFamily:"var(--mono)",color:"var(--red)",fontSize:"11px"}}>{c.id}</td>
                  <td><span className={`badge badge--${tipoBadge[c.tipo]}`}>{c.tipo.toUpperCase()}</span></td>
                  <td style={{fontWeight:500,fontSize:"12px"}}>{c.control}</td>
                  <td style={{color:"var(--text-dim)",fontSize:"12px"}}>{c.desc}</td>
                  <td><span className={`badge badge--${c.prioridad}`}>{prioLabel[c.prioridad]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}