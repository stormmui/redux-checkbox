import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from "redux-form";
import {filesByDatadir, selectedDatadir} from './reducers'

const rootReducer = combineReducers({
  filesByDatadir,
  selectedDatadir,
  form: reduxFormReducer // mounted under "form"
});

export default rootReducer;
