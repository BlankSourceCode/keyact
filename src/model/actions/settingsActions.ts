import { Actions } from ".";

export interface IAlphabetChangedAction {
    type: Actions.AlphabetChanged;
    key: string
}


export type SettingsAction = IAlphabetChangedAction;

export function setAlphabetAction(key: string): IAlphabetChangedAction {
    return {
        type: Actions.AlphabetChanged,
        key
    };
}
