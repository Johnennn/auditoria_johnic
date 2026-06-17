# Matriz de Riesgo

## 1. Introducción

La matriz de riesgo permite visualizar y priorizar los riesgos identificados en la auditoría, combinando la **probabilidad** de ocurrencia con el **impacto** potencial sobre los activos de Notaría Central Digital Servicios Legales. Se utiliza una escala de 3 niveles para cada dimensión.

---

## 2. Escala de Valoración

### Probabilidad

| Nivel | Descripción |
|-------|-------------|
| 1 - Baja | El evento tiene pocas posibilidades de ocurrir |
| 2 - Media | El evento podría ocurrir en algún momento |
| 3 - Alta | El evento es muy probable que ocurra |

### Impacto

| Nivel | Descripción |
|-------|-------------|
| 1 - Bajo | Consecuencias menores, sin afectar la operación |
| 2 - Medio | Afecta parcialmente la operación o reputación |
| 3 - Alto | Consecuencias graves sobre la operación, datos o imagen |
| 4 - Crítico | Daño irreversible, legal o total sobre el negocio |

---

## 3. Cálculo del Nivel de Riesgo

**Nivel de Riesgo = Probabilidad × Impacto**

| Resultado | Nivel de Riesgo |
|-----------|-----------------|
| 1 - 3     | Bajo            |
| 4 - 6     | Medio           |
| 7 - 9     | Alto            |
| 10 - 12   | Crítico         |

---

## 4. Tabla de Riesgos

| ID   | Riesgo                                                  | Activos Afectados  | Probabilidad    | Impacto         | Resultado | Nivel    |
|------|---------------------------------------------------------|--------------------|-----------------|-----------------|-----------|----------|
| R-01 | Acceso no autorizado a documentos mediante SQLi         | A-01, A-02, A-04   | 3 - Alta        | 4 - Crítico     | **12**    | Crítico  |
| R-02 | Robo de sesión mediante XSS                             | A-02, A-03         | 3 - Alta        | 3 - Alto        | **9**     | Alto     |
| R-03 | Ejecución remota de comandos en el servidor             | A-07, A-08, A-10   | 2 - Media       | 4 - Crítico     | **8**     | Alto     |
| R-04 | Suplantación de identidad en trámites notariales        | A-02, A-05         | 2 - Media       | 4 - Crítico     | **8**     | Alto     |
| R-05 | Filtración de datos personales de clientes              | A-01, A-09         | 3 - Alta        | 3 - Alto        | **9**     | Alto     |
| R-06 | Alteración de documentos firmados electrónicamente      | A-02, A-05         | 1 - Baja        | 4 - Crítico     | **4**     | Medio    |
| R-07 | Indisponibilidad del portal en períodos críticos        | A-06, A-08         | 2 - Media       | 3 - Alto        | **6**     | Medio    |
| R-08 | Exposición del código fuente por mala configuración     | A-10               | 2 - Media       | 3 - Alto        | **6**     | Medio    |

---

## 5. Mapa de Calor

|               | 1 - Bajo Impacto | 2 - Medio Impacto | 3 - Alto Impacto | 4 - Crítico |
|---------------|------------------|-------------------|------------------|-------------|
| **3 - Alta**  |                  |                   | R-02, R-05       | R-01        |
| **2 - Media** |                  |                   | R-07, R-08       | R-03, R-04  |
| **1 - Baja**  |                  |                   |                  | R-06        |

Leyenda: Crítico = acción inmediata | Alto = atención prioritaria | Medio = gestión planificada | Bajo = monitoreo periódico

---

## 6. Priorización de Riesgos

| Prioridad | ID   | Riesgo                                              | Nivel    |
|-----------|------|-----------------------------------------------------|----------|
| 1°        | R-01 | Acceso no autorizado a documentos mediante SQLi     | Crítico  |
| 2°        | R-02 | Robo de sesión mediante XSS                         | Alto     |
| 3°        | R-05 | Filtración de datos personales de clientes          | Alto     |
| 4°        | R-03 | Ejecución remota de comandos en el servidor         | Alto     |
| 5°        | R-04 | Suplantación de identidad en trámites notariales    | Alto     |
| 6°        | R-06 | Alteración de documentos firmados                   | Medio    |
| 7°        | R-07 | Indisponibilidad del portal                         | Medio    |
| 8°        | R-08 | Exposición del código fuente                        | Medio    |