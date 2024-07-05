import { useEffect, useReducer } from "react";
import { GetUserDataReducer, INITIAL_STATE } from "./Reducer/GetUserReducer";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Config/Config";
import { getDoc, doc } from "firebase/firestore";
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
  useEffect(() => {
    if (!auth.currentUser) {
      const unSubscribe = onAuthStateChanged(auth, GetUserData, HandleError);
      return () => {
        unSubscribe();
        HandleError();
      };
    } else {
      GetUserData(auth.currentUser);
    }
  }, [user.render]);
  return { user, HandleRender };
};
