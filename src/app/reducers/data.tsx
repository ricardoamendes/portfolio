const initialState = {
  list: [] as any,
  categories: [] as any
};

function data(state = initialState, action: any) {
  switch (action.type) {
    case "DATA_LIST_UPDATE_ALL":
      return {...state, list: action.data };
    case "DATA_GROUPING_CATEGORIES":
      let categories = [
          "All",
          "Android",
          "Web",
          "Hybrid",
          "Gaming"
      ];
      return {...state, categories };
    default:
        return state;
  }
}

export default data;
