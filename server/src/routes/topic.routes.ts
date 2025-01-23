import express from "express";
import { createTopic, deleteTopic, getAllTopics, getPostsByTopic, getTopicById, updateTopic } from "../controllers/topic.controller";
import { checkAuthenticate } from "../middlewares/authenticate.middleware";
import { checkRole } from "../middlewares/role.middleware";

const router = express.Router();

// Récupère tous les Topics
router.get('/', getAllTopics);

// Récupère un topic selon son ID
router.get('/:topicID', getTopicById);

// Récupère tous les posts d'un Topic
router.get('/:topicID/posts', getPostsByTopic);

// Création d'un Topic
router.post('/', checkAuthenticate, createTopic);

// Mise à jour d'un Topic
router.put('/:topicID', checkAuthenticate, updateTopic);

// Suppression d'un Topic
router.delete('/:topicID', checkAuthenticate, deleteTopic);

export default router;