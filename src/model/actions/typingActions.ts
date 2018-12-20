import { Actions, updateStatsAction } from ".";
import { Dispatch } from 'react-redux';
import { ThunkAction } from "redux-thunk";
import { IAppState } from '../state';

export interface IUpdateFocusAction {
    type: Actions.UpdateFocus;
    hasFocus: boolean;
}

export interface IGenerateParagraphAction {
    type: Actions.GenerateParagraph;
    dictionary: string[];
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

function generateParagraphActionThunked(dictionary: string[]): IGenerateParagraphAction {
    return {
        type: Actions.GenerateParagraph,
        dictionary,
    };
}

export function generateParagraphAction(): ThunkAction<void, IAppState, void, IGenerateParagraphAction> {
    return (dispatch: Dispatch<any>, getState: () => IAppState) => {
        const dictionary = getState().settings.dictionary;

        if (getState().typing.paragraph.length > 0) {
            dispatch(updateStatsAction() as any);
        }
        
        dispatch(generateParagraphActionThunked(dictionary));
    };
}

export function updateLastLetterAction(letter: string): IUpdateLastLetterAction {
    return {
        type: Actions.UpdateLastLetter,
        letter,
    };
}

