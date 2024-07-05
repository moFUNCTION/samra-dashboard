import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useReducer } from "react";
import { db } from "../../Config/Config";
import {
  GetCollectionCountReducer,
  INITIAL_STATE,
} from "./Reducer/GetCollectionCountReducer";
export const useCollectionCount = ({ collectionName, GetQuery }) => {
  const queryArray = GetQuery?.split(" ");
  const [collectionData, dispach] = useReducer(
    GetCollectionCountReducer,
    INITIAL_STATE
  );
  const GetCollectionData = async () => {
    const collectionRef = collection(db, collectionName);
    let q;
    if (queryArray && GetQuery) {
      q = query(
        collectionRef,
        where(queryArray[0], queryArray[1], queryArray[2])
      );
    } else {
      q = query(collectionRef);
    }

    try {
      dispach({
        type: "FETCH_START",
      });
      const CollectionCount = await getCountFromServer(q);
      dispach({
        type: "FETCH_SUCCESS",
        payload: CollectionCount.data().count,
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
      });
    }
  };
  useEffect(() => {
    GetCollectionData();
  }, [GetQuery]);
  return collectionData;
};
