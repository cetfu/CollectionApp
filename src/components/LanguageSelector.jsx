import React from "react";
import {Picker} from "@react-native-picker/picker";
import {defaultSettings} from "../../settings/defaultSettings";

const LanguageSelector = ({value, onValueChange, style}) => {

    return (
        <Picker selectedValue={value}
                onValueChange={onValueChange} style={style}>
            {defaultSettings.languages.preferences.map((language, index) => (
                <Picker.Item key={index} label={language.name} value={language.code}/>
            ))}
        </Picker>
    )
}

export default LanguageSelector
