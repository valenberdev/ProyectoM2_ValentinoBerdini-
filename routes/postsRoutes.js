const express = require("express");
const router = express.Router();
const { validatePost } = require("../middlewares/validators");

const {
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  create,
  update,
  remove,
} = require("../services/postsService");

router.get("/", async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "No se pudieron obtener los posts" });
  }
});

router.get("/author/:authorId", async (req, res) => {
  try {
    const authorId = parseInt(req.params.authorId);
    const posts = await getPostsByAuthor(authorId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "No se pudieron obtener los posts" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await getPostById(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "No se pudo obtener el post" });
  }
});

router.post("/", validatePost, async (req, res) => {
  try {
    const newPost = await create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "No se pudo crear el post" });
  }
});

router.put("/:id", validatePost, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedPost = await update(id, req.body);
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: "Post no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "No se pudo actualizar el post" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const removedPost = await remove(id);
    if (removedPost) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Post no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "No se pudo eliminar el post" });
  }
});

module.exports = router;
