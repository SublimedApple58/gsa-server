"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.createArticle = exports.getArticles = void 0;
const Article_1 = __importDefault(require("../models/Article"));
// GET - Leggi tutti gli articoli
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield Article_1.default.find();
        res.status(200).json(articles);
    }
    catch (error) {
        res.status(500).json({ error: "Errore nel recupero degli articoli" });
    }
});
exports.getArticles = getArticles;
// POST - Crea un nuovo articolo
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, date } = req.body;
        if (!title || !description || !date) {
            res.status(400).json({ error: "Titolo, descrizione e data sono obbligatori" });
            return;
        }
        const newArticle = new Article_1.default({ title, description, date });
        yield newArticle.save();
        res.status(201).json({ message: "Articolo creato con successo!", article: newArticle });
    }
    catch (error) {
        res.status(500).json({ error: "Errore nella creazione dell'articolo" });
    }
});
exports.createArticle = createArticle;
// PUT - Aggiorna un articolo per ID
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedArticle = yield Article_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedArticle) {
            res.status(404).json({ error: "Articolo non trovato" });
            return;
        }
        res.status(200).json({ message: "Articolo aggiornato!", article: updatedArticle });
    }
    catch (error) {
        res.status(500).json({ error: "Errore nell'aggiornamento dell'articolo" });
    }
});
exports.updateArticle = updateArticle;
// DELETE - Elimina un articolo per ID
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedArticle = yield Article_1.default.findByIdAndDelete(id);
        if (!deletedArticle) {
            res.status(404).json({ error: "Articolo non trovato" });
            return;
        }
        res.status(200).json({ message: "Articolo eliminato!" });
    }
    catch (error) {
        res.status(500).json({ error: "Errore nell'eliminazione dell'articolo" });
    }
});
exports.deleteArticle = deleteArticle;
