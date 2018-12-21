import { SettingsAction, StatsAction, TypingAction } from "./actions";
import { ISettingsState } from "./store/settingsState";
import { IStatsState } from "./store/statsState";
import { ITypingState } from "./store/typingState";

export interface IAppState {
    settings: Readonly<ISettingsState>;
    typing: Readonly<ITypingState>;
    stats: Readonly<IStatsState>;
}

export type IAppActions= TypingAction | SettingsAction | StatsAction;
