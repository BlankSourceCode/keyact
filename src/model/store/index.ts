import { createStore } from "redux";
import { reducers } from "../reducers";
import { IAppState } from "../state";

const store = createStore<IAppState, any, any, any>(reducers);

export default store;