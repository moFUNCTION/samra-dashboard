import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../Config/Config";
import { deleteObject, ref } from "firebase/storage";
import { GetEvent } from "./GetEvent";
export const DeleteEvent = async ({ eventId }) => {
  try {
    const collection = "Events";
    const EventRef = doc(db, collection, eventId);
    const { images } = await GetEvent({ eventId });
    await Promise.all(
      images.map(async (image) => {
        const imageRef = ref(storage, image.Path);
        const req = await deleteObject(imageRef);
        return req;
      })
    );
    const deleteReq = await deleteDoc(EventRef);

    return deleteReq;
  } catch (err) {
    throw new Error(err.code || err);
  }
};
