import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/Config";

export const GetProduct = async ({ productId }) => {
  try {
    const collection = "Products";
    const productRef = doc(db, collection, productId);
    const productRes = await getDoc(productRef);
    if (!productRes.exists()) {
      throw new Error("هذا الصنف ليس موجود لتحديثه");
    }
    return { ...productRes.data(), id: productRes.id };
  } catch (err) {
    throw new Error(err.code || err);
  }
};
