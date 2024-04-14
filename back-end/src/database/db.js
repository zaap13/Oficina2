import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conectarBanco = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Conexão com o MongoDB estabelecida.");
  } catch (error) {
    console.error("Erro de conexão com o MongoDB:", error);
    throw error;
  }
};

export default conectarBanco;
