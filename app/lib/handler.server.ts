import {unstable_parseMultipartFormData,} from "remix";
import { bucket } from "./firebase";
import type { Readable } from "stream";
import { addAnnouncement } from "~/controllers/announcementController";
import { Denomination } from "@prisma/client";

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
    const chunks: Buffer[] = [];
    for await (const chunk of stream) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);
    const timestamp = new Date().getTime();
    const extension = filename.split('.').pop();
    const fName = `${timestamp}.${extension}`;
    const instance = await bucket.file(`announcements/${fName}`);
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
  return;
}

export async function uploadImage(request: Request) {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const image = formData.get("image")as string
  const body =  formData.get("body")as string
    const creatorId = formData.get("creatorId")as string
  const category = formData.get("category")as Denomination
     //console.log(file)
  return await addAnnouncement({image, body, creatorId, category})
}