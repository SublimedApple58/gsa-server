import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Carica le variabili d'ambiente
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connesso"))
  .catch((err) => console.error("Errore di connessione a MongoDB:", err));

// Importa le rotte
import articleRoutes from "./routes/articleRoutes";
app.use("/articles", articleRoutes);

// Avvia il server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));
