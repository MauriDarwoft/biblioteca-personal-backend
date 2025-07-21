# Biblioteca Personal - Backend

Backend para la aplicación de gestión de biblioteca personal desarrollado con Node.js, Express, TypeScript y MongoDB.

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
- MongoDB (local o Atlas)
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
   \`\`\`bash
   git clone <url-del-repo>
   cd biblioteca-personal-backend
   \`\`\`

2. **Instalar dependencias**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configurar variables de entorno**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Edita el archivo \`.env\` con tus configuraciones:
   \`\`\`env
   URI_DB=mongodb://localhost:27017/biblioteca-personal
   JWT_SECRET=tu_clave_secreta_muy_segura_aqui
   JWT_EXPIRES=604800
   PORT=2222
   NODE_ENV=development
   \`\`\`

4. **Iniciar el servidor de desarrollo**
   \`\`\`bash
   npm run dev
   \`\`\`

## 📚 API Endpoints

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | \`/api/auth/register\` | Registrar nuevo usuario |
| POST | \`/api/auth/login\` | Iniciar sesión |

### Libros (Requieren autenticación)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | \`/api/books\` | Obtener todos los libros del usuario |
| GET | \`/api/books/stats\` | Obtener estadísticas de libros |
| POST | \`/api/books\` | Crear nuevo libro |
| PATCH | \`/api/books/:id\` | Actualizar libro |
| DELETE | \`/api/books/:id\` | Eliminar libro |

## 📖 Ejemplos de Uso

### Registrar Usuario
\`\`\`bash
curl -X POST http://localhost:2222/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
  }'
\`\`\`

### Crear Libro
\`\`\`bash
curl -X POST http://localhost:2222/api/books \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer tu_jwt_token" \\
  -d '{
    "title": "El Quijote",
    "author": "Miguel de Cervantes",
    "status": "por_leer"
  }'
\`\`\`

## 🏗️ Estructura del Proyecto

\`\`\`
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
\`\`\`

## 🔒 Seguridad

- **JWT Tokens** para autenticación
- **Bcrypt** para hash de contraseñas
- **Rate limiting** (10 requests por 15 minutos)
- **Validación de datos** en todas las rutas
- **CORS** configurado
- **Rutas protegidas** por middleware de autenticación

## 🚀 Scripts Disponibles

- \`npm run dev\` - Ejecutar en modo desarrollo con hot reload
- \`npm run build\` - Compilar TypeScript a JavaScript
- \`npm start\` - Ejecutar versión compilada
- \`npm run lint\` - Ejecutar linter

## 🌍 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| \`URI_DB\` | URL de conexión a MongoDB | \`mongodb://localhost:27017/biblioteca\` |
| \`JWT_SECRET\` | Clave secreta para JWT | \`mi_clave_super_secreta\` |
| \`JWT_EXPIRES\` | Tiempo de expiración del token (segundos) | \`604800\` (7 días) |
| \`PORT\` | Puerto del servidor | \`2222\` |
| \`NODE_ENV\` | Entorno de ejecución | \`development\` |

## 📝 Modelo de Datos

### Usuario
\`\`\`typescript
{
  email: string (único, requerido)
  password: string (hasheado, requerido)
}
\`\`\`

### Libro
\`\`\`typescript
{
  title: string (requerido)
  author: string (opcional)
  status: "leido" | "por_leer" (default: "por_leer")
  userId: ObjectId (referencia al usuario)
  createdAt: Date
  updatedAt: Date
}
\`\`\`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
\`\`\`
