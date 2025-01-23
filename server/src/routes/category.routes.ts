import express from "express"
import { createCategory, deleteCategory, getAllCategories, getTopicsByCategory, updateCategory } from "../controllers/category.controller";
import { checkAuthenticate } from "../middlewares/authenticate.middleware";
import { checkRole } from "../middlewares/role.middleware";

const router = express.Router();

// Récupère tous les Catégories
router.get('/', getAllCategories);

// Récupère tous les Topics d'une Catégorie
router.get('/:categoryID/topics', getTopicsByCategory);

// Création d'une Catégorie
router.post('/', checkAuthenticate, checkRole(['SupraAdmin']), createCategory);

// Mise à jour d'une Catégorie
router.put('/:categoryID', checkAuthenticate, checkRole(['SupraAdmin']), updateCategory);

// Suppression d'une Catégorie
router.delete('/:categoryID', checkAuthenticate, checkRole(['SupraAdmin']), deleteCategory);

export default router;