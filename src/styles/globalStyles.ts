
export enum JustifyContent {
    FLEX_START = 'flex-start',
    FLEX_END = 'flex-end',
    CENTER = 'center',
    SPACE_BETWEEN = 'space-between',
    SPACE_AROUND = 'space-around',
    SPACE_EVENLY = 'space-evenly',
}

export enum AlignItems {
    FLEX_START = 'flex-start',
    FLEX_END = 'flex-end',
    CENTER = 'center',
    BASELINE = 'baseline',
    STRETCH = 'stretch',
}



export const globalStyles = {
    PRETO: "#000",
    CINZA: "#1F1F1F",
    CINZA_SPOTIFY_BACKGROUND: "#121212",

    JUSTIFY_CENTER: JustifyContent.CENTER,
    JUSTIFY_SPACE_AROUND: JustifyContent.SPACE_AROUND,
    JUSTIFY_SPACE_BETWEEN: JustifyContent.SPACE_BETWEEN,
    JUSTIFY_SPACE_EVENLY: JustifyContent.SPACE_EVENLY,
    JUSTIFY_FLEX_START: JustifyContent.FLEX_START,
    JUSTIFY_FLEX_END: JustifyContent.FLEX_END,

    // ALIGN ITEMS TYPES //
    ALIGN_CENTER: AlignItems.CENTER,
    ALIGN_FLEX_START: AlignItems.FLEX_START,
    ALIGN_FLEX_END: AlignItems.FLEX_END,
    ALIGN_BASELINE: AlignItems.BASELINE,
    ALIGN_STRETCH: AlignItems.STRETCH,
}

