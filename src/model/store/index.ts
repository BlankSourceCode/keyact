import { applyMiddleware, createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { reducers } from "../reducers";
import { IAppActions, IAppState } from "../state";

const store = createStore<IAppState, any, any, any>(
    reducers,
    applyMiddleware(thunk as ThunkMiddleware<IAppState, IAppActions>));

export default store;
