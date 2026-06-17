# Mejora Tecnológica y Plan de Recuperación (DR)

## 1. Introducción

El presente plan de recuperación ante desastres (Disaster Recovery Plan) define las acciones, responsables y tiempos de respuesta que Notaría Central Digital Servicios Legales debe seguir ante un incidente de seguridad que comprometa la disponibilidad, integridad o confidencialidad de sus activos de información. Se complementa con propuestas de mejora tecnológica orientadas a reducir la superficie de ataque y fortalecer la resiliencia del sistema.

---

## 2. Objetivos del Plan

| Objetivo | Descripción |
|----------|-------------|
| RTO (Recovery Time Objective) | Tiempo máximo tolerable para restablecer el servicio: **4 horas** |
| RPO (Recovery Point Objective) | Punto máximo de pérdida de datos tolerable: **24 horas** |
| Disponibilidad objetivo | **99.5%** de uptime mensual del portal |

---

## 3. Clasificación de Incidentes

| Nivel | Tipo de Incidente | Ejemplos | Tiempo de Respuesta |
|-------|-------------------|----------|---------------------|
| P1 - Crítico | Compromiso total del sistema | Ejecución remota de comandos, exfiltración masiva de datos | Inmediato (< 1 hora) |
| P2 - Alto | Compromiso parcial | SQLi exitoso, robo de sesiones, acceso no autorizado | < 2 horas |
| P3 - Medio | Afectación limitada | XSS detectado, intento de acceso fallido reiterado | < 4 horas |
| P4 - Bajo | Anomalía menor | Errores inusuales, tráfico sospechoso sin impacto | < 24 horas |

---

## 4. Fases del Plan de Recuperación

### Fase 1 — Detección e Identificación

| Acción | Responsable | Herramienta |
|--------|-------------|-------------|
| Monitorear alertas del WAF y sistema de logging | Área TI | WAF / SIEM |
| Identificar el tipo y alcance del incidente | Área TI | Logs del servidor |
| Clasificar el incidente según nivel de prioridad | Área TI | Tabla de clasificación |
| Notificar al equipo de respuesta y dirección | Área TI / Dirección | Correo / Teléfono |

---

### Fase 2 — Contención

| Acción | Responsable | Tiempo Estimado |
|--------|-------------|-----------------|
| Aislar el servidor o módulo comprometido | Área TI | < 30 minutos |
| Bloquear IPs y sesiones sospechosas | Área TI | < 15 minutos |
| Deshabilitar temporalmente el portal si es necesario | Área TI | < 10 minutos |
| Preservar logs y evidencia del incidente | Área TI | < 30 minutos |
| Informar a los clientes afectados si corresponde | Área Legal / Comunicaciones | < 2 horas |

---

### Fase 3 — Erradicación

| Acción | Responsable | Tiempo Estimado |
|--------|-------------|-----------------|
| Identificar y eliminar el vector de ataque | Área TI | < 2 horas |
| Aplicar parches y correcciones en el código | Desarrollo | < 4 horas |
| Restablecer contraseñas y credenciales comprometidas | Área TI | < 1 hora |
| Realizar escaneo de vulnerabilidades post-corrección | Área TI | < 2 horas |

---

### Fase 4 — Recuperación

| Acción | Responsable | Tiempo Estimado |
|--------|-------------|-----------------|
| Restaurar base de datos desde el último backup válido | Área TI | < 2 horas |
| Verificar integridad de documentos notariales | Área Legal / TI | < 1 hora |
| Reactivar el portal en ambiente controlado | Área TI | < 1 hora |
| Validar el funcionamiento completo del sistema | Área TI | < 30 minutos |
| Comunicar el restablecimiento del servicio | Comunicaciones | Inmediato |

---

### Fase 5 — Lecciones Aprendidas

| Acción | Responsable | Plazo |
|--------|-------------|-------|
| Documentar el incidente en detalle | Área TI | < 48 horas post-incidente |
| Analizar causa raíz y vectores explotados | Área TI | < 72 horas post-incidente |
| Actualizar controles y políticas de seguridad | Área TI / Dirección | < 2 semanas |
| Realizar capacitación al equipo si corresponde | RRHH / TI | < 1 mes |

---

## 5. Estrategia de Backup

| Tipo | Frecuencia | Retención | Almacenamiento |
|------|------------|-----------|----------------|
| Backup completo de base de datos | Diario | 30 días | Servidor externo cifrado |
| Backup incremental de documentos | Cada 6 horas | 7 días | Nube privada |
| Snapshot del servidor web | Semanal | 4 semanas | Infraestructura cloud |
| Backup del código fuente | Por cada despliegue | Indefinido | Repositorio Git privado |

---

## 6. Propuestas de Mejora Tecnológica

| ID  | Mejora | Descripción | Prioridad | Impacto |
|-----|--------|-------------|-----------|---------|
| M-01 | Migración a HTTPS con TLS 1.3 | Cifrar toda la comunicación entre cliente y servidor | Crítica | Confidencialidad |
| M-02 | Implementación de WAF | Desplegar un firewall de aplicación web para filtrar tráfico malicioso | Crítica | Prevención |
| M-03 | Autenticación de dos factores (2FA) | Requerir un segundo factor de autenticación para clientes y funcionarios | Alta | Autenticación |
| M-04 | SIEM centralizado | Implementar un sistema de gestión de eventos de seguridad para correlacionar alertas | Alta | Detección |
| M-05 | Migración a arquitectura de microservicios | Separar módulos críticos para limitar el impacto de un compromiso parcial | Media | Disponibilidad |
| M-06 | Escaneo automático de vulnerabilidades | Integrar herramientas como OWASP ZAP o Nessus en el ciclo de desarrollo | Alta | Prevención |
| M-07 | Gestión centralizada de secretos | Usar un vault para gestionar credenciales, claves y certificados de forma segura | Alta | Confidencialidad |
| M-08 | Pruebas de penetración anuales | Contratar auditorías externas al menos una vez al año | Media | Detección |

---

## 7. Responsables del Plan

| Rol | Responsabilidad |
|-----|-----------------|
| Jefe de TI | Coordinación general del plan y toma de decisiones técnicas |
| Desarrollador Senior | Corrección de vulnerabilidades y aplicación de parches |
| Área Legal | Validación de documentos y comunicación con clientes afectados |
| Dirección General | Autorización de acciones críticas y comunicación institucional |
| Equipo de Comunicaciones | Notificación a clientes y medios si corresponde |