import { Actions } from ".";

export interface IDictionaryChangedAction {
    type: Actions.DictionaryChanged;
    dictionary: string[];
}


export type SettingsAction = IDictionaryChangedAction;

export function setDictionaryAction(dictionary: string[]): IDictionaryChangedAction {
    return {
        type: Actions.DictionaryChanged,
        dictionary
    };
}
