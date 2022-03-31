import { Denomination, Message, Prisma } from "@prisma/client";
import { db } from "~/lib/db.server";



export const createMessage = async (formData: Omit<Message, "id" | "createdAt">) => {
    
    const data = await db.message.create({
        data: formData
    });
    return data;
}

export type  MessageWithUserType =  Prisma.PromiseReturnType<typeof getDenominationMessages>
export const getDenominationMessages = async (denomination: Denomination) => {
    
    const data = await db.message.findMany({
        where: {
            denomination: denomination
        },
        
        include: {
            user: {
                select: {
                    name: true,
                    denomination: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return data;
}