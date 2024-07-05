import {
  collection,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useReducer, useState } from "react";
import { db } from "../../../Config/Config";
import {
  GetDataPaginatedReducer,
  INITIAL_STATE,
} from "../../../Reducers/GetDataPaginatedReducer";
export const useGetCategories = ({ size }) => {
  const [categories, dispach] = useReducer(
    GetDataPaginatedReducer,
    INITIAL_STATE
  );
  const categoriesCollection = collection(db, "Categories");
  const [queryRef, setQueryRef] = useState(
    query(categoriesCollection, orderBy("createdAt", "desc"), limit(size))
  );
  const HandleGetCategories = async () => {
    dispach({
      type: "FETCH_START",
    });
    onSnapshot(
      queryRef,
      (res) => {
        dispach({
          type: "FETCH_SUCCESS",
          payload: res.docs,
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
    HandleGetCategories();
  }, [queryRef]);
  useEffect(() => {
    setQueryRef(
      query(categoriesCollection, orderBy("createdAt", "desc"), limit(size))
    );
    dispach({
      type: "PAGE_RESET",
    });
  }, []);
  const HandleGetNextPage = () => {
    setQueryRef(
      query(
        categoriesCollection,
        orderBy("createdAt", "desc"),
        limit(size),
        startAfter(categories.data[categories.data.length - 1])
      )
    );
    dispach({
      type: "NEXT_PAGE",
    });
  };
  const HandleGetPreviousPage = () => {
    setQueryRef(
      query(
        categoriesCollection,
        orderBy("createdAt", "desc"),
        endBefore(categories.data[0]),
        limitToLast(size)
      )
    );
    dispach({
      type: "PREVIOUS_PAGE",
    });
  };
  return {
    data: categories.data.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }),
    error: categories.error,
    loading: categories.loading,
    HandleGetNextPage,
    HandleGetPreviousPage,
    page: categories.page,
  };
};
