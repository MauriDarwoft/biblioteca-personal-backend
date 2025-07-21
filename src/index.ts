import "dotenv/config"
import express from "express"
import { connect } from "./config/mongoConnect"
import { bookRouter } from "./routes/bookRouter"
import { authRouter } from "./routes/authRouter"
import cors from "cors"
import { apiLimiter } from "./middlewares/rateLimit"

const PORT = process.env.PORT ?? 2222

const app = express()

// CORS debe ir ANTES de los middlewares de parsing
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Permitir el frontend
    credentials: true,
  }),
)

// Middlewares de parsing
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Aplicar rate limiting solo en producción
if (process.env.NODE_ENV === "production") {
  app.use("/api/auth", apiLimiter, authRouter)
  app.use("/api/books", apiLimiter, bookRouter)
} else {
  // En desarrollo, sin rate limiting
  app.use("/api/auth", authRouter)
  app.use("/api/books", bookRouter)
}

// Ruta para endpoints no encontrados
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint no encontrado",
  })
})

// Ruta raíz con información de la API
app.use((req, res) => {
  res.json({
    success: true,
    message: "API de Biblioteca Personal",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      books: "/api/books",
    },
  })
})

app.listen(PORT, () => {
  console.log(`✅ Servidor de Biblioteca Personal ejecutándose en http://localhost:${PORT}`)
  connect()
})
