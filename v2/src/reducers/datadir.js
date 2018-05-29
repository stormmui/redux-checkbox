import {
  SELECT_DATADIR
} from "../actions";

export function selectedDatadir(state = "data2", action) {
  switch (action.type) {
    case SELECT_DATADIR:
      return action.datadir;
    default:
      return state;
  }
}
