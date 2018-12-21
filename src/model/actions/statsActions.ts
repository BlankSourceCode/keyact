import * as Immutable from "immutable";
import { Actions } from ".";
import { ThunkAction } from 'redux-thunk';
import { IAppState } from '../state';
import { Dispatch } from 'react-redux';
import { DEFAULT_STATE, IStatsState } from '../store/statsState';

export interface IUpdateStatsAction {
    type: Actions.UpdateStats;
    wpm: number;
    accuracy: number;
}

export interface ILoadStatsAction {
    type: Actions.LoadStats;
    stats: IStatsState,
}
export interface ISaveStatsAction {
    type: Actions.SaveStats;
}

export type StatsAction = IUpdateStatsAction | ILoadStatsAction | ISaveStatsAction;

function updateStatsActionThunked(wpm: number, accuracy: number): IUpdateStatsAction {
    return {
        type: Actions.UpdateStats,
        wpm,
        accuracy,
    };
}

function loadStatsActionThunked(stats: IStatsState): ILoadStatsAction {
    return {
        type: Actions.LoadStats,
        stats,
    };
}

function saveStatsActionThunked(): ISaveStatsAction {
    return {
        type: Actions.SaveStats,
    };
}

export function updateStatsAction(): ThunkAction<void, IAppState, void, IUpdateStatsAction> {
    return (dispatch: Dispatch<any>, getState: () => IAppState) => {
        const wpm = getState().typing.wpm;
        const accuracy = getState().typing.accuracy;
        dispatch(updateStatsActionThunked(wpm, accuracy));
        dispatch(saveStatsAction() as any);
    };
}

export function loadStatsAction(): ThunkAction<void, IAppState, void, ILoadStatsAction> {
    return (dispatch: Dispatch<any>, _getState: () => IAppState) => {
        const loadedStats = window.localStorage.getItem("stats");
        let stats: IStatsState = DEFAULT_STATE;
        if (loadedStats) {
            try {
                stats = JSON.parse(loadedStats);

                stats.lessonStats = Immutable.List(stats.lessonStats);

            } catch {
                stats = DEFAULT_STATE;
            }
        }

        dispatch(loadStatsActionThunked(stats));
    };
}

export function saveStatsAction(): ThunkAction<void, IAppState, void, ISaveStatsAction> {
    return (dispatch: Dispatch<any>, getState: () => IAppState) => {
        const stats = getState().stats;
        window.localStorage.setItem("stats", JSON.stringify(stats));

        dispatch(saveStatsActionThunked());
    };
}
