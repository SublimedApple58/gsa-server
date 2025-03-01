import { Request, Response } from "express";
import Article from "../models/Article";

// GET - Leggi tutti gli articoli
export const getArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recupero degli articoli" });
  }
};

// POST - Crea un nuovo articolo
export const createArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, date } = req.body;

    if (!title || !description || !date) {
      res.status(400).json({ error: "Titolo, descrizione e data sono obbligatori" });
      return;
    }

    const newArticle = new Article({ title, description, date });
    await newArticle.save();

    res.status(201).json({ message: "Articolo creato con successo!", article: newArticle });
  } catch (error) {
    res.status(500).json({ error: "Errore nella creazione dell'articolo" });
  }
};

// PUT - Aggiorna un articolo per ID
export const updateArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedArticle = await Article.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedArticle) {
      res.status(404).json({ error: "Articolo non trovato" });
      return;
    }

    res.status(200).json({ message: "Articolo aggiornato!", article: updatedArticle });
  } catch (error) {
    res.status(500).json({ error: "Errore nell'aggiornamento dell'articolo" });
  }
};

// DELETE - Elimina un articolo per ID
export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      res.status(404).json({ error: "Articolo non trovato" });
      return;
    }

    res.status(200).json({ message: "Articolo eliminato!" });
  } catch (error) {
    res.status(500).json({ error: "Errore nell'eliminazione dell'articolo" });
  }
};
