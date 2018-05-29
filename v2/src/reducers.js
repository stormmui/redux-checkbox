import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

import {
  SELECT_DATADIR,
  INVALIDATE_DATADIR,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from "./actions";

function selectedDatadir(state = "data2", action) {
  switch (action.type) {
    case SELECT_DATADIR:
      return action.datadir;
    default:
      return state;
  }
}

function files(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_DATADIR:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.files,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function filesByDatadir(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_DATADIR:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.datadir]: files(state[action.datadir], action)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  filesByDatadir,
  selectedDatadir,
  form: reduxFormReducer // mounted under "form"
});

export default rootReducer;
