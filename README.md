# Pokémon TCG Explorer

Este proyecto es una aplicación web para explorar los sets y cartas del Pokémon Trading Card Game, construida con Node.js, Express, PostgreSQL para el backend y React para el frontend.

## Requisitos Previos

- Node.js (v22 o superior)
- PostgreSQL (v14 o superior)
- pnpm (v9.15 o superior)

## Estructura del Proyecto

```
pokemon-tcg/
├── packages/
│   ├── backend/    # API REST con Express
│   └── frontend/   # Aplicación React
└── resources/
    └── database_backup.sql  # Backup de la base de datos
```

## Configuración de la Base de Datos

1. Crear la base de datos y el usuario:

```sql
CREATE DATABASE pokemon_tcg;
CREATE ROLE ash WITH LOGIN;
ALTER ROLE ash WITH SUPERUSER CREATEDB CREATEROLE;
```

2. Restaurar el backup de la base de datos:

```bash
psql -U postgres -d pokemon_tcg -f "resources/database_backup.sql"
```

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/pokemon-tcg.git
cd pokemon-tcg
```

2. Instalar dependencias (desde la raíz del proyecto):

```bash
pnpm install
```

## Configuración del Backend

1. Crear archivo `.env` en la carpeta `packages/backend`:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pokemon_tcg
DB_USER=postgres
DB_PASSWORD=postgres
CORS_ORIGIN=http://localhost:5173
```

## Configuración del Frontend

1. Crear archivo `.env` en la carpeta `packages/frontend`:

```env
VITE_API_URL=http://localhost:3000/api
```

## Ejecución del Proyecto

1. Iniciar el backend (desde packages/backend):

```bash
cd packages/backend
pnpm dev
```

El servidor estará disponible en `http://localhost:3000`
La documentación de la API estará en `http://localhost:3000/api-docs`

2. Iniciar el frontend (desde packages/frontend):

```bash
cd packages/frontend
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

## Características Implementadas

Backend:
- ✅ API REST con Express
- ✅ Conexión a PostgreSQL con Sequelize
- ✅ Documentación de API con Swagger
- ✅ Tests unitarios con Jest
- Configuración Docker (pendiente)

Frontend:
- ✅ Listado de sets
- ✅ Visualización de cartas por set
- ❌  Buscador de cartas
- ✅ Diseño responsivo con Tailwind CSS
- ❌ Vista detallada de cartas (en progreso)

## Scripts Disponibles

Backend:
```bash
pnpm dev          # Inicia el servidor en modo desarrollo
pnpm test         # Ejecuta los tests
pnpm build        # Construye para producción
```

Frontend:
```bash
pnpm dev          # Inicia el servidor de desarrollo
pnpm build        # Construye para producción
pnpm preview      # Vista previa de la build
```

## API Endpoints

- `GET /api/sets` - Obtiene todos los sets
- `GET /api/sets/:id` - Obtiene un set específico
- `GET /api/sets/:id/cards` - Obtiene las cartas de un set
- `GET /api/cards/search` - Busca cartas por nombre, tipo o rareza
- `GET /api/cards/:id` - Obtiene una carta específica

## Tecnologías Utilizadas

Backend:
- Node.js con Express
- PostgreSQL con Sequelize
- TypeScript
- Jest para testing

Frontend:
- React 19
- TypeScript
- Tailwind CSS
- React Router v7
- Font Awesome


## Estado del Proyecto y Próximos Pasos

Este proyecto es parte de una prueba técnica y, debido a limitaciones de tiempo, algunas características están pendientes de implementación:

### Pendiente
1. **Dockerización** (Planificado):
   - Configuración de contenedores para:
     - PostgreSQL
     - Backend Node.js
     - Frontend React
   - Docker Compose para orquestar los servicios
   - Variables de entorno para Docker

2. **Frontend** (En progreso):
   - Corregir errores de fetching
   - Mejorar manejo de errores

### Conocimientos de Docker Planificados para Implementar
La implementación de Docker estaba planificada con la siguiente estructura:

```dockerfile
# Backend Dockerfile (planificado)
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# Frontend Dockerfile (planificado)
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
```

```yaml
# docker-compose.yml (planificado)
version: '3.8'
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: pokemon_tcg
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - ./resources/database_backup.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"

  backend:
    build: ./packages/backend
    depends_on:
      - postgres
    environment:
      DB_HOST: postgres
    ports:
      - "3000:3000"

  frontend:
    build: ./packages/frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
```

La implementación de Docker se realizaría para:
- Facilitar el despliegue
- Garantizar consistencia entre entornos
- Simplificar la configuración del entorno de desarrollo
- Facilitar la escalabilidad

## Ejecutar el Proyecto (Actualmente)

Por el momento, el proyecto se ejecuta de forma local sin Docker. Sigue las instrucciones en las secciones anteriores para la configuración local con PostgreSQL.
