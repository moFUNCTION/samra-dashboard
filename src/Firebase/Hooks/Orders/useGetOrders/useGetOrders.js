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
import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
  useTransition,
} from "react";
import { db } from "../../../Config/Config";
import {
  GetDataPaginatedReducer,
  INITIAL_STATE,
} from "../../../Reducers/GetDataPaginatedReducer";
export const useGetOrders = ({ size, status = "pending" }) => {
  const [Orders, dispach] = useReducer(GetDataPaginatedReducer, INITIAL_STATE);
  const OrdersCollection = collection(db, "Orders");
  const [queryRef, setQueryRef] = useState(
    query(
      OrdersCollection,
      orderBy("createdAt", "desc"),
      where("status", "==", status),
      limit(size)
    )
  );
  const HandleGetOrders = useCallback(async () => {
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
  }, [queryRef]);

  useEffect(() => {
    HandleGetOrders();
  }, [HandleGetOrders]);
  useEffect(() => {
    setQueryRef(
      query(
        OrdersCollection,
        orderBy("createdAt", "desc"),
        where("status", "==", status),
        limit(size)
      )
    );
    dispach({
      type: "PAGE_RESET",
    });
  }, []);
  const HandleGetNextPage = useCallback(() => {
    setQueryRef(
      query(
        OrdersCollection,
        orderBy("createdAt", "desc"),
        where("status", "==", status),
        limit(size),
        startAfter(Orders.data[Orders.data.length - 1])
      )
    );
    dispach({
      type: "NEXT_PAGE",
    });
  }, [JSON.stringify(Orders.data), size, status]);
  const HandleGetPreviousPage = useCallback(() => {
    setQueryRef(
      query(
        OrdersCollection,
        orderBy("createdAt", "desc"),
        where("status", "==", status),
        endBefore(Orders.data[0]),
        limitToLast(size)
      )
    );
    dispach({
      type: "PREVIOUS_PAGE",
    });
  }, [JSON.stringify(Orders.data), size, status]);

  const HandleReset = useCallback(() => {
    setQueryRef(
      query(
        OrdersCollection,
        orderBy("createdAt", "desc"),
        where("status", "==", status),
        limit(size)
      )
    );
    dispach({
      type: "PAGE_RESET",
    });
  }, []);
  return {
    data: Orders.data.map((doc) => {
      return { ...doc.data(), id: doc.id };
    }),
    error: Orders.error,
    loading: Orders.loading,
    HandleGetNextPage,
    HandleGetPreviousPage,
    page: Orders.page,
    HandleReset,
  };
};
