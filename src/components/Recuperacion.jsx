const fases = [
  {
    num:"01", nombre:"Detección e Identificación",
    acciones:[
      { accion:"Monitorear alertas del WAF y sistema de logging", resp:"Área TI", tiempo:"Continuo" },
      { accion:"Identificar el tipo y alcance del incidente", resp:"Área TI", tiempo:"< 30 min" },
      { accion:"Clasificar el incidente según nivel de prioridad", resp:"Área TI", tiempo:"< 15 min" },
      { accion:"Notificar al equipo de respuesta y dirección", resp:"Área TI / Dirección", tiempo:"< 30 min" },
    ]
  },
  {
    num:"02", nombre:"Contención",
    acciones:[
      { accion:"Aislar el servidor o módulo comprometido", resp:"Área TI", tiempo:"< 30 min" },
      { accion:"Bloquear IPs y sesiones sospechosas", resp:"Área TI", tiempo:"< 15 min" },
      { accion:"Deshabilitar temporalmente el portal si es necesario", resp:"Área TI", tiempo:"< 10 min" },
      { accion:"Preservar logs y evidencia del incidente", resp:"Área TI", tiempo:"< 30 min" },
      { accion:"Informar a los clientes afectados si corresponde", resp:"Legal / Comunicaciones", tiempo:"< 2 horas" },
    ]
  },
  {
    num:"03", nombre:"Erradicación",
    acciones:[
      { accion:"Identificar y eliminar el vector de ataque", resp:"Área TI", tiempo:"< 2 horas" },
      { accion:"Aplicar parches y correcciones en el código", resp:"Desarrollo", tiempo:"< 4 horas" },
      { accion:"Restablecer contraseñas y credenciales comprometidas", resp:"Área TI", tiempo:"< 1 hora" },
      { accion:"Realizar escaneo de vulnerabilidades post-corrección", resp:"Área TI", tiempo:"< 2 horas" },
    ]
  },
  {
    num:"04", nombre:"Recuperación",
    acciones:[
      { accion:"Restaurar base de datos desde el último backup válido", resp:"Área TI", tiempo:"< 2 horas" },
      { accion:"Verificar integridad de documentos notariales", resp:"Área Legal / TI", tiempo:"< 1 hora" },
      { accion:"Reactivar el portal en ambiente controlado", resp:"Área TI", tiempo:"< 1 hora" },
      { accion:"Validar el funcionamiento completo del sistema", resp:"Área TI", tiempo:"< 30 min" },
      { accion:"Comunicar el restablecimiento del servicio", resp:"Comunicaciones", tiempo:"Inmediato" },
    ]
  },
  {
    num:"05", nombre:"Lecciones Aprendidas",
    acciones:[
      { accion:"Documentar el incidente en detalle", resp:"Área TI", tiempo:"< 48 horas" },
      { accion:"Analizar causa raíz y vectores explotados", resp:"Área TI", tiempo:"< 72 horas" },
      { accion:"Actualizar controles y políticas de seguridad", resp:"Área TI / Dirección", tiempo:"< 2 semanas" },
      { accion:"Realizar capacitación al equipo si corresponde", resp:"RRHH / TI", tiempo:"< 1 mes" },
    ]
  },
];

const mejoras = [
  { id:"M-01", mejora:"HTTPS con TLS 1.3", desc:"Cifrar toda la comunicación entre cliente y servidor.", prioridad:"critical", impacto:"Confidencialidad" },
  { id:"M-02", mejora:"WAF", desc:"Desplegar un firewall de aplicación web para filtrar tráfico malicioso.", prioridad:"critical", impacto:"Prevención" },
  { id:"M-03", mejora:"Autenticación 2FA", desc:"Requerir un segundo factor de autenticación para clientes y funcionarios.", prioridad:"high", impacto:"Autenticación" },
  { id:"M-04", mejora:"SIEM centralizado", desc:"Sistema de gestión de eventos de seguridad para correlacionar alertas.", prioridad:"high", impacto:"Detección" },
  { id:"M-05", mejora:"Microservicios", desc:"Separar módulos críticos para limitar el impacto de un compromiso parcial.", prioridad:"medium", impacto:"Disponibilidad" },
  { id:"M-06", mejora:"Escaneo automático", desc:"Integrar OWASP ZAP o Nessus en el ciclo de desarrollo continuo.", prioridad:"high", impacto:"Prevención" },
  { id:"M-07", mejora:"Gestión de secretos", desc:"Vault para gestionar credenciales, claves y certificados de forma segura.", prioridad:"high", impacto:"Confidencialidad" },
  { id:"M-08", mejora:"Pentesting anual", desc:"Contratar auditorías externas de seguridad al menos una vez al año.", prioridad:"medium", impacto:"Detección" },
];

const prioLabel = { critical:"INMEDIATA", high:"ALTA", medium:"MEDIA" };

