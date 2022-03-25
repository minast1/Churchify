import { Announcement, Prisma } from "@prisma/client"
import { db } from "~/lib/db.server"



export type AnnouncementWithCreator = Prisma.PromiseReturnType<typeof getAllAnnouncements>

export const getAllAnnouncements = async () => {
    const data = await db.announcement.findMany({

    });
    return data
}
//orderBy descending
export type PaginatedAnnouncements = Prisma.PromiseReturnType<typeof paginatedAnnouncements>
export const paginatedAnnouncements = async (page: string | null) => {
    //console.log(page)
    const count = await db.announcement.count();
    //console.log(count)
    const data = await db.announcement.findMany({
        skip: page != null ? (parseInt(page) -1)  * 5 : 0,
        take: 5,
        include: {
            creator: {
                select: {
                    name: true,
                    denomination: true,
                    avatar: true
                }
            }
        },
        orderBy: {
            createdAt : 'desc'
        }
    });

    return {data, count}
}