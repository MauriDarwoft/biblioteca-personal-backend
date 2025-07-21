import { z } from "zod"

const bookSchema = z.object({
  title: z.string().min(1, "El título del libro es requerido"),
  author: z.string().optional().default(""),
  status: z.enum(["leido", "por_leer"]).optional().default("por_leer"),
})

const updateBookSchema = z.object({
  title: z.string().min(1, "El título del libro es requerido").optional(),
  author: z.string().optional(),
  status: z.enum(["leido", "por_leer"]).optional(),
})

export { bookSchema, updateBookSchema }
