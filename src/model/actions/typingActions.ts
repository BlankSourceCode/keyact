import { Actions } from ".";

export interface IUpdateFocusAction {
    type: Actions.UpdateFocus;
    hasFocus: boolean;
}

export interface IGenerateParagraphAction {
    type: Actions.GenerateParagragh;
}

export interface IUpdateLastLetterAction {
    type: Actions.UpdateLastLetter;
    letter: string;
}

export type TypingAction = IUpdateFocusAction | IGenerateParagraphAction | IUpdateLastLetterAction;

export function updateFocusAction(hasFocus: boolean): IUpdateFocusAction {
    return {
        type: Actions.UpdateFocus,
        hasFocus,
    };
}

export function generateParagraphAction(): IGenerateParagraphAction {
    return {
        type: Actions.GenerateParagragh,
    };
}

export function updateLastLetterAction(letter: string): IUpdateLastLetterAction {
    return {
        type: Actions.UpdateLastLetter,
        letter,
    };
}

