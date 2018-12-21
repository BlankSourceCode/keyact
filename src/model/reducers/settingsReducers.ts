import { Actions, SettingsAction } from "../actions";
import { DEFAULT_STATE, ISettingsState } from "../store/settingsState";

export function settings(state = DEFAULT_STATE, action: SettingsAction): ISettingsState {
    switch (action.type) {
        case Actions.DictionaryChanged:
            return {
                ...state,
                dictionary: action.dictionary,
            };

        default:
            return state;
    }
}
