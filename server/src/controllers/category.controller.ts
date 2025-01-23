import { Request, Response } from "express"
import { errorResponse, successResponse } from "../utils/responseHandler"
import prisma from "../lib/prismaClient"

// Récupère tous les Catégories
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = prisma.category.findMany();
        
        return successResponse(res, 200, "Récupération de tous les Catégories réussi", categories)
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Récupère tous les Topics d'une Catégorie
export const getTopicsByCategory = async (req: Request, res: Response) => {
    const { categoryID } = req.params;

    try {
        const topics = prisma.topic.findMany({
            where: {
                categoryId: parseInt(categoryID),
            },
        });

        return successResponse(res, 200, "Récupération des Topics de la Catégorie réussi", topics)
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Création d'une Catégorie
export const createCategory = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Mise à jour d'une Catégorie
export const updateCategory = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Suppression d'une Catégorie
export const deleteCategory = async (req: Request, res: Response) => {
    const { categoryID } = req.params;

    try {
        prisma.category.delete({
            where: {
                id: parseInt(categoryID),
            },
        });

        return successResponse(res, 200, "Suppression du Catégorie réussi")
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}