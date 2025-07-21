import rateLimit from "express-rate-limit"
import { HTTP_STATUS_CODES } from "../utils/statusCodes"

const { TOO_MANY_REQUESTS } = HTTP_STATUS_CODES

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 peticiones por IP (aumentado para desarrollo)
  statusCode: TOO_MANY_REQUESTS,
  message: {
    status: TOO_MANY_REQUESTS,
    success: false,
    message: "Demasiadas peticiones desde esta IP, por favor intenta de nuevo después de 15 minutos.",
  },
})
