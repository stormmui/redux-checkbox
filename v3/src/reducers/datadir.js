import { SELECT_DATADIR, ADD_DATADIR } from "../actions";

export function selectedDatadir(state = 'data2', action) {
  switch (action.type) {
    case SELECT_DATADIR:
      return action.datadir;
    default:
      return state;
  }
}

export const datadirs = (state = ['data2','data3'], action) => {
  switch (action.type) {
    case ADD_DATADIR:
      return [...state, action.datadir];
    default:
      return state;
  }
};
