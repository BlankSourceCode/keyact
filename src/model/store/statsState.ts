export interface IStatsState {
    wpm: number;
    accuracy: number;
}

export const DEFAULT_STATE: IStatsState = {
    wpm: 0,
    accuracy: 0,
};