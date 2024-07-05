import React, { useEffect, useReducer } from "react";
import {
  GetDataReducer,
  INITIAL_STATE,
} from "../../../Reducers/GetDataReducer";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../Config/Config";
export const useGetEvents = () => {
  const [events, dispach] = useReducer(GetDataReducer, INITIAL_STATE);
  const GetEvents = () => {
    const eventsCollection = collection(db, "Events");
    const q = query(eventsCollection, orderBy("createdAt", "desc"));
    dispach({
      type: "FETCH_START",
    });
    onSnapshot(
      q,
      (res) => {
        dispach({
          type: "FETCH_SUCCESS",
          payload: res.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          }),
        });
      },
      (err) => {
        dispach({
          type: "FETCH_ERROR",
          payload: err.code.message || err.message,
        });
      }
    );
  };
  useEffect(() => {
    GetEvents();
  }, []);
  return events;
};
