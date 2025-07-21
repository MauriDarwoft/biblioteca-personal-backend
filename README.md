# Biblioteca Personal - Backend

Backend para la aplicación de gestión de biblioteca personal desarrollado con Node.js, Express, TypeScript y MongoDB desarrollada por Mauricio Fredes.

## 🚀 Características

- **API RESTful** completa para gestión de libros
- **Autenticación JWT** segura
- **Validación de datos** con Zod
- **Rate limiting** para protección contra spam
- **Arquitectura modular** y escalable
- **TypeScript** para mayor seguridad de tipos
- **MongoDB** como base de datos

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- MongoDB Atlas (o MongoDB local si prefieres)
- npm o yarn

## 🛠️ Instalación (Desarrollo Local)

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/MauriDarwoft/biblioteca-personal-backend.git
   cd biblioteca-personal-backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` con tus configuraciones. Para desarrollo local, puedes usar MongoDB local o tu URI de MongoDB Atlas:
   ```env
   # Para MongoDB Atlas (recomendado)
   URI_DB=mongodb+srv://<usuario>:<contraseña>@<tu_cluster>.mongodb.net/biblioteca-personal?retryWrites=true&w=majority&appName=<tu_app_name>

   # Para MongoDB local (si lo tienes instalado)
   # URI_DB=mongodb://localhost:27017/biblioteca-personal

   JWT_SECRET=tu_clave_secreta_muy_segura_aqui
   JWT_EXPIRES=604800
   PORT=2222
   NODE_ENV=development
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

## 🌐 Despliegue

Este backend está desplegado en [Render.com](https://render.com/).

**URL del Backend Desplegado:** [https://biblioteca-personal-backend.onrender.com](https://biblioteca-personal-backend.onrender.com)

### Configuración en Render.com

Para desplegar en Render.com, asegúrate de configurar las siguientes variables de entorno en tu servicio:

- `URI_DB`: Tu string de conexión completa de MongoDB Atlas.
- `JWT_SECRET`: Una clave secreta fuerte para JWT.
- `JWT_EXPIRES`: Tiempo de expiración del token (ej. `604800` para 7 días).
- `PORT`: Render.com asigna un puerto dinámicamente, no necesitas configurarlo explícitamente en Render, pero sí en tu código para desarrollo local.
- `NODE_ENV`: `production`

## 📚 API Endpoints

La URL base para los endpoints de la API es: `https://biblioteca-personal-backend.onrender.com/api`

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/register` | Registrar nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión |

### Libros (Requieren autenticación)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/books` | Obtener todos los libros del usuario |
| GET | `/api/books/stats` | Obtener estadísticas de libros |
| POST | `/api/books` | Crear nuevo libro |
| PATCH | `/api/books/:id` | Actualizar libro |
| DELETE | `/api/books/:id` | Eliminar libro |

## 📖 Ejemplos de Uso (con Backend Desplegado)

### Registrar Usuario
```bash
curl -X POST https://biblioteca-personal-backend.onrender.com/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
  }'
```

### Crear Libro
```bash
curl -X POST https://biblioteca-personal-backend.onrender.com/api/books \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer tu_jwt_token" \\
  -d '{
    "title": "El Quijote",
    "author": "Miguel de Cervantes",
    "status": "por_leer"
  }'
```

## 🏗️ Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── mongoConnect.ts
│   ├── controllers/
│   │   ├── authControllers.ts
│   │   └── booksControllers.ts
│   ├── middlewares/
│   │   ├── auth.ts
│   │   └── rateLimit.ts
│   ├── models/
│   │   ├── UserModel.ts
│   │   └── BookModel.ts
│   ├── routes/
│   │   ├── authRouter.ts
│   │   └── bookRouter.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── statusCodes.ts
│   ├── validators/
│   │   ├── UserSchemaValidator.ts
│   │   └── BookSchemaValidator.ts
│   └── index.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## 🔒 Seguridad

- **JWT Tokens** para autenticación
- **Bcrypt** para hash de contraseñas
- **Rate limiting** (10 requests por 15 minutos)
- **Validación de datos** en todas las rutas
- **CORS** configurado
- **Rutas protegidas** por middleware de autenticación

## 🚀 Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo con hot reload
- `npm run build` - Compilar TypeScript a JavaScript
- `npm start` - Ejecutar versión compilada
- `npm run lint` - Ejecutar linter
- `npm test` - Ejecutar tests (si los tienes configurados)

## 🌍 Variables de Entorno

| Variable | Descripción | Ejemplo | Notas |
|----------|-------------|---------|-------|
| `URI_DB` | URL de conexión a MongoDB Atlas | `mongodb+srv://...` | **Requerido** para conexión a la base de datos. |
| `JWT_SECRET` | Clave secreta para JWT | `mi_clave_super_secreta` | **Requerido** para la generación y verificación de tokens. |
| `JWT_EXPIRES` | Tiempo de expiración del token (segundos) | `604800` (7 días) | **Requerido**. |
| `PORT` | Puerto del servidor | `2222` | Usado en desarrollo local. En Render.com, el puerto es asignado automáticamente. |
| `NODE_ENV` | Entorno de ejecución | `development` o `production` | Determina si se aplica rate limiting y otros comportamientos. |

## 📝 Modelo de Datos

### Usuario
```typescript
{
  email: string (único, requerido)
  password: string (hasheado, requerido)
}
```

### Libro
```typescript
{
  title: string (requerido)
  author: string (opcional)
  status: "leido" | "por_leer" (default: "por_leer")
  userId: ObjectId (referencia al usuario)
  createdAt: Date
  updatedAt: Date
}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.