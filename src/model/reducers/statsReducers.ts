import { StatsAction, Actions } from "../actions";
import { DEFAULT_STATE, IStatsState } from "../store/statsState";

export function stats(state = DEFAULT_STATE, action: StatsAction): IStatsState {
    switch (action.type) {
        case Actions.UpdateStats: {
            let lessonStats = state.lessonStats.push({
                wpm: action.wpm,
                accuracy: action.accuracy,
            });

            return {
                ...state,
                lessonStats,
            };
        }

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

        default:
            return state;
    }
}