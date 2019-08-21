import { combineReducers } from "redux";
import { PhonesState } from "./phones/phones.reducers";
import phonesReducer from "./phones";

export interface AppState {
  phones: PhonesState;
}

export default combineReducers<AppState>({
  phones: phonesReducer
});
