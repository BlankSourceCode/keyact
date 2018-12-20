export enum Actions {
    DictionaryChanged = "DICTIONARY_CHANGED",
    UpdateFocus = "UPDATE_FOCUS",
    UpdateLastLetter = "UPDATE_LAST_LETTER",
    GenerateParagraph = "GENERATE_PARAGRAPH",
    UpdateStats = "UPDATE_STATS",
}

export {
    TypingAction,
    updateFocusAction,
    generateParagraphAction,
    updateLastLetterAction,
} from "./typingActions";

export {
    SettingsAction,
    setDictionaryAction,
} from "./settingsActions";

export {
    StatsAction,
    updateStatsAction,
} from "./statsActions";
