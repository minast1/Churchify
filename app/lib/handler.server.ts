import {unstable_parseMultipartFormData,} from "remix";
import { bucket } from "./firebase";
import type { Readable } from "stream";

type UploadHandlerArgs = {
    name: string;
  stream: Readable;
    filename: string;
  encoding: string;
  mimetype: string;
}
const uploadHandler = async ({encoding, stream, mimetype,filename}: UploadHandlerArgs) => {
   
    // Get the file as a buffer
      const chunks: Buffer[]  = [];
      for await (const chunk of stream) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);
    const timestamp = new Date().getTime();
    const extension = filename.split('.').pop();
    const fName = `${timestamp}.${extension}`;
    const instance = await bucket.file(`/announcements/${fName}`);
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

export async function uploadImage(request: Request) {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

    const file = formData.get("image");
     console.log(file)
  //file is the url to be saved to the database.... Pronto.!
  return file;
}