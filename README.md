# Auditoría de Seguridad Web — Notaría Central Digital Servicios Legales

## Descripción

Proyecto de auditoría de seguridad web desarrollado sobre el entorno simulado DVWA (Damn Vulnerable Web Application) en nivel de seguridad Low. Se identificaron, explotaron y documentaron tres vulnerabilidades críticas presentes en el portal de clientes de Notaría Central Digital Servicios Legales, junto con sus controles de mitigación y plan de recuperación.

---

## Estructura del Proyecto

    proyecto/
    ├── docs_johnic/
    │   ├── 01_resumen_johnic.md
    │   ├── 02_sqli_johnic.md
    │   ├── 03_xss_johnic.md
    │   ├── 04_comandos_johnic.md
    │   ├── 05_activos_johnic.md
    │   ├── 06_matriz_johnic.md
    │   ├── 07_controles_johnic.md
    │   ├── 08_recuperacion_johnic.md
    │   └── 09_prompts_johnic.md
    ├── img_johnic/
    │   ├── sqli_johnic.png
    │   ├── xss_johnic.png
    │   └── comandos_johnic.png
    ├── src/
    ├── public/
    ├── README.md
    └── package.json

---

## Vulnerabilidades Analizadas

| N° | Vulnerabilidad    | Payload utilizado                  | CVSS v3.1    |
|----|-------------------|------------------------------------|--------------|
| 1  | SQL Injection     | ' OR '1'='1                        | 9.8 Crítico  |
| 2  | XSS Reflected     | script alert Johnen /script        | 6.1 Medio    |
| 3  | Command Injection | 127.0.0.1; cat /etc/passwd         | 10.0 Crítico |

---

## Documentación

| Archivo                    | Contenido                                                        |
|----------------------------|------------------------------------------------------------------|
| 01_resumen_johnic.md       | Empresa auditada, portal de clientes, objetivo y alcance         |
| 02_sqli_johnic.md          | Evidencia, análisis técnico, CVSS y defensa de SQL Injection     |
| 03_xss_johnic.md           | Evidencia, análisis técnico, CVSS y defensa de XSS Reflected     |
| 04_comandos_johnic.md      | Evidencia, análisis técnico, CVSS y defensa de Command Injection |
| 05_activos_johnic.md       | Activos de información y riesgos según la industria              |
| 06_matriz_johnic.md        | Matriz de riesgo (probabilidad x impacto) y mapa de calor        |
| 07_controles_johnic.md     | Políticas de prevención y controles de mitigación                |
| 08_recuperacion_johnic.md  | Mejora tecnológica y plan de recuperación (DR)                   |
| 09_prompts_johnic.md       | Bitácora de uso de IA                                            |

---

## Entorno de Pruebas

- Plataforma: DVWA (Damn Vulnerable Web Application)
- Nivel de seguridad: Low
- Herramienta: Navegador web
- Usuario DVWA: admin

---

## Autor

Nicolás Johnen
Auditoría de Seguridad Web — 2026