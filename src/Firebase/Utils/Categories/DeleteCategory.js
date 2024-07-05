import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../Config/Config";
import { getCategory } from "./getCategory";
import { deleteObject, ref } from "firebase/storage";
export const DeleteCategory = async ({ categoryId }) => {
  try {
    const collection = "Categories";
    const categoryRef = doc(db, collection, categoryId);
    const { images } = await getCategory({ categoryId });
    await Promise.all(
      images.map(async (image) => {
        const imageRef = ref(storage, image.Path);
        const req = await deleteObject(imageRef);
        return req;
      })
    );
    const deleteReq = await deleteDoc(categoryRef);

    return deleteReq;
  } catch (err) {
    throw new Error(err.code || err);
  }
};
