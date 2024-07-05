import React, { useEffect, useReducer } from "react";
import {
  GetItemReducer,
  INITIAL_STATE,
} from "../../../Reducers/GetItemReducer";
import { Product } from "../../../Utils/Products/Product";
export const useGetProduct = ({ id }) => {
  const [product, dispach] = useReducer(GetItemReducer, INITIAL_STATE);
  const getProductData = async () => {
    try {
      dispach({
        type: "FETCH_START",
      });
      const product_init = new Product({});
      const product_res = await product_init.get({ id });
      dispach({
        type: "FETCH_SUCCESS",
        payload: product_res,
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
        payload: err.code.message || err.message,
      });
    }
  };
  useEffect(() => {
    getProductData();
  }, [id]);
  return product;
};
