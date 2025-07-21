import { Schema, model } from "mongoose"

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, default: "" },
    status: {
      type: String,
      enum: ["leido", "por_leer"],
      default: "por_leer",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { versionKey: false, timestamps: true },
)

const Book = model("Book", bookSchema)

export { Book }
