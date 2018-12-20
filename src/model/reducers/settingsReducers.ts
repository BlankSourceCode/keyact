import { SettingsAction, Actions } from "../actions";
import { DEFAULT_STATE, ISettingsState } from "../store/settingsState";

export function settings(state = DEFAULT_STATE, action: SettingsAction): ISettingsState {
    switch (action.type) {
        case Actions.AlphabetChanged:
            return {
                ...state,
            };

        default:
            return state;
    }
}