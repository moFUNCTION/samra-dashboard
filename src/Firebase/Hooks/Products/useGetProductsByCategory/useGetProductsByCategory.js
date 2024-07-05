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
export const useGetProductsByCategory = ({ size, categoryId }) => {
  const [products, dispach] = useReducer(
    GetDataPaginatedReducer,
    INITIAL_STATE
  );
  const ProductsCollection = collection(db, "Products");
  const [queryRef, setQueryRef] = useState(
    query(
      ProductsCollection,
      orderBy("createdAt", "desc"),
      limit(size),
      where("categoryId", "==", categoryId)
    )
  );
  const HandleGetProducts = async () => {
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
    HandleGetProducts();
  }, [queryRef]);
  useEffect(() => {
    setQueryRef(
      query(
        ProductsCollection,
        orderBy("createdAt", "desc"),
        limit(size),
        where("categoryId", "==", categoryId)
      )
    );
    dispach({
      type: "PAGE_RESET",
    });
  }, []);
  const HandleGetNextPage = () => {
    setQueryRef(
      query(
        ProductsCollection,
        orderBy("createdAt", "desc"),
        limit(size),
        startAfter(products.data[products.data.length - 1]),
        where("categoryId", "==", categoryId)
      )
    );
    dispach({
      type: "NEXT_PAGE",
    });
  };
  const HandleGetPreviousPage = () => {
    setQueryRef(
      query(
        ProductsCollection,
        orderBy("createdAt", "desc"),
        endBefore(products.data[0]),
        limitToLast(size),
        where("categoryId", "==", categoryId)
      )
    );
    dispach({
      type: "PREVIOUS_PAGE",
    });
  };
  return {
    data: products.data.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }),
    error: products.error,
    loading: products.loading,
    HandleGetNextPage,
    HandleGetPreviousPage,
    page: products.page,
  };
};
