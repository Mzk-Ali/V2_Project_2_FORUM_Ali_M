import { Prisma } from "@prisma/client";
import prisma from "../lib/prismaClient"

// Récupérer un utilisateur par son id
export const getUserById = async(id: number) =>{
    return await prisma.user.findUnique({
        where: {id},
    });
};

// Récupérer un utilisateur par son Email
export const getUserByEmail = async(email: string) =>{
    return await prisma.user.findUnique({
        where: {email},
        include: {
            roles: true,
        }
    });
};

export const createUser = async (email:string, password:string, lastName:string, firstName:string) => {
    return await prisma.user.create({
        data: {
            email,
            password,
            lastName,
            firstName,
            status: "Active",
            verified: false,
            roles: {
            connect:{
                name: 'User'
            }
            },
        },
    });
};


// Mettre à jour un utilisateur
export const updateUser = async (userId: number, data: Prisma.UserUpdateInput) => {
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
};