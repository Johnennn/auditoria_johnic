# Bitácora de Uso de IA

## 1. Introducción

El presente documento registra el uso de inteligencia artificial (IA) como herramienta de apoyo durante el desarrollo de la auditoría de seguridad realizada sobre el portal de Notaría Central Digital Servicios Legales. Se detallan los prompts utilizados, las respuestas obtenidas y su aplicación dentro del proyecto.

**Herramienta utilizada:** Claude (Anthropic)  
**Modelo:** Claude Sonnet 4.6  
**Período de uso:** Junio 2026

---

## 2. Bitácora de Prompts

---

### Prompt 01 — Resumen ejecutivo

**Archivo destino:** `01_resumen_johnic.md`  
**Prompt utilizado:**
> "Dame el contenido para el archivo 01_resumen_johnic.md describiendo la empresa auditada, el portal de clientes, el objetivo de la auditoría y su alcance. La empresa es Notaría Central Digital Servicios Legales."

**Uso dado:** Se utilizó la respuesta como base para redactar la descripción de la empresa, el portal de clientes, el objetivo y el alcance de la auditoría.

---

### Prompt 02 — SQL Injection

**Archivo destino:** `02_sqli_johnic.md`  
**Prompt utilizado:**
> "Dame el contenido para 02_sqli_johnic.md con inyección SQL: evidencia, por qué ocurre, CVSS v3.1 y defensa. El payload usado fue ' OR '1'='1 en DVWA nivel Low."

**Uso dado:** Se utilizó para redactar la explicación técnica de la vulnerabilidad, calcular el vector CVSS y definir los controles de defensa asociados.

---

### Prompt 03 — XSS Reflected

**Archivo destino:** `03_xss_johnic.md`  
**Prompt utilizado:**
> "Dame el contenido para 03_xss_johnic.md con XSS Reflected: evidencia, por qué ocurre, CVSS v3.1 y defensa. El payload usado fue script alert johnen en DVWA nivel Low."

**Uso dado:** Se utilizó para documentar la vulnerabilidad de XSS Reflected, su vector CVSS y las medidas de mitigación recomendadas.

---

### Prompt 04 — Command Injection

**Archivo destino:** `04_comandos_johnic.md`  
**Prompt utilizado:**
> "Dame el contenido para 04_comandos_johnic.md con inyección de comandos: evidencia, por qué ocurre, CVSS v3.1 y defensa. El payload usado fue 127.0.0.1; cat /etc/passwd en DVWA nivel Low."

**Uso dado:** Se utilizó para documentar la vulnerabilidad de inyección de comandos, incluyendo el riesgo de exposición del archivo /etc/passwd y los controles recomendados.

---

### Prompt 05 — Activos de información

**Archivo destino:** `05_activos_johnic.md`  
**Prompt utilizado:**
> "Dame el contenido para 05_activos_johnic.md con los activos de información y riesgos según la industria de servicios legales digitales. Debe incluir identificación de activos, valoración y tabla de riesgos."

**Uso dado:** Se utilizó para identificar y clasificar los activos de información de la empresa, valorarlos según confidencialidad, integridad y disponibilidad, y asociarlos a los riesgos detectados.

---

### Prompt 06 — Matriz de riesgo

**Archivo destino:** `06_matriz_johnic.md`  
**Prompt utilizado:**
> "Dame el contenido para 06_matriz_johnic.md con la matriz de riesgo (probabilidad × impacto) y mapa de calor, basado en los riesgos identificados en el archivo de activos."

**Uso dado:** Se utilizó para construir la tabla de riesgos con su nivel calculado, el mapa de calor y la priorización final de riesgos.

---

### Prompt 07 — Controles de mitigación

**Archivo destino:** `07_controles_johnic.md`  
**Prompt utilizado:**
> "Dame el contenido para 07_controles_johnic.md con políticas de prevención y controles de mitigación para SQL Injection, XSS Reflected y Command Injection, más controles generales transversales alineados con ISO 27001."

**Uso dado:** Se utilizó para definir los controles preventivos, detectivos y correctivos por vulnerabilidad, incluyendo su prioridad y justificación.

---

### Prompt 08 — Plan de recuperación

**Archivo destino:** `08_recuperacion_johnic.md`  
**Prompt utilizado:**
> "Dame el contenido para 08_recuperacion_johnic.md con mejora tecnológica y plan de recuperación ante desastres (DR). Debe incluir RTO, RPO, fases del plan, estrategia de backup y propuestas de mejora tecnológica."

**Uso dado:** Se utilizó para estructurar el plan de recuperación ante desastres con sus fases, responsables, tiempos estimados y propuestas de mejora tecnológica para la empresa.

---

## 3. Reflexión sobre el Uso de IA

El uso de inteligencia artificial fue de gran utilidad como punto de partida para estructurar y redactar los documentos técnicos de la auditoría. Sin embargo, todo el contenido generado fue revisado, adaptado y validado por el auditor, asegurando que los datos, payloads, capturas y vectores CVSS correspondan fielmente a los ataques realmente ejecutados sobre DVWA. La IA actuó como asistente de redacción y no como reemplazo del juicio técnico del auditor.