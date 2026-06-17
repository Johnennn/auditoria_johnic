# Activos de Información y Riesgos según la Industria

## 1. Contexto de la Industria

Notaría Central Digital Servicios Legales opera en el sector de servicios legales digitales, una industria que maneja información de alto valor y sensibilidad jurídica. Los activos de información en este contexto están sujetos a regulaciones como la **Ley N° 19.628 de Protección de Datos Personales (Chile)**, la **Ley N° 19.799 sobre Documentos Electrónicos y Firma Electrónica**, y estándares internacionales como **ISO/IEC 27001**.

---

## 2. Activos de Información Identificados

### Datos
| ID   | Activo                               | Descripción                                                          | Propietario     |
|------|--------------------------------------|----------------------------------------------------------------------|-----------------|
| A-01 | Base de datos de clientes            | RUT, nombre, correo, teléfono y dirección de clientes registrados    | Área TI         |
| A-02 | Documentos notariales digitales      | Contratos, poderes notariales, escrituras y certificaciones firmadas | Área Legal      |
| A-03 | Credenciales de acceso al portal     | Usuario y contraseña de clientes y funcionarios                      | Área TI         |
| A-04 | Historial de transacciones           | Registro de trámites realizados, fechas y estados                    | Área Legal      |
| A-05 | Certificados de firma electrónica    | Claves privadas y certificados digitales de clientes y notarios      | Área Legal / TI |
| A-09 | Correos electrónicos institucionales | Comunicaciones legales entre clientes y notarios                     | Área Legal      |

### Sistemas y Software
| ID   | Activo                  | Descripción                                                 | Propietario |
|------|-------------------------|-------------------------------------------------------------|-------------|
| A-06 | Portal web de clientes  | Aplicación web que gestiona autenticación y trámites        | Área TI     |
| A-10 | Código fuente del portal| Lógica de negocio y estructura de la aplicación web         | Área TI     |

### Infraestructura
| ID   | Activo                    | Descripción                                         | Propietario |
|------|---------------------------|-----------------------------------------------------|-------------|
| A-07 | Servidor de base de datos | Motor MySQL que almacena toda la información        | Área TI     |
| A-08 | Servidor web              | Servidor que aloja y sirve el portal de clientes    | Área TI     |
---

## 3. Valoración de Activos

Cada activo se valora según tres dimensiones: **Confidencialidad (C)**, **Integridad (I)** y **Disponibilidad (D)**, en escala del 1 al 3 (1=Bajo, 2=Medio, 3=Alto).

| ID   | Activo                              | C | I | D | Valor Total |
|------|-------------------------------------|---|---|---|-------------|
| A-01 | Base de datos de clientes           | 3 | 3 | 2 | **8**       |
| A-02 | Documentos notariales digitales     | 3 | 3 | 3 | **9**       |
| A-03 | Credenciales de acceso              | 3 | 3 | 2 | **8**       |
| A-04 | Historial de transacciones          | 2 | 3 | 2 | **7**       |
| A-05 | Certificados de firma electrónica   | 3 | 3 | 3 | **9**       |
| A-06 | Portal web de clientes              | 2 | 2 | 3 | **7**       |
| A-07 | Servidor de base de datos           | 3 | 3 | 3 | **9**       |
| A-08 | Servidor web                        | 2 | 2 | 3 | **7**       |
| A-09 | Correos institucionales             | 2 | 2 | 2 | **6**       |
| A-10 | Código fuente del portal            | 3 | 3 | 1 | **7**       |

---

## 4. Riesgos según la Industria

| ID   | Riesgo                                                        | Activos Afectados      | Probabilidad | Impacto  | Nivel de Riesgo |
|------|---------------------------------------------------------------|------------------------|--------------|----------|-----------------|
| R-01 | Acceso no autorizado a documentos legales mediante SQLi       | A-01, A-02, A-04       | Alta         | Crítico  | **Crítico**     |
| R-02 | Robo de sesión de clientes o notarios mediante XSS            | A-03, A-02             | Alta         | Alto     | **Alto**        |
| R-03 | Ejecución remota de comandos en el servidor                   | A-07, A-08, A-10       | Media        | Crítico  | **Crítico**     |
| R-04 | Suplantación de identidad en trámites notariales              | A-02, A-05             | Media        | Crítico  | **Crítico**     |
| R-05 | Filtración de datos personales de clientes                    | A-01, A-09             | Alta         | Alto     | **Alto**        |
| R-06 | Alteración de documentos firmados electrónicamente            | A-02, A-05             | Baja         | Crítico  | **Alto**        |
| R-07 | Indisponibilidad del portal en períodos críticos              | A-06, A-08             | Media        | Alto     | **Alto**        |
| R-08 | Exposición del código fuente por mala configuración           | A-10                   | Media        | Alto     | **Alto**        |

---

## 5. Relación entre Vulnerabilidades Detectadas y Activos

| Vulnerabilidad    | Activos Comprometidos      | Riesgos Asociados |
|-------------------|----------------------------|-------------------|
| SQL Injection     | A-01, A-02, A-03, A-04     | R-01, R-05        |
| XSS Reflected     | A-03, A-02                 | R-02, R-04        |
| Command Injection | A-07, A-08, A-10           | R-03              |