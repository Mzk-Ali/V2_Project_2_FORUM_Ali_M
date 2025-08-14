import { Request, Response } from "express"
import { errorResponse, successResponse } from "../utils/responseHandler"
import prisma from "../lib/prismaClient";
import { RequestWithUser } from "../interfaces/requestWithUser.interface";

// Récupère tous les Topics
export const getAllTopics = async (req: Request, res: Response) => {
    try {
        const topics = await prisma.topic.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return successResponse(res, 200, 'Récupération des Topics réussi', topics);
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

export const getFiltersTopics = async (req: Request, res: Response) => {
    try {
        const topics = await prisma.topic.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                category: true,
                author: true,
            }
        });
        return successResponse(res, 200, 'Récupération des Topics réussi', topics);
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

export const getMyTopics = async (req: RequestWithUser, res: Response) => {
    try {
        const topics = await prisma.topic.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                authorId: req.user?.id,
            },
            include: {
                category: true,
                author: true,
            }
        });
        return successResponse(res, 200, 'Récupération de mes Topics réussi', topics);
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Récupère un topic selon son ID
export const getTopicById = async (req: Request, res: Response) => {
    const { topicID } = req.params;

    try {
        const topic = await prisma.topic.findUnique({
            where : { 
                id: parseInt(topicID) 
            },
        });

        return successResponse(res, 200, 'Récupération du Topic réussi', topic)
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Récupère tous les posts d'un Topic
export const getPostsByTopic = async (req: Request, res: Response) => {
    const { topicID } = req.params;

    try {
        const posts = await prisma.post.findMany({
            where : {
                topicId: parseInt(topicID),
            },
        });

        return successResponse(res, 200, "Récupération des Posts d'un Topic", posts)
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Création d'un Topic
export const createTopic = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Mise à jour d'un Topic
export const updateTopic = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Suppression d'un Topic
export const deleteTopic = async (req: Request, res: Response) => {
    const { topicID } = req.params;

    try {
        await prisma.topic.delete({
            where: {
                id: parseInt(topicID),
            },
        });

        successResponse(res, 200, "Suppression du Topic réussi");
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}