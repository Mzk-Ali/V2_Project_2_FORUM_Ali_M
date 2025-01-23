import express from "express"
import { createPost, deletePost, getPostById, updatePost } from "../controllers/post.controller";
import { checkAuthenticate } from "../middlewares/authenticate.middleware";

const router = express.Router();

// Récupére un post par son ID
router.get('/:postID', getPostById);

// Création d'un Post
router.post('/', checkAuthenticate, createPost)

// Mise à jour d'un post
router.put('/:postID', checkAuthenticate, updatePost);

// Suppression d'un Post
router.delete('/:postID', checkAuthenticate, deletePost)

export default router;