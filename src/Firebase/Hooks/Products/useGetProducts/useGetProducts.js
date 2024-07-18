import {
  collection,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { db } from "../../../Config/Config";
import {
  GetDataPaginatedReducer,
  INITIAL_STATE,
} from "../../../Reducers/GetDataPaginatedReducer";
import { useCollectionCount } from "../../UseCollectionCount/useCollectionCount.jsx";

export const useGetProducts = ({
  size,
  orderByQueries = [{ field: "createdAt", direction: "desc" }],
  whereQueries = [],
  isDependantLoading,
}) => {
  if (orderByQueries.length === 0 || !orderByQueries) {
    orderByQueries = [{ field: "createdAt", direction: "desc" }];
  }
  const [products, dispach] = useReducer(
    GetDataPaginatedReducer,
    INITIAL_STATE
  );
  const ProductsCollection = collection(db, "Products");

  const memoOrderedByQueriesArray = useMemo(
    () => orderByQueries,
    [JSON.stringify(orderByQueries)]
  );
  const memoWhereQueries = useMemo(
    () => whereQueries,
    [JSON.stringify(whereQueries)]
  );

  const createQuery = () => {
    let q = query(ProductsCollection, limit(size));

    memoOrderedByQueriesArray.forEach(({ field, direction }) => {
      q = query(q, orderBy(field, direction));
    });

    memoWhereQueries.forEach(({ field, operator, value }) => {
      if (value) {
        q = query(q, where(field, operator, value));
      }
    });

    return q;
  };

  const [queryRef, setQueryRef] = useState(createQuery());
  useEffect(() => {
    setQueryRef(createQuery());
    dispach({ type: "PAGE_RESET" });
  }, [memoOrderedByQueriesArray, memoWhereQueries]);

  const HandleGetProducts = useCallback(async () => {
    if (
      !isDependantLoading &&
      !memoWhereQueries.find((query) => !query.value)
    ) {
      try {
        dispach({ type: "FETCH_START" });
        const res = await getDocs(queryRef);
        dispach({
          type: "FETCH_SUCCESS",
          payload: res.docs,
        });
      } catch (err) {
        dispach({
          type: "FETCH_ERROR",
          payload: err.message,
        });
      }
    } else {
      dispach({
        type: "FETCH_SUCCESS",
        payload: [],
      });
    }
  }, [queryRef]);

  useEffect(() => {
    HandleGetProducts();
  }, [HandleGetProducts]);

  const HandleGetNextPage = async () => {
    if (products.data.length > 0) {
      const lastVisible = products.data[products.data.length - 1];
      const nextQuery = query(
        createQuery(),
        startAfter(lastVisible),
        limit(size)
      );
      setQueryRef(nextQuery);
      dispach({ type: "NEXT_PAGE" });
    }
  };

  const HandleGetPreviousPage = async () => {
    if (products.data.length > 0) {
      const firstVisible = products.data[0];
      const prevQuery = query(
        createQuery(),
        endBefore(firstVisible),
        limitToLast(size)
      );
      setQueryRef(prevQuery);
      dispach({ type: "PREVIOUS_PAGE" });
    }
  };

  return {
    data: products.data.map((doc) => ({ ...doc.data(), id: doc.id })),
    error: products.error,
    loading: products.loading,
    HandleGetNextPage,
    HandleGetPreviousPage,
    page: products.page,
    count: useCollectionCount({
      collectionName: "Products",
      whereQueries,
      orderByQueries,
    }),
  };
};
