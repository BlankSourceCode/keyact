import { Actions, StatsAction } from "../actions";
import { DEFAULT_STATE, IStatsState } from "../store/statsState";

export function stats(state = DEFAULT_STATE, action: StatsAction): IStatsState {
    switch (action.type) {

        case Actions.LoadStats: {
            return {
                ...action.stats,
            };
        }

        case Actions.SaveStats: {
            return {
                ...state,
            };
        }

        case Actions.UpdateStats: {
            const lessonStats = state.lessonStats.push({
                accuracy: action.accuracy,
                wpm: action.wpm,
            });

            return {
                ...state,
                lessonStats,
            };
        }

        default:
            return state;
    }
}
