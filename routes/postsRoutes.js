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

router.get("/", async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/author/:authorId", async (req, res, next) => {
  try {
    const authorId = parseInt(req.params.authorId);
    const posts = await getPostsByAuthor(authorId);
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const post = await getPostById(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post no encontrado" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", validatePost, async (req, res, next) => {
  try {
    const newPost = await create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validatePost, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const updatedPost = await update(id, req.body);
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: "Post no encontrado" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const removedPost = await remove(id);
    if (removedPost) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Post no encontrado" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
