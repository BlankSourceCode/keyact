import { StatsAction, Actions } from "../actions";
import { DEFAULT_STATE, IStatsState } from "../store/statsState";

export function stats(state = DEFAULT_STATE, action: StatsAction): IStatsState {
    switch (action.type) {
        case Actions.UpdateStats: {
            let wpm = state.wpm.push(action.wpm);
            let accuracy = state.accuracy.push(action.accuracy);

            return {
                ...state,
                wpm,
                accuracy,
            };
        }

        default:
            return state;
    }
}