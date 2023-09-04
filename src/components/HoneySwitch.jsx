import React from "react";
import { Switch } from "react-native";
import {INDIGO_300} from "../CONSTANTS";

export const HoneySwitch = ({isEnabled, onValueChange}) =>{
    return <Switch
        trackColor={{ false: "#767577", true: INDIGO_300 }}
        thumbColor={isEnabled ? INDIGO_300 : "#f4f3f4"}
        onValueChange={onValueChange}
        value={isEnabled}
    />
}
