import * as Immutable from "immutable";

export interface ILessonStats {
    accuracy: number;
    wpm: number;
}

export interface IStatsState {
    lessonStats: Immutable.List<ILessonStats>;
    version: number;
}

export const DEFAULT_STATE: IStatsState = {
    lessonStats: Immutable.List([]),
    version: 0,
};
