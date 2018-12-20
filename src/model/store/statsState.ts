import * as Immutable from "immutable";

export interface IStatsState {
    wpm: Immutable.List<number>;
    accuracy: Immutable.List<number>;
}

export const DEFAULT_STATE: IStatsState = {
    wpm: Immutable.List([]),
    accuracy: Immutable.List([]),
};