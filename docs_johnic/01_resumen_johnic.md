# Resumen Ejecutivo de Auditoría de Seguridad

## 1. Empresa Auditada

**Nombre:** Notaría Central Digital Servicios Legales  
**Rubro:** Servicios legales y notariales digitales  
**Descripción:** Notaría Central Digital es una empresa que ofrece servicios notariales y legales en línea, permitiendo a sus clientes realizar trámites como firma electrónica de documentos, autenticación de contratos, poderes notariales y certificaciones digitales sin necesidad de asistir presencialmente a una oficina.

---

## 2. Portal de Clientes

**Nombre del portal:** Portal de Clientes — Notaría Central Digital  
**Descripción:** Plataforma web que permite a los usuarios autenticarse con sus credenciales personales para gestionar documentos legales, consultar el estado de trámites, firmar electrónicamente contratos y acceder al historial de operaciones notariales. El portal maneja información altamente sensible, incluyendo datos de identidad, RUT, documentos legales y datos financieros.

---

## 3. Objetivo de la Auditoría

Identificar y documentar vulnerabilidades de seguridad presentes en el portal web de Notaría Central Digital Servicios Legales mediante pruebas de penetración controladas sobre un entorno simulado (DVWA), con el propósito de evaluar el nivel de exposición al riesgo y proponer controles de mitigación adecuados.

---

## 4. Alcance

Las pruebas se realizaron sobre el entorno DVWA configurado en nivel de seguridad **Low**, cubriendo los siguientes vectores de ataque:

| N° | Tipo de Ataque        | Módulo DVWA           |
|----|-----------------------|-----------------------|
| 1  | Inyección SQL         | SQL Injection         |
| 2  | Cross-Site Scripting  | XSS (Reflected)       |
| 3  | Inyección de Comandos | Command Injection     |

**Fuera del alcance:** Infraestructura de red, servidores de producción reales y sistemas de terceros.