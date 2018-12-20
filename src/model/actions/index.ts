export enum Actions {
    AlphabetChanged = "ALPHABET_CHANGED",
    UpdateFocus = "UPDATE_FOCUS",
    UpdateLastLetter = "UPDATE_LAST_LETTER",
    GenerateParagragh = "GENERATE_PARAGRAPH"
}

export {
    TypingAction,
    updateFocusAction,
    generateParagraphAction,
    updateLastLetterAction,
} from "./typingActions";

export {
    SettingsAction,
    setAlphabetAction,
} from "./settingsActions";