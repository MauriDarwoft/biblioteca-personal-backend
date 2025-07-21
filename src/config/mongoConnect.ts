// import mongoose from "mongoose"

// const URI_DB = process.env.URI_DB!

// const connect = async () => {
//   try {
//     console.log("🔄 Iniciando diagnóstico de conexión MongoDB...")
//     console.log("=".repeat(50))

//     // Verificar variables de entorno
//     console.log("📋 DIAGNÓSTICO DE VARIABLES:")
//     console.log("- URI_DB existe:", !!URI_DB)
//     console.log("- URI_DB longitud:", URI_DB?.length || 0)
//     console.log("- URI_DB empieza con mongodb:", URI_DB?.startsWith("mongodb"))

//     if (URI_DB) {
//       // Mostrar URI censurada (sin contraseña)
//       const censoredURI = URI_DB.replace(/:([^:@]+)@/, ":***@")
//       console.log("- URI censurada:", censoredURI)
//     }

//     console.log("=".repeat(50))
//     console.log("🔄 Intentando conectar a MongoDB...")

//     // Configurar opciones de conexión más específicas
//     await mongoose.connect(URI_DB, {
//       serverSelectionTimeoutMS: 10000, // 10 segundos timeout
//       socketTimeoutMS: 45000, // 45 segundos socket timeout
//     })

//     console.log("✅ ¡CONEXIÓN EXITOSA a MongoDB Atlas!")
//     console.log("📊 Estado de conexión:", mongoose.connection.readyState)
//   } catch (error: any) {
//     console.log("🛑 ERROR DETALLADO DE CONEXIÓN:")
//     console.log("=".repeat(50))
//     console.log("📋 Tipo de error:", error.name)
//     console.log("📋 Mensaje:", error.message)
//     console.log("📋 Código:", error.code)

//     // Diagnósticos específicos
//     if (error.message.includes("authentication failed")) {
//       console.log("🔐 PROBLEMA: Credenciales incorrectas")
//       console.log("💡 SOLUCIÓN: Verificar usuario y contraseña en MongoDB Atlas")
//     }

//     if (error.message.includes("ENOTFOUND") || error.message.includes("getaddrinfo")) {
//       console.log("🌐 PROBLEMA: No se puede resolver el DNS")
//       console.log("💡 SOLUCIÓN: Verificar conexión a internet o URL del cluster")
//     }

//     if (error.message.includes("timeout")) {
//       console.log("⏰ PROBLEMA: Timeout de conexión")
//       console.log("💡 SOLUCIÓN: Verificar IP whitelist o firewall")
//     }

//     if (error.message.includes("MongoServerSelectionError")) {
//       console.log("🖥️ PROBLEMA: No se puede seleccionar servidor")
//       console.log("💡 SOLUCIÓN: Cluster pausado o URL incorrecta")
//     }

//     console.log("=".repeat(50))
//     console.log("🔧 Stack completo del error:")
//     console.log(error.stack)
//   }
// }

// export { connect }


import mongoose from "mongoose"

const URI_DB = process.env.URI_DB!

const connect = async () => {
  try {
    await mongoose.connect(URI_DB)
    console.log("✅ ¡CONEXIÓN EXITOSA a MongoDB!")
  } catch (error) {
    console.log("🛑 ERROR DE CONEXIÓN:")
    console.log("📋 Error:", error)
  }
}

export { connect }
