import React from 'react';
import {Dimensions} from 'react-native';
import RNFS from 'react-native-fs';

export const WIDTH = Dimensions.get("screen").width
export const HEIGHT = Dimensions.get("screen").height
//export const FONT_NAME = "PressStart"
export const FONT_NAME = "RubikMonoOne"
export const DB_DIR_NAME = "honeyDb"
export const TABLE_FILE_NAME = "tables.json"
export const DATA_FILE_NAME = "data.json"
export const SETTINGS_FILE_NAME = "settings.json"
export const TABLE_FILE_PATH = `${RNFS.TemporaryDirectoryPath}/${DB_DIR_NAME}/${TABLE_FILE_NAME}`
export const DATA_FILE_PATH = `${RNFS.TemporaryDirectoryPath}/${DB_DIR_NAME}/${DATA_FILE_NAME}`
export const SETTINGS_FILE_PATH = `${RNFS.TemporaryDirectoryPath}/${DB_DIR_NAME}/${SETTINGS_FILE_NAME}`
export const TEMP_PATH = `${RNFS.TemporaryDirectoryPath}/${DB_DIR_NAME}`
//DEFAULT
export const INDIGO_500 = "#6366F1"
export const INDIGO_300 = "#A5B4FC"
export const INDIGO_200 = "#C7D2FE"
//ROSE
export const ROSE_500 = "#F43F5E"
export const ROSE_300 = "#FDA4AF"
export const ROSE_200 = "#FECDD3"
//RED
export const RED_500 = "#EF4444"
export const RED_300 = "#FCA5A5"
export const RED_200 = "#FECACA"
//PASTEL PURPLE
export const PASTEL_PURPLE_500 = "#B28DFF"
export const PASTEL_PURPLE_300 = "#C5A3FF"
export const PASTEL_PURPLE_200 = "#D5AAFF"
//PASTEL BLUE
export const PASTEL_INDIGO_500 = "#6EB5FF"
export const PASTEL_INDIGO_300 = "#AFCBFF"
export const PASTEL_INDIGO_200 = "#C7CEEA"
