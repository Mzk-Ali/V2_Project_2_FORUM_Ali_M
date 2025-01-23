import { Request, Response } from "express"
import { errorResponse, successResponse } from "../utils/responseHandler"
import prisma from "../lib/prismaClient"

// Récupére un post par son ID
export const getPostById = async (req: Request, res: Response) => {
    const { postID } = req.params;

    try {
        const post = prisma.post.findUnique({
            where: {
                id: parseInt(postID),
            },
        });

        return successResponse(res, 200, 'Récupération du Post réussi', post)
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Création d'un Post
export const createPost = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Mise à jour d'un post
export const updatePost = async (req: Request, res: Response) => {
    const { postID } = req.params;

    try {
        
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}

// Suppression d'un Post
export const deletePost = async (req: Request, res: Response) => {
    const { postID } = req.params;

    try {
        prisma.post.delete({
            where: {
                id: parseInt(postID),
            },
        });

        return successResponse(res, 200, "Suppression du Post réussi")
    } catch (error) {
        return errorResponse(res, 'Erreur du serveur', error)
    }
}
