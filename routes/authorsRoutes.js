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

router.get("/", async (req, res, next) => {
  try {
    const authors = await getAllAuthors();
    res.json(authors);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const author = await getAuthorById(id);
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ message: "Autor no encontrado" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", validateAuthor, async (req, res, next) => {
  try {
    const newAuthor = await create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateAuthor, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const updatedAuthor = await update(id, req.body);
    if (updatedAuthor) {
      res.json(updatedAuthor);
    } else {
      res.status(404).json({ message: "Autor no encontrado" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const deletedAuthor = await remove(id);
    if (deletedAuthor) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Autor no encontrado" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
