import { ActionFunction } from "remix";
import { deleteAnnouncement } from "~/controllers/announcementController";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const Id = formData.get("button") as string;
  return deleteAnnouncement(Id);
};

export default function DeleteAnnouncement() {
  return null;
}
