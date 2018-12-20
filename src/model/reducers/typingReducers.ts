import { TypingAction, Actions } from "../actions";
import { DEFAULT_STATE, ITypingState, Words } from '../store/typingState';

const MinimumLetterCountPerLesson = 120;
const MaximumLetterCountPerLine = 34;

export function typing(state = DEFAULT_STATE, action: TypingAction): ITypingState {
    switch (action.type) {
        case Actions.UpdateFocus: {
            return {
                ...state,
                hasFocus: action.hasFocus,
            };
        }

        case Actions.GenerateParagragh: {
            // Generate enough words so that the number of actual letters to type hits a minimum
            const words: string[] = [];
            let letterCount = 0;
            let lineLength = 0;
            while (letterCount < MinimumLetterCountPerLesson) {
                let word: string;
                // Check that this word won't cause an awkward line length where a space is the first letter on the next line,
                // If it does we need to pick a new word.
                do {
                    word = Words[Math.floor(Math.random() * Words.length)];
                } while (lineLength + word.length === MaximumLetterCountPerLine)

                lineLength += word.length + 1; // Plus one for the space
                if (lineLength > MaximumLetterCountPerLine) {
                    // Next line
                    lineLength = word.length + 1;
                }

                words.push(word);
                letterCount += word.length + 1;
            }

            return {
                ...state,
                typedKeys: "",
                typingStartTime: 0,
                keysHitCount: 0,
                keysMissCount: 0,
                paragraph: words.join(' '),
                isTypingComplete: false,
            };
        }

        case Actions.UpdateLastLetter: {
            const now = Date.now();

            let typedKeys = state.typedKeys;
            let keysHitCount = state.keysHitCount;
            let keysMissCount = state.keysMissCount;

            if (state.typingStartTime === 0) {
                state.typingStartTime = now;
            }

            if (action.letter === "Backspace") {
                typedKeys = typedKeys.substr(0, typedKeys.length - 1);
            } else if (action.letter.length === 1) {
                // Ignore spaces on the first letter, to prevent starting the timer after clearing the previous set of words
                if (typedKeys.length > 0 || action.letter !== " ") { 
                    typedKeys = typedKeys + action.letter;

                    if (action.letter === state.paragraph[typedKeys.length - 1]) {
                        keysHitCount++;
                    } else {
                        keysMissCount++;
                    }
                }
            }
            
            const accuracy = keysHitCount > 0 ? (keysHitCount / (keysHitCount + keysMissCount * 1.0)) * 100 : state.accuracy;
            
            const isTypingComplete = state.paragraph.length === typedKeys.length;

            let wordsStartTime = state.wordsStartTime;
            let wordsWPM = state.wordsWPM;
            if (typedKeys.length === 1 || 
                (typedKeys.length > 1 && (state.paragraph[typedKeys.length - 1] === " " || typedKeys.length === state.paragraph.length))) {
                let index = 0;
                let count = 0;
                for (let i = 0; i < typedKeys.length && i < state.paragraph.length; i++) {
                    if (state.paragraph[i] === " ") {
                        index++;
                        if (i < typedKeys.length - 1) {
                            count = 0;
                        }
                    } else {
                        count++;
                    }
                }

                if (typedKeys.length === state.paragraph.length) {
                    index++;
                }
                
                wordsStartTime = state.wordsStartTime.set(index, now);

                if (index > 0) {
                    const diff = now - state.wordsStartTime.get(index - 1);
                    const wpm = Math.floor(60 / (diff / 1000.0) * (count / 5.0));
                    wordsWPM = state.wordsWPM.set(index - 1, wpm);
                }
            }

            let wpm = state.wpm;
            if (typedKeys.length > 1) {
                const diff = now - state.typingStartTime;
                wpm = Math.floor(60 / (diff / 1000.0) * ((keysHitCount + keysMissCount)/ 5.0));
            }

            return {
                ...state,
                typedKeys,
                keysHitCount,
                keysMissCount,
                accuracy,
                wpm,
                wordsStartTime,
                wordsWPM,
                isTypingComplete,
            };
        }

        default:
            return state;
    }
}