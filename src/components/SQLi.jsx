import sqliImg from "../img_johnic/sqli_johnic.png";

export default function SQLi() {
  return (
    <div>
      <div className="section-header">
        <span className="section-eyebrow">02 — VULNERABILIDAD</span>
        <h2 className="section-title">SQL Injection</h2>
        <p className="section-desc">Manipulación de consultas SQL mediante input no sanitizado para extraer datos de la base de datos.</p>
      </div>

      <div className="card">
        <p className="card-title">Evidencia</p>
        <table className="audit-table" style={{marginBottom:"16px"}}>
          <tbody>
            <tr><td style={{color:"var(--text-dim)",width:"160px"}}>Módulo DVWA</td><td>SQL Injection</td></tr>
            <tr><td style={{color:"var(--text-dim)"}}>Nivel</td><td>Low</td></tr>
            <tr><td style={{color:"var(--text-dim)"}}>Payload</td><td><code className="code-block" style={{display:"inline",padding:"2px 8px"}}>{"' OR '1'='1"}</code></td></tr>
            <tr><td style={{color:"var(--text-dim)"}}>Resultado</td><td>Se obtuvieron todos los registros de usuarios: admin, Gordon Brown, Hack Me, Pablo Picasso y Bob Smith, sin credenciales válidas.</td></tr>
          </tbody>
        </table>
        <div className="screenshot-wrap">
          <div className="screenshot-label">sqli_johnic.png — SQL Injection resultado</div>
          <img src={sqliImg} alt="Evidencia SQL Injection" />
        </div>
      </div>

      <div className="card">
        <p className="card-title">¿Por qué ocurre?</p>
        <p style={{fontSize:"13px",marginBottom:"12px"}}>La aplicación construye la consulta SQL concatenando directamente el input del usuario sin sanitización ni consultas preparadas. La consulta resultante es equivalente a:</p>
        <div className="code-block">{"SELECT * FROM users WHERE user_id = '' OR '1'='1';"}</div>
        <p style={{fontSize:"13px",marginTop:"12px"}}>La condición <code style={{color:"var(--red-soft)"}}>{"'1'='1'"}</code> siempre es verdadera, por lo que la base de datos retorna todos los registros. Esto permite eludir autenticación y extraer información confidencial.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <p className="card-title">CVSS v3.1</p>
          <div className="cvss-score">
            <span className="cvss-number">9.8</span>
            <div className="cvss-label">
              <span className="cvss-level">CRÍTICO</span>
              <span className="cvss-vector">AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H</span>
            </div>
          </div>
          <table className="audit-table" style={{marginTop:"12px"}}>
            <tbody>
              <tr><td style={{color:"var(--text-dim)"}}>Vector de Ataque</td><td>Red (Network)</td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Complejidad</td><td>Baja</td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Privilegios</td><td>Ninguno</td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Interacción Usuario</td><td>Ninguna</td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Confidencialidad</td><td><span className="badge badge--critical">ALTO</span></td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Integridad</td><td><span className="badge badge--critical">ALTO</span></td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Disponibilidad</td><td><span className="badge badge--critical">ALTO</span></td></tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <p className="card-title">Defensa</p>
          <table className="audit-table">
            <tbody>
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>Prepared Statements</td><td style={{fontSize:"12px"}}>Separar el código SQL del dato ingresado, eliminando la posibilidad de alterar la lógica.</td></tr>
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>ORM</td><td style={{fontSize:"12px"}}>Usar frameworks que abstraigan el acceso a la BD evitando SQL crudo.</td></tr>
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>Validación de inputs</td><td style={{fontSize:"12px"}}>Rechazar o escapar caracteres especiales como <code>{"' ; --"}</code></td></tr>
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>Mínimo privilegio</td><td style={{fontSize:"12px"}}>El usuario de BD debe tener solo permisos estrictamente necesarios.</td></tr>
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>WAF</td><td style={{fontSize:"12px"}}>Firewall de aplicación web que detecte patrones de inyección SQL.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}