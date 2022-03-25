import { User } from '@prisma/client';
import bcrypt from 'bcrypt'
import { db } from '~/lib/db.server';

type Credentials = {
    email: string
    password: string
}


export const login = async (credentials:Credentials) => {
    
    const memberUser: User | null = await db.user.findFirst({
        where: { email: credentials.email }
    });
    if (!memberUser) {
        throw new Error("These credentials are not valid");
    }
    
    const crosscheckPassword = await bcrypt.compareSync(credentials.password, memberUser.password);

    if (crosscheckPassword) {
        const { password, ...rest } = memberUser;
        return rest
    } else {
        throw new Error("Password is Invalid")
    }
    
}

export const confirmEmailExists = async (email: string) => {
    return await db.user.findFirst({
        where: { email: email }
    });
    
}

type memberFormData = Omit<User, "id"|"avatar">
export const register = async (formData: memberFormData) => {
    const emailExists = await confirmEmailExists(formData.email);
    if (emailExists) {
        throw new Error("This email already exists")
    }
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
            avatar: null
        }
    });
    const { password, ...rest } = user;
    return rest
}