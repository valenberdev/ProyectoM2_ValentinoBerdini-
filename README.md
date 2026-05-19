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

Los tests cubren: creación de autor, obtención por ID, email duplicado (409), recurso inexistente (404), creación de post.

## Documentación OpenAPI

- **Archivo:** `docs/openapi.yaml`
- **Ver online:** [Swagger Editor](https://editor.swagger.io/?url=https://raw.githubusercontent.com/valenberdev/ProyectoM2_ValentinoBerdini-/main/docs/openapi.yaml)
- **Local:** Instalar extensión Swagger Viewer en VS Code y abrir `docs/openapi.yaml`

## Deploy en Railway

- **URL pública:** https://proyectom2valentinoberdini-production.up.railway.app

### Pasos para deployar

1. Crear cuenta en [Railway](https://railway.app/) con GitHub
2. Crear proyecto → **Deploy from GitHub repo** → seleccionar el repositorio
3. Agregar PostgreSQL: **New** → **Database** → **Add PostgreSQL**
4. Ejecutar scripts SQL desde la terminal (copiar el comando psql desde Railway):
   ```bash
   PGPASSWORD=... psql -h host -U postgres -p puerto -d railway -f db/setup.sql
   PGPASSWORD=... psql -h host -U postgres -p puerto -d railway -f db/seed.sql
   ```
5. Configurar variables de entorno en la app (no en PostgreSQL):
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` (valores del servicio PostgreSQL)
   - No agregar `PORT` (Railway lo asigna automáticamente)
6. Ir a **Settings → Networking → Generate Domain** para obtener la URL pública

## Uso de IA

Este proyecto fue desarrollado con asistencia de OpenCode (modelo big-pickle) para:
- Guía en la estructura del proyecto y buenas prácticas
- Corrección de errores en rutas y servicios
- Configuración de pruebas con Jest y Supertest
- Generación de documentación OpenAPI y README
