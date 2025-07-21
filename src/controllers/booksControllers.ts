import type { Request, Response } from "express"
import { Book } from "../models/BookModel"
import { HTTP_STATUS_CODES } from "../utils/statusCodes"
import { bookSchema, updateBookSchema } from "../validators/BookSchemaValidator"

const { OK, CREATED, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODES

declare module "express" {
  interface Request {
    userId?: string
  }
}

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const userId = req.userId
    const books = await Book.find({ userId }).sort({ createdAt: -1 })
    res.status(OK).json({ success: true, message: "Libros obtenidos exitosamente", data: books })
  } catch (error: any) {
    console.error("Error getting books:", error)
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
  }
}

const createBook = async (req: Request, res: Response): Promise<void> => {
  const body = req.body
  const userId = req.userId

  try {
    if (!userId) {
      res.status(BAD_REQUEST).json({ success: false, message: "Usuario no autenticado" })
      return
    }

    if (!body || Object.keys(body).length === 0) {
      res.status(BAD_REQUEST).json({ success: false, message: "Datos requeridos" })
      return
    }

    const validator = bookSchema.safeParse(body)

    if (!validator.success) {
      res.status(BAD_REQUEST).json({
        success: false,
        message: "Datos inválidos",
        errors: validator.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      })
      return
    }

    const validatedData = validator.data
    const { title, author, status } = validatedData

    // Verificar si el libro ya existe para este usuario
    const existingBook = await Book.findOne({
      title: { $regex: new RegExp(`^${title}$`, "i") },
      userId,
    })

    if (existingBook) {
      res.status(BAD_REQUEST).json({ success: false, message: "Este libro ya existe en tu biblioteca" })
      return
    }

    const newBook = new Book({ title, author, status, userId })
    await newBook.save()

    res.status(CREATED).json({ success: true, message: "Libro agregado exitosamente", data: newBook })
  } catch (error: any) {
    console.error("Error creando libro:", error)
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
  }
}

const updateBook = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id
  const body = req.body
  const userId = req.userId

  try {
    if (!id) {
      res.status(BAD_REQUEST).json({ success: false, message: "ID del libro es requerido" })
      return
    }

    const validator = updateBookSchema.safeParse(body)

    if (!validator.success) {
      res.status(BAD_REQUEST).json({
        success: false,
        message: "Datos inválidos",
        errors: validator.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      })
      return
    }

    const book = await Book.findOne({ _id: id, userId })

    if (!book) {
      res.status(NOT_FOUND).json({ success: false, message: "Libro no encontrado" })
      return
    }

    // Actualizar solo los campos proporcionados
    const validatedData = validator.data

    if (validatedData.title !== undefined) {
      book.title = validatedData.title
    }
    if (validatedData.author !== undefined) {
      book.author = validatedData.author
    }
    if (validatedData.status !== undefined) {
      book.status = validatedData.status
    }

    await book.save()

    res.json({ success: true, message: "Libro actualizado exitosamente", data: book })
  } catch (error) {
    const err = error as Error
    console.error("Error updating book:", err)
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: err.message })
  }
}

const deleteBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const userId = req.userId

  try {
    if (!id) {
      res.status(BAD_REQUEST).json({ success: false, message: "ID del libro es requerido" })
      return
    }

    const deletedBook = await Book.findOneAndDelete({ _id: id, userId })
    if (!deletedBook) {
      res.status(NOT_FOUND).json({ success: false, message: "Libro no encontrado" })
      return
    }

    res.json({ success: true, message: "Libro eliminado exitosamente", data: deletedBook._id })
  } catch (error) {
    const err = error as Error
    console.error("Error deleting book:", err)
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: err.message })
  }
}

const getBookStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId

    const totalBooks = await Book.countDocuments({ userId })
    const readBooks = await Book.countDocuments({ userId, status: "leido" })
    const toReadBooks = await Book.countDocuments({ userId, status: "por_leer" })

    const stats = {
      total: totalBooks,
      leidos: readBooks,
      porLeer: toReadBooks,
      progreso: totalBooks > 0 ? Math.round((readBooks / totalBooks) * 100) : 0,
    }

    res.status(OK).json({ success: true, message: "Estadísticas obtenidas exitosamente", data: stats })
  } catch (error: any) {
    console.error("Error getting stats:", error)
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
  }
}

export { getAllBooks, createBook, updateBook, deleteBook, getBookStats }
