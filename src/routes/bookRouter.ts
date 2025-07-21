import { Router } from "express"
import { getAllBooks, createBook, updateBook, deleteBook, getBookStats } from "../controllers/booksControllers"
import { authMiddleware } from "../middlewares/auth"

const bookRouter = Router()

// TODAS LAS QUERIES QUE LLEGAN ACÁ COMIENZAN CON "/api/books"

// Obtener todas los libros del usuario
bookRouter.get("/", authMiddleware, getAllBooks)

// Obtener estadísticas de libros del usuario
bookRouter.get("/stats", authMiddleware, getBookStats)

// Crear un nuevo libro
bookRouter.post("/", authMiddleware, createBook)

// Actualizar un libro específico
bookRouter.patch("/:id", authMiddleware, updateBook)

// Eliminar un libro específico
bookRouter.delete("/:id", authMiddleware, deleteBook)

export { bookRouter }
