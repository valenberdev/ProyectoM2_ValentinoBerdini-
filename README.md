# MiniBlog API

API REST para gestionar autores y publicaciones, desarrollada con Node.js, Express y PostgreSQL.

## Requisitos

- Node.js 18+
- PostgreSQL 14+
- npm

## Configuración local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/valenberdev/ProyectoM2_ValentinoBerdini-
   cd api
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear base de datos y ejecutar scripts SQL:
   ```bash
   psql -U tu_usuario -f db/setup.sql
   psql -U tu_usuario -d miniblog_api -f db/seed.sql
   ```

4. Copiar `.env.example` a `.env` y completar las variables:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=miniblog_api
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña
   PORT=3000
   ```

5. Iniciar el servidor:
   ```bash
   npm run dev
   ```

## Endpoints

| Método | Ruta                    | Descripción              |
|--------|-------------------------|--------------------------|
| GET    | /authors                | Listar autores           |
| GET    | /authors/:id            | Detalle de autor         |
| POST   | /authors                | Crear autor              |
| PUT    | /authors/:id            | Actualizar autor         |
| DELETE | /authors/:id            | Eliminar autor           |
| GET    | /posts                  | Listar posts             |
| GET    | /posts/:id              | Detalle de post          |
| GET    | /posts/author/:authorId | Posts por autor          |
| POST   | /posts                  | Crear post               |
| PUT    | /posts/:id              | Actualizar post          |
| DELETE | /posts/:id              | Eliminar post            |

## Tests

```bash
npm test
```

## Documentación OpenAPI

El archivo `docs/openapi.yaml` contiene la especificación completa. Podés visualizarlo en [Swagger Editor](https://editor.swagger.io/) o usando la extensión Swagger Viewer en VS Code.

## Deploy en Railway

1. Crear cuenta en [Railway](https://railway.app/)
2. Conectar repositorio de GitHub
3. Crear un nuevo proyecto desde el repositorio
4. Agregar un servicio de PostgreSQL
5. Configurar variables de entorno en Railway:
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` (los del servicio PostgreSQL de Railway)
   - `PORT` (Railway lo asigna automáticamente)
6. Iniciar el servicio
7. La URL pública se genera automáticamente

## Uso de IA

Este proyecto fue desarrollado con asistencia de OpenCode (modelo big-pickle) para:
- Guía en la estructura del proyecto y buenas prácticas
- Corrección de errores en rutas y servicios
- Configuración de pruebas con Jest y Supertest
- Generación de documentación OpenAPI y README
