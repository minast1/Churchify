import { Denomination } from "@prisma/client";
import { db } from "~/lib/db.server";

export const createAnnouncement = async (category: Denomination, body: string, image: string) => {
    //userId will come from authenticated user 
   // const ann = await db.announcement.create({
     //   data : 
   // })
}