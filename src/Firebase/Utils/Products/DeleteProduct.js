import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../Config/Config";
import { deleteObject, ref } from "firebase/storage";
import { GetProduct } from "./GetProduct";
export const DeleteProduct = async ({ productId }) => {
  try {
    const collection = "Products";
    const ProductRef = doc(db, collection, productId);
    const { images } = await GetProduct({ productId });
    await Promise.all(
      images.map(async (image) => {
        const imageRef = ref(storage, image.Path);
        const req = await deleteObject(imageRef);
        return req;
      })
    );
    const deleteReq = await deleteDoc(ProductRef);
    return deleteReq;
  } catch (err) {
    throw new Error(err.code || err);
  }
};
