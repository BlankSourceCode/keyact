import * as Immutable from "immutable";

export interface ILessonStats {
    wpm: number;
    accuracy: number;
}

export interface IStatsState {
    version: number;
    lessonStats: Immutable.List<ILessonStats>;
}

export const DEFAULT_STATE: IStatsState = {
    version: 0,
    lessonStats: Immutable.List([]),
};