import {
    INDIGO_200,
    INDIGO_300,
    INDIGO_500,
    PASTEL_INDIGO_200,
    PASTEL_INDIGO_300,
    PASTEL_INDIGO_500,
    PASTEL_PURPLE_200,
    PASTEL_PURPLE_300,
    PASTEL_PURPLE_500,
    RED_200,
    RED_300,
    RED_500,
    ROSE_200,
    ROSE_300,
    ROSE_500
} from "../src/CONSTANTS";

export const defaultSettings = {
    languages: {
        preferences: [
            {
                name: "Türkçe",
                code: "tr-TR"
            }, {
                name: "English",
                code: "en-US"
            }
        ]
    }, // languages that are available in the app
    themes: {
        preferences: [
            {
                name: "INDIGO",
                primaryColor: INDIGO_500,
                secondaryColor: INDIGO_300,
                tertiaryColor: INDIGO_200,
                type: "FREE"
            }, {
                name: "ROSE",
                primaryColor: ROSE_500,
                secondaryColor: ROSE_300,
                tertiaryColor: ROSE_200,
                type: "FREE"
            }, {
                name: "RED",
                primaryColor: RED_500,
                secondaryColor: RED_300,
                tertiaryColor: RED_200,
                type: "PAID"
            }, {
                name: "PASTEL_BLUE",
                primaryColor: PASTEL_INDIGO_500,
                secondaryColor: PASTEL_INDIGO_300,
                tertiaryColor: PASTEL_INDIGO_200,
                type: "PAID"
            }, {
                name: "PASTEL_PURPLE",
                primaryColor: PASTEL_PURPLE_500,
                secondaryColor: PASTEL_PURPLE_300,
                tertiaryColor: PASTEL_PURPLE_200,
                type: "PAID"
            }
        ]
    }, // themes that are available in the app
}
