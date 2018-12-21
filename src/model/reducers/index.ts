import { combineReducers, Reducer } from "redux";
import { IAppState } from "../state";
import { ISettingsState } from "../store/settingsState";
import { IStatsState } from "../store/statsState";
import { ITypingState } from "../store/typingState";
import { settings } from "./settingsReducers";
import { stats } from "./statsReducers";
import { typing } from "./typingReducers";

export const reducers = combineReducers<IAppState>({
    settings: settings as Reducer<ISettingsState>,
    stats: stats as Reducer<IStatsState>,
    typing: typing as Reducer<ITypingState>,
});
