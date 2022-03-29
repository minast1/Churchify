import { Announcement, Denomination, Prisma } from "@prisma/client"
import { format } from "date-fns";
import { db } from "~/lib/db.server"
import { bucket } from "~/lib/firebase";

export const addAnnouncement = async (formData: Omit<Announcement, "id"| "createdAt">) => {
    const data = await db.announcement.create({
        data: {
            body: formData.body,
            image: formData.image ? formData.image : undefined ,
            creatorId: formData.creatorId,
            category: formData.category
            
        }
    });
    return data; 
}

export const getAllAnnouncements = async () => {
     const data = await db.announcement.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      creator: {
        select: {
          name: true,
        },
      },
    },
  });
  const formattedData = data.map((item) => {
    return {
      id: item.id,
      name: item.creator.name,
      category: item.category,
      createdAt: format(new Date(item.createdAt),"PPPP")
    };
  });

  return formattedData;
}

export type PaginatedNotifications = Prisma.PromiseReturnType<typeof paginatedNotifications>

export const paginatedNotifications = async (page: string | null, denomination: Denomination) => {

    const count = await db.announcement.count({
        where: {
            category : denomination
    }});
    //console.log(count)
    const data = await db.announcement.findMany({
        where: {
            category : denomination
        },
        skip: page != null ? (parseInt(page) - 1) * 5 : 0,
        take: 5,
        include: {
            creator: {
                select: {
                    name: true,
                    denomination: true,
                    avatar: true,
                   
                    
                }
            }
        },
        orderBy: {
            createdAt : 'desc'
        },
    });

    return {data, count}
}
//orderBy descending
export type PaginatedAnnouncements = Prisma.PromiseReturnType<typeof paginatedAnnouncements>
export const paginatedAnnouncements = async (page: string | null) => {
    //console.log(page)
    const count = await db.announcement.count({
        where: {
            category : 'GENERAL'
    }});
    //console.log(count)
    const data = await db.announcement.findMany({
        where: {
            category : 'GENERAL'
        },
        skip: page != null ? (parseInt(page) - 1) * 5 : 0,
        take: 5,
        include: {
            creator: {
                select: {
                    name: true,
                    denomination: true,
                    avatar: true,
                   
                    
                }
            }
        },
        orderBy: {
            createdAt : 'desc'
        },
    });

    return {data, count}
}


export const deleteAnnouncement = async (Id:string) => {
    const data = await db.announcement.delete({
        where: {
            id: Id
        }
    });
   //Delete the associated Image from firebase
    if ( data.image?.length && data.image?.startsWith("https")) {

        const image = data?.image.substring(data?.image.lastIndexOf('/') + 1);
        await bucket.file(`announcements/${image}`).delete();
        return data
    }
    return data; 
}