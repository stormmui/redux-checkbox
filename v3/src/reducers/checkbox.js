import { TOGGLE_CHECKBOX } from "../actions";

export const checkbox = (state = {}, action) => {
  switch (action.type) {
    case ADD_CHECKBOX:
      console.log("Reducer checkbox ", action.datadir);
    default:
      return state;
  }
};