export default function Recuperacion() {
  return (
    <div>
      <div className="section-header">
        <span className="section-eyebrow">08 — RECUPERACIÓN</span>
        <h2 className="section-title">Plan de Recuperación (DR)</h2>
        <p className="section-desc">Acciones, responsables y tiempos de respuesta ante incidentes de seguridad, junto a propuestas de mejora tecnológica.</p>
      </div>

      <div className="card">
        <p className="card-title">Objetivos del Plan</p>
        <table className="audit-table">
          <tbody>
            <tr><td style={{color:"var(--text-dim)",width:"200px"}}>RTO (Recovery Time Objective)</td><td>Tiempo máximo para restablecer el servicio: <strong style={{color:"var(--red)"}}>4 horas</strong></td></tr>
            <tr><td style={{color:"var(--text-dim)"}}>RPO (Recovery Point Objective)</td><td>Punto máximo de pérdida de datos tolerable: <strong style={{color:"var(--red)"}}>24 horas</strong></td></tr>
            <tr><td style={{color:"var(--text-dim)"}}>Disponibilidad objetivo</td><td><strong style={{color:"var(--red)"}}>99.5%</strong> de uptime mensual del portal</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <p className="card-title">Clasificación de Incidentes</p>
        <table className="audit-table">
          <thead><tr><th>Nivel</th><th>Tipo</th><th>Ejemplos</th><th>Respuesta</th></tr></thead>
          <tbody>
            <tr><td><span className="badge badge--critical">P1 CRÍTICO</span></td><td>Compromiso total</td><td>RCE, exfiltración masiva</td><td style={{fontFamily:"var(--mono)",fontSize:"11px",color:"var(--red)"}}>{"< 1 hora"}</td></tr>
            <tr><td><span className="badge badge--high">P2 ALTO</span></td><td>Compromiso parcial</td><td>SQLi exitoso, robo de sesiones</td><td style={{fontFamily:"var(--mono)",fontSize:"11px"}}>{"< 2 horas"}</td></tr>
            <tr><td><span className="badge badge--medium">P3 MEDIO</span></td><td>Afectación limitada</td><td>XSS detectado, acceso fallido reiterado</td><td style={{fontFamily:"var(--mono)",fontSize:"11px"}}>{"< 4 horas"}</td></tr>
            <tr><td><span className="badge badge--low">P4 BAJO</span></td><td>Anomalía menor</td><td>Errores inusuales sin impacto</td><td style={{fontFamily:"var(--mono)",fontSize:"11px"}}>{"< 24 horas"}</td></tr>
          </tbody>
        </table>
      </div>

      {fases.map(f => (
        <div className="card" key={f.num}>
          <p className="card-title">Fase {f.num} — {f.nombre}</p>
          <table className="audit-table">
            <thead><tr><th>Acción</th><th>Responsable</th><th>Tiempo</th></tr></thead>
            <tbody>
              {f.acciones.map((a,i) => (
                <tr key={i}>
                  <td style={{fontSize:"12px"}}>{a.accion}</td>
                  <td style={{color:"var(--text-dim)",fontSize:"12px"}}>{a.resp}</td>
                  <td style={{fontFamily:"var(--mono)",fontSize:"11px",color:"var(--red-soft)"}}>{a.tiempo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <div className="card">
        <p className="card-title">Estrategia de Backup</p>
        <table className="audit-table">
          <thead><tr><th>Tipo</th><th>Frecuencia</th><th>Retención</th><th>Almacenamiento</th></tr></thead>
          <tbody>
            <tr><td>Backup completo de BD</td><td>Diario</td><td>30 días</td><td>Servidor externo cifrado</td></tr>
            <tr><td>Backup incremental de documentos</td><td>Cada 6 horas</td><td>7 días</td><td>Nube privada</td></tr>
            <tr><td>Snapshot del servidor web</td><td>Semanal</td><td>4 semanas</td><td>Infraestructura cloud</td></tr>
            <tr><td>Backup del código fuente</td><td>Por cada despliegue</td><td>Indefinido</td><td>Repositorio Git privado</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <p className="card-title">Propuestas de Mejora Tecnológica</p>
        <table className="audit-table">
          <thead><tr><th>ID</th><th>Mejora</th><th>Descripción</th><th>Prioridad</th><th>Impacto</th></tr></thead>
          <tbody>
            {mejoras.map(m => (
              <tr key={m.id}>
                <td style={{fontFamily:"var(--mono)",color:"var(--red)",fontSize:"11px"}}>{m.id}</td>
                <td style={{fontWeight:500,fontSize:"12px"}}>{m.mejora}</td>
                <td style={{color:"var(--text-dim)",fontSize:"12px"}}>{m.desc}</td>
                <td><span className={`badge badge--${m.prioridad}`}>{prioLabel[m.prioridad]}</span></td>
                <td style={{fontSize:"12px",color:"var(--text-dim)"}}>{m.impacto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}