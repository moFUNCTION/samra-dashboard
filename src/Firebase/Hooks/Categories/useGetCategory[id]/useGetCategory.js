import React, { useEffect, useReducer } from "react";
import {
  GetItemReducer,
  INITIAL_STATE,
} from "../../../Reducers/GetItemReducer";
import { Category } from "../../../Utils/Categories/Category";
export const useGetCategory = ({ id }) => {
  const [category, dispach] = useReducer(GetItemReducer, INITIAL_STATE);
  const getCategoryData = async () => {
    try {
      dispach({
        type: "FETCH_START",
      });
      const category_init = new Category({});
      const category_res = await category_init.get({ id });
      dispach({
        type: "FETCH_SUCCESS",
        payload: category_res,
      });
    } catch (err) {
      dispach({
        type: "FETCH_ERROR",
        payload: err.code.message || err.message,
      });
    }
  };
  useEffect(() => {
    getCategoryData();
  }, []);
  return category;
};
