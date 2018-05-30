import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import { filesByDatadir } from "./files";
import { selectedDatadir, datadirs } from "./datadir";

const rootReducer = combineReducers({
  datadirs,
  filesByDatadir,
  selectedDatadir,
  form: reduxFormReducer // mounted under "form"
});

export default rootReducer;
