import * as Immutable from "immutable";

export interface ITypingState {
    hasFocus: boolean;
    paragraph: string;
    typedKeys: string;
    keysHitCount: number;
    keysMissCount: number;
    wpm: number;
    accuracy: number;
    wordsWPM: Immutable.List<number>;
    wordsStartTime: Immutable.List<number>;
    wordsCorrection: Immutable.List<number>;
    typingStartTime: number;
    isTypingComplete: boolean;
}

export const DEFAULT_STATE: ITypingState = {
    hasFocus: false,
    paragraph: "",
    typedKeys: "",
    keysHitCount: 0,
    keysMissCount: 0,
    wpm: 0,
    accuracy: 100,
    wordsWPM: Immutable.List([]),
    wordsStartTime: Immutable.List([]),
    wordsCorrection: Immutable.List([]),
    typingStartTime: 0,
    isTypingComplete: false,
};