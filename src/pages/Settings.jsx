import React, {useEffect, useState} from "react";
import {Alert, StyleSheet, View} from "react-native";
import {INDIGO_500} from "../CONSTANTS";
import LanguageSelector from "../components/LanguageSelector";
import {useTranslation} from "react-i18next";
import {HoneyText} from "../components/HoneyText";
import {useHoney} from "../context/HoneyContext";
import ThemeSelector from "../components/ThemeSelector";
import {HoneyButton} from "../components/HoneyButton";
import { stop } from "react-native-restarter";

const Settings = () =>{
    const {t} = useTranslation()
    const {state, db} = useHoney()
    const [setting, setSetting] = useState({
        language: state.settings.language,
        theme: state.settings.theme
    })

    const showAlert = () =>{
        return Alert.alert(t("INFO"), t("RESTART_APPLICATION"), [
            {
                "text": t("RESTART"),
                onPress: async () => {
                    await db.updateSettings(setting)
                    stop()
                }
            }
        ])
    }

    useEffect(() =>{
        console.log(state.settings)
    }, [])
    return (
        <View style={[styles.container, {backgroundColor: state.theme.primary}]}>
            {/*container primary*/}
            <View style={styles.setting}>
                <HoneyText>{t("LANGUAGE")}: {state.settings.language}</HoneyText>
                <LanguageSelector
                    style={styles.picker}
                    value={setting["language"]}
                    onValueChange={(val) =>{setSetting(sett =>{ return {...sett, language: val}})}}  />
            </View>
            <>
                <HoneyText>{t("THEME")}: {state.settings.theme}</HoneyText>
                <ThemeSelector
                    style={styles.picker}
                    value={setting["theme"]}
                    onValueChange={(val) =>{setSetting(sett =>{ return {...sett, theme: val}})}}  />
            </>
            <View style={{flex: 1, justifyContent: "center"}}>
                <HoneyButton
                    text={t("SAVE_SETTINGS")}
                    style={{margin: "auto", alignSelf: "center", backgroundColor: state.theme.secondary}}
                    onPress={() => {
                        showAlert()
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: INDIGO_500
    },
    setting: {
        marginVertical: 15
    },
    picker: {
        backgroundColor: "white"
    }
})

export default Settings
