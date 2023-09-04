import React, {useContext, createContext, useMemo, useReducer, useEffect} from 'react';
import {Database} from '../storage/database';
import RNIap, {purchaseErrorListener, purchaseUpdatedListener} from "react-native-iap";
import {Platform, LogBox, Alert} from "react-native";
import {controlPurchases, getProducts} from "../../rniap/googlePlayIap";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getThemeColors} from "../themes/themes";
import {useTranslation} from "react-i18next";

const Context = createContext()
LogBox.ignoreAllLogs()

const initialState = {
    modalStatus: false,
    modalContent: "",
    lastCollectId: 0,
    products: [],
    availableFeatures: {themes: false},
    theme: {name: "", primary: "", secondary: "", tertiary: ""},
    settings: {theme: "", language: ""}
}

const reducer = (state, payload) => {
    switch (payload.type) {
        case "SHOW_MODAL":
            return {
                ...state,
                modalContent: payload.modalContent,
                modalStatus: true
            }
        case "CLOSE_MODAL":
            return {
                ...state,
                modalContent: "",
                modalStatus: false
            }
        case "CHANGE_COLLECT_ID":
            return {
                ...state,
                lastCollectId: payload.id
            }
        case "SET_PRODUCTS":
            return {
                ...state,
                products: payload.products
            }
        case "SET_AVAILABLE_FEATURES":
            return {
                ...state,
                availableFeatures: {
                    themes: payload.themes
                }
            }
        case "SET_THEME":
            return {
                ...state,
                theme: {
                    name: payload.name,
                    primary: payload["primary"],
                    secondary: payload["secondary"],
                    tertiary: payload["tertiary"]
                }
            }
            case "SET_SETTINGS":
                return {
                    ...state,
                    settings: {
                        theme: payload.theme,
                        language: payload.language
                    }
                }
    }
}

export const HoneyProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const db = new Database()
    const {t} = useTranslation()

    const GLOBAL = useMemo(() => ({
        state, dispatch, db
    }), [state])

    const showAlert = () =>{
        return Alert.alert(t("GOOGLE_PLAY_SERVICES_ALERT"), t("GOOGLE_PLAY_SERVICES_CONTENT"))
    }

    useEffect(() => {
        let pel
        let pul
        (async () => {
            try {
                await RNIap.initConnection();
                if (Platform.OS === 'android') {
                    await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
                } else {
                    await RNIap.clearTransactionIOS();
                }
                const availableFeatures = await controlPurchases();
                dispatch({type: "SET_AVAILABLE_FEATURES", themes: availableFeatures.themes})
                const res = await getProducts()
                dispatch({type: "SET_PRODUCTS", products: res})
                const settingsFile = await db.getSettings()
                console.log(settingsFile)
                const a = getThemeColors(settingsFile.data.theme, availableFeatures.themes)
                dispatch({
                    type: "SET_THEME",
                    name: a.name,
                    primary: a["primaryColor"],
                    secondary: a["secondaryColor"],
                    tertiary: a["tertiaryColor"]
                })
                dispatch({
                    type: "SET_SETTINGS",
                    theme: settingsFile.data.theme,
                    language: settingsFile.data.language
                })
            } catch (err) {
                console.log("context catch")
                console.warn(err.code, err.message);
                showAlert()
            }
            //getAvailablePurchases()
            pel = purchaseErrorListener((e) => {
                console.log(e)
            })
            pul = purchaseUpdatedListener((e) => {
                console.log("purchaseUpdatedListener", e)
            })
        })()
        return () => {
            if (pel) {
                pel.remove()
                pel = null
            }
            if (pul) {
                pul.remove()
                pul = null
            }
        };
    }, []);


    return (
        <Context.Provider value={GLOBAL}>
            {children}
        </Context.Provider>
    )
}

export const useHoney = () => {
    return useContext(Context)
}
