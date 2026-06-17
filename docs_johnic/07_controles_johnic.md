# Políticas de Prevención y Controles de Mitigación

## 1. Introducción

Los controles de mitigación definen las medidas técnicas y organizacionales que Notaría Central Digital Servicios Legales debe implementar para reducir la probabilidad e impacto de los riesgos identificados. Se clasifican en controles **preventivos**, **detectivos** y **correctivos**, alineados con el estándar **ISO/IEC 27001**.

---

## 2. Controles por Vulnerabilidad

### 2.1 SQL Injection (R-01, R-05)

| ID Control | Tipo        | Control                              | Descripción                                                                                       | Prioridad |
|------------|-------------|--------------------------------------|---------------------------------------------------------------------------------------------------|-----------|
| C-01       | Preventivo  | Consultas preparadas                 | Reemplazar consultas SQL dinámicas por prepared statements con parámetros enlazados               | Crítica   |
| C-02       | Preventivo  | ORM                                  | Utilizar un ORM que abstraiga el acceso a la base de datos evitando SQL crudo                     | Alta      |
| C-03       | Preventivo  | Validación de inputs                 | Rechazar o escapar caracteres especiales como `'`, `;`, `--` en todos los campos del formulario   | Crítica   |
| C-04       | Preventivo  | Mínimo privilegio en BD              | El usuario de base de datos del portal debe tener solo permisos de lectura donde corresponda      | Alta      |
| C-05       | Detectivo   | WAF                                  | Implementar un Web Application Firewall que detecte patrones de inyección SQL                     | Alta      |
| C-06       | Detectivo   | Monitoreo de consultas               | Registrar y alertar sobre consultas inusuales o que retornen volúmenes anormales de datos         | Media     |

---

### 2.2 XSS Reflected (R-02, R-04)

| ID Control | Tipo        | Control                              | Descripción                                                                                       | Prioridad |
|------------|-------------|--------------------------------------|---------------------------------------------------------------------------------------------------|-----------|
| C-07       | Preventivo  | Escapado de output                   | Convertir caracteres especiales en entidades HTML antes de insertarlos en la respuesta            | Crítica   |
| C-08       | Preventivo  | Content Security Policy (CSP)        | Configurar cabeceras HTTP que restrinjan la ejecución de scripts no autorizados                   | Alta      |
| C-09       | Preventivo  | Validación de inputs                 | Rechazar entradas que contengan etiquetas HTML o atributos de eventos como `onerror` u `onload`  | Alta      |
| C-10       | Preventivo  | HttpOnly y Secure en cookies         | Marcar cookies de sesión con `HttpOnly` para impedir su acceso desde JavaScript                   | Crítica   |
| C-11       | Preventivo  | Frameworks con escapado automático   | Utilizar React, Angular o Vue que escapen el contenido por defecto al renderizar variables        | Media     |
| C-12       | Detectivo   | WAF                                  | Detectar y bloquear patrones XSS conocidos en las solicitudes entrantes                           | Alta      |

---

### 2.3 Command Injection (R-03)

| ID Control | Tipo        | Control                              | Descripción                                                                                       | Prioridad |
|------------|-------------|--------------------------------------|---------------------------------------------------------------------------------------------------|-----------|
| C-13       | Preventivo  | Eliminar llamadas al sistema         | Evitar el uso de `exec()`, `shell_exec()`, `system()` con datos provenientes del usuario          | Crítica   |
| C-14       | Preventivo  | Validación estricta de inputs        | Si el campo espera una IP, validar mediante regex que tenga exactamente el formato `x.x.x.x`     | Crítica   |
| C-15       | Preventivo  | Uso de APIs seguras                  | Reemplazar llamadas al sistema por librerías nativas que realicen la misma función sin invocar shell | Alta   |
| C-16       | Preventivo  | Mínimo privilegio del servidor web   | Ejecutar el servidor con un usuario del sistema con permisos mínimos                             | Alta      |
| C-17       | Detectivo   | WAF                                  | Bloquear patrones peligrosos como `;`, `|`, `&&`, `||` en los inputs                             | Alta      |
| C-18       | Detectivo   | Monitoreo de procesos del sistema    | Alertar sobre procesos inusuales ejecutados desde el servidor web                                | Media     |

---

## 3. Controles Generales Transversales

| ID Control | Tipo        | Control                              | Descripción                                                                                       | Riesgos que Mitiga     |
|------------|-------------|--------------------------------------|---------------------------------------------------------------------------------------------------|------------------------|
| C-19       | Preventivo  | Capacitación en desarrollo seguro    | Formar al equipo de desarrollo en OWASP Top 10 y buenas prácticas de codificación segura         | R-01, R-02, R-03       |
| C-20       | Preventivo  | Revisión de código (Code Review)     | Implementar revisiones de código enfocadas en seguridad antes de cada despliegue                 | R-01, R-02, R-03       |
| C-21       | Preventivo  | Pruebas de penetración periódicas    | Realizar auditorías de seguridad al menos una vez al año o ante cambios mayores                  | Todos                  |
| C-22       | Correctivo  | Plan de respuesta a incidentes       | Definir procedimientos claros de contención, notificación y recuperación ante brechas            | Todos                  |
| C-23       | Preventivo  | Gestión de parches y actualizaciones | Mantener el servidor, CMS y dependencias actualizadas para evitar vulnerabilidades conocidas     | R-03, R-07, R-08       |
| C-24       | Detectivo   | Logging y auditoría centralizada     | Registrar todas las acciones del portal en un sistema centralizado con alertas automáticas       | R-01, R-02, R-03, R-05 |

---

## 4. Resumen de Priorización de Controles

| Prioridad | Controles               | Justificación                                              |
|-----------|-------------------------|------------------------------------------------------------|
| Inmediata | C-01, C-03, C-07, C-10, C-13, C-14 | Mitigan vulnerabilidades críticas detectadas en la auditoría |
| Alta      | C-02, C-04, C-05, C-08, C-09, C-15, C-16, C-17, C-20 | Refuerzan la defensa en profundidad |
| Media     | C-06, C-11, C-12, C-18, C-19, C-21, C-22, C-23, C-24 | Mejoran la detección y respuesta a largo plazo |