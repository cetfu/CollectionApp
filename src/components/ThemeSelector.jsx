import React from "react";
import {Picker} from "@react-native-picker/picker";
import {defaultSettings} from "../../settings/defaultSettings";
import {useHoney} from "../context/HoneyContext";

const ThemeSelector = ({value, onValueChange, style}) => {
    const {state} = useHoney()

    return (
        <Picker selectedValue={value}
                onValueChange={onValueChange} style={style}>
            {defaultSettings.themes.preferences.map((theme, index) => (
                <Picker.Item
                    key={index}
                    label={`${theme.name} (${theme.type})`}
                    value={theme.name}
                    enabled={!(theme.type === "PAID" && state.availableFeatures.themes === false)}
                />
            ))}
        </Picker>
    )
}

export default ThemeSelector
