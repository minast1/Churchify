 import {unstable_parseMultipartFormData,} from "remix";
import { bucket } from "./firebase";
import type { Readable } from "stream";
import { Denomination, Role } from "@prisma/client";
import { registerAdmin } from "~/controllers/adminController";

type UploadHandlerArgs = {
    name: string;
  stream: Readable;
    filename: string;
  encoding: string;
  mimetype: string;
}



const uploadHandler = async ({encoding, stream, mimetype,filename}: UploadHandlerArgs) => {
  if (filename.length > 0) {
    // Get the file as a buffer
      const chunks: Buffer[]  = [];
      for await (const chunk of stream) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);
    const timestamp = new Date().getTime();
  const extension = filename.split('.').pop();
  
     const fName = `${timestamp}.${extension}`;
    const instance = await bucket.file(`avatars/${fName}`);
    await instance.save(buffer);
    // Add the known content type to the file
    await instance.setMetadata({
      "Content-Type": mimetype,
      "Content-Encoding": encoding,
    }); 

     // Make the file publicly readable - maintain other permissions
    // https://googleapis.dev/nodejs/storage/latest/File.html#makePublic
    await instance.makePublic();
     // Return the public URL
    return instance.publicUrl();

  }

  return ; 
  }
    

export async function uploadAvatar(request: Request) {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const avatar = formData.get("avatar") as string | null;
  
   const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as Role;
    const denomination = formData.get("denomination") as Denomination;
  //file is the url to be saved to the database.... Pronto.!
  return  await registerAdmin({avatar, name, email, password, role, denomination});
}