import { ISettingsState } from './store/settingsState';
import { ITypingState } from './store/typingState';

export interface IAppState {
    settings: ISettingsState,
    typing: ITypingState,
}