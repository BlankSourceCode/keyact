import { ISettingsState } from './store/settingsState';
import { ITypingState } from './store/typingState';
import { IStatsState } from './store/statsState';
import { TypingAction, SettingsAction, StatsAction } from './actions';

export interface IAppState {
    settings: Readonly<ISettingsState>,
    typing: Readonly<ITypingState>,
    stats: Readonly<IStatsState>,
}

export type IAppActions= TypingAction | SettingsAction | StatsAction;