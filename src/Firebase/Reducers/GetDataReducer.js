export const INITIAL_STATE = {
  loading: true,
  error: undefined,
  data: [],
};
export const GetDataReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        error: undefined,
        data: [],
      };
    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: undefined,
        data: action.payload,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        error: action.payload,
        data: [],
      };
  }
};
