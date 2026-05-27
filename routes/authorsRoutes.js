const express = require("express");
const router = express.Router();
const { validateAuthor } = require("../middlewares/validators");

const {
  getAllAuthors,
  getAuthorById,
  create,
  update,
  remove,
} = require("../services/authorsService");

router.get("/", async (req, res) => {
  try {
    const authors = await getAllAuthors();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: "No se pudieron obtener los autores" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const author = await getAuthorById(id);
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ message: "Autor no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "No se pudo obtener el autor" });
  }
});

router.post("/", validateAuthor, async (req, res) => {
  try {
    const newAuthor = await create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "El email ya está registrado" });
    }
    res.status(500).json({ message: "..." });
  }
});

router.put("/:id", validateAuthor, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedAuthor = await update(id, req.body);
    if (updatedAuthor) {
      res.json(updatedAuthor);
    } else {
      res.status(404).json({ message: "Autor no encontrado" });
    }
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "El email ya está registrado" });
    }
    res.status(500).json({ message: "..." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deletedAuthor = await remove(id);
    if (deletedAuthor) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Autor no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "No se pudo eliminar el autor" });
  }
});

module.exports = router;
