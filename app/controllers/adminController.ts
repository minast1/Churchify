import { User } from '@prisma/client';
import bcrypt from 'bcrypt'
import { db } from '~/lib/db.server';

type Credentials = {
    email: string
    password: string
}


export const adminlogin = async (credentials:Credentials) => {
    
    const adminUser: User | null = await db.user.findFirst({
        where: { email: credentials.email }
    });
    if (!adminUser) {
        throw new Error("These credentials are not valid");
    }
    
      if ( adminUser.role === "MEMBER") {
        throw new Error("Only admin Users are allowed here")
      }
         
    const crosscheckPassword = await bcrypt.compareSync(credentials.password, adminUser.password);

    if (crosscheckPassword) {
        const { password, ...rest } = adminUser;
        return rest
    } else {
        throw new Error("Password is Invalid")
    }
    
    }
   
   

/*export const confirmEmailExists = async (email: string) => {
    return await db.user.findFirst({
        where: { email: email }
    });
    
}
*/

export const registerAdmin = async (formData: Omit<User, "id">) => {
   /* const emailExists = await confirmEmailExists(formData.email);
    if (emailExists) {
        throw new Error("This email already exists")
    }*/
     const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = bcrypt.hashSync(formData.password, salt);
    const user:User = await db.user.create({
        data: {
            name: formData.name,
            email: formData.email,
            password: hash,
            denomination: formData.denomination,
            role: formData.role,
            avatar: formData.avatar && formData.avatar
        }
    });
    const { password, ...rest } = user;
    return rest
}