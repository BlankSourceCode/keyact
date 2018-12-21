import * as Immutable from "immutable";

export interface ITypingState {
    accuracy: number;
    hasFocus: boolean;
    isTypingComplete: boolean;
    keysHitCount: number;
    keysMissCount: number;
    paragraph: string;
    typedKeys: string;
    typingStartTime: number;
    wordsCorrection: Immutable.List<number>;
    wordsStartTime: Immutable.List<number>;
    wordsWPM: Immutable.List<number>;
    wpm: number;
}

export const DEFAULT_STATE: ITypingState = {
    accuracy: 100,
    hasFocus: false,
    isTypingComplete: false,
    keysHitCount: 0,
    keysMissCount: 0,
    paragraph: "",
    typedKeys: "",
    typingStartTime: 0,
    wordsCorrection: Immutable.List([]),
    wordsStartTime: Immutable.List([]),
    wordsWPM: Immutable.List([]),
    wpm: 0,
};
