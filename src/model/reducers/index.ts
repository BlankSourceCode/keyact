import { IAppState } from "../state";
import { combineReducers, Reducer } from "redux";
import { ISettingsState } from "../store/settingsState";
import { settings } from "./settingsReducers";
import { typing } from "./typingReducers";
import { ITypingState } from '../store/typingState';

export const reducers = combineReducers<IAppState>({
    settings: settings as Reducer<ISettingsState>,
    typing: typing as Reducer<ITypingState>,
});
