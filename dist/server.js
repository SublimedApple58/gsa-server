"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Carica le variabili d'ambiente
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Connessione a MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connesso"))
    .catch((err) => console.error("Errore di connessione a MongoDB:", err));
// Importa le rotte
const articleRoutes_1 = __importDefault(require("./routes/articleRoutes"));
app.use("/articles", articleRoutes_1.default);
// Avvia il server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));
