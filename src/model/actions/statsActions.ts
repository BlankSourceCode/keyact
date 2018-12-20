import { Actions } from ".";
import { ThunkAction } from 'redux-thunk';
import { IAppState } from '../state';
import { Dispatch } from 'react-redux';

export interface IUpdateStatsAction {
    type: Actions.UpdateStats;
    wpm: number;
    accuracy: number;
}

export type StatsAction = IUpdateStatsAction;

function updateStatsActionThunked(wpm: number, accuracy: number): IUpdateStatsAction {
    return {
        type: Actions.UpdateStats,
        wpm,
        accuracy,
    };
}

export function updateStatsAction(): ThunkAction<void, IAppState, void, IUpdateStatsAction> {
    return (dispatch: Dispatch<any>, getState: () => IAppState) => {
        const wpm = getState().typing.wpm;
        const accuracy = getState().typing.accuracy;
        dispatch(updateStatsActionThunked(wpm, accuracy));
    };
}
