import { useEffect, useReducer } from "react";
import { GetUserDataReducer, INITIAL_STATE } from "./Reducer/GetUserReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Config/Config";
import { getDoc, doc } from "firebase/firestore";
import localforage from "localforage";
localforage.config({
  driver: localforage.INDEXEDDB, // Force IndexedDB; same as using setDriver()
  name: "firebaseLocalStorageDb", // This is the default name used by Firebase Auth
  version: 1.0,
  storeName: "firebaseLocalStorage", // This is the default object store name used by Firebase Auth
  description: "Firebase Auth local storage",
});
export const useAuth = () => {
  const [user, dispach] = useReducer(GetUserDataReducer, INITIAL_STATE);
  const GetUserAditionalData = async (user) => {
    try {
      const User_Doc = doc(db, "Employers", user.uid);
      const UserData_res = await getDoc(User_Doc);
      dispach({
        type: "FETCH_SUCCESS",
        paylaod: Object.assign(user, UserData_res.data()),
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
      });
    }
  };
  const GetUserData = (user) => {
    dispach({
      type: "FETCH_START",
    });
    if (user) {
      GetUserAditionalData(user);
    } else {
      dispach({
        type: "FETCH_SUCCESS",
        paylaod: undefined,
      });
    }
  };
  const HandleError = () => {
    dispach({
      type: "FETCH_ERROR",
    });
  };
  const HandleRender = () => {
    dispach({
      type: "FETCH_RENDER",
    });
  };
  const clearFirebaseAuthData = async () => {
    try {
      // List all keys in the Firebase Auth store
      const keys = await localforage.keys();

      // Iterate over keys and remove those related to Firebase Auth
      for (const key of keys) {
        if (key.startsWith("firebase:authUser")) {
          await localforage.removeItem(key);
          console.log(`Removed key: ${key}`);
        }
      }

      console.log("Firebase Auth data cleared successfully.");
    } catch (error) {
      console.error("Error clearing Firebase Auth data:", error);
    }
  };
  useEffect(() => {
    if (!auth.currentUser) {
      const unSubscribe = onAuthStateChanged(auth, GetUserData, HandleError);
      return async () => {
        unSubscribe();
        // await clearFirebaseAuthData();
      };
    } else {
      GetUserData(auth.currentUser);
    }
  }, [user.render]);
  return { user, HandleRender };
};
