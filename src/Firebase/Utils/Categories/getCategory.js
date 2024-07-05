import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/Config";

export const getCategory = async ({ categoryId }) => {
  try {
    const collection = "Categories";
    const categoryRef = doc(db, collection, categoryId);
    const categoryRes = await getDoc(categoryRef);
    if (!categoryRes.exists()) {
      throw new Error("هذا الصنف ليس موجود لتحديثه");
    }
    return { ...categoryRes.data(), id: categoryRef.id };
  } catch (err) {
    throw new Error(err.code || err);
  }
};
