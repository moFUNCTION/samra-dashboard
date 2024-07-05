import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/Config";

export const GetEvent = async ({ eventId }) => {
  try {
    const collection = "Events";
    const EventRef = doc(db, collection, eventId);
    const EventRes = await getDoc(EventRef);
    if (!EventRes.exists()) {
      throw new Error("هذا الصنف ليس موجود لتحديثه");
    }
    return { ...EventRes.data(), id: EventRef.id };
  } catch (err) {
    throw new Error(err.code || err);
  }
};
