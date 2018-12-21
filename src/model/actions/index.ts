export enum Actions {
    DictionaryChanged = "DICTIONARY_CHANGED",
    UpdateFocus = "UPDATE_FOCUS",
    UpdateLastLetter = "UPDATE_LAST_LETTER",
    GenerateNewLesson = "GENERATE_PARAGRAPH",
    UpdateStats = "UPDATE_STATS",
    LoadStats = "LOAD_STATS",
    SaveStats = "SAVE_STATS",
}

export {
    TypingAction,
    updateFocusAction,
    generateNewLessonAction as generateParagraphAction,
    updateLastLetterAction,
} from "./typingActions";

export {
    SettingsAction,
    setDictionaryAction,
} from "./settingsActions";

export {
    StatsAction,
    updateStatsAction,
    loadStatsAction,
    saveStatsAction,
} from "./statsActions";
