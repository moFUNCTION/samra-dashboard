import React, { useEffect, useReducer } from "react";
import {
  GetItemReducer,
  INITIAL_STATE,
} from "../../../Reducers/GetItemReducer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Config/Config";
export const useGetUser = ({ id }) => {
  const [user, dispach] = useReducer(GetItemReducer, INITIAL_STATE);
  const getUserData = async () => {
    try {
      dispach({
        type: "FETCH_START",
      });
      const userRef = doc(db, "Users", id);
      const userRes = await getDoc(userRef);
      dispach({
        type: "FETCH_SUCCESS",
        payload: userRes.data(),
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
        payload: err.code.message || err.message,
      });
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return user;
};
