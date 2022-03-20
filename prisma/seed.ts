import { db } from "~/lib/db.server";
import  faker from '@faker-js/faker';
import bcrypt from 'bcrypt'
import { Denomination, Role } from "@prisma/client";

//const roles: Role[] = ["ADMIN", "MEMBER"]
//type denoType = Omit<Denomination, "GENERAL">[];
const denominations:Denomination[]  = ["PAXROMANA",
  "CASA",
  "AGCM",
  "PENSA",
  "GESAM",
  "NUPSG",
  "NUAS",
    "NUBSCCF"]
  const categories: Denomination[]  = ["PAXROMANA",
  "CASA",
  "AGCM",
  "PENSA",
  "GESAM",
  "NUPSG",
  "NUAS",
      "NUBSCCF",
  "GENERAL"]
 



async function seed() {
   
    
   const saltRounds = 10;
 const salt = await bcrypt.genSalt(saltRounds);
 const hash = await bcrypt.hashSync('password', salt);
    //Create users 
    const admins = Array.from({ length: 10 }).map(() => ({
        email: faker.internet.email(),
        password: hash,
        name : faker.internet.userName(), 
        role: "ADMIN" as Role,
        avatar: faker.image.avatar(), 
        denomination: faker.helpers.randomize(denominations)
    }));

     const members = Array.from({ length: 40 }).map(() => ({
        email: faker.internet.email(),
         password: hash,
         name : faker.internet.userName(), 
        role: "MEMBER" as Role,
        denomination: faker.helpers.randomize(denominations)
     }));
    
        await db.user.createMany({
            data: members
       });
    
      
         await db.user.createMany({
            data: admins
         });
    
    const dbAdmins = await db.user.findMany({
        where: {
            role: "ADMIN"
        },
        select: {
            id: true
        }
    });

    const sanitizedAdmins = dbAdmins.map((item) => item.id);

    const announcements = Array.from({ length: 100 }).map(() => ({
        body: faker.lorem.paragraph(4),
        image: faker.image.people( 1000, 190, true),
        creatorId: faker.helpers.randomize(sanitizedAdmins),
        category: faker.helpers.randomize(categories),
        //denomination: faker.helpers.randomize(denominations)
     }));
    
        
        await db.announcement.createMany({
            data: announcements
         })
        
    
}

seed().catch((e) => {
    console.error(e);
    process.exit(1);
})