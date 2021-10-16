const initState = {
  productList: []
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD":
      return { productList: [...state.productList, action.payload] };

    case "TOTAL":
      let values = action.payload.map((p) => state.total + p.value);
      return { ...state, total: values[values.length - 1] };

    default:
      return state;
  }
};
