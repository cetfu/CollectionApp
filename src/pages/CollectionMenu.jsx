import React from 'react';
import {StyleSheet, View} from 'react-native';
import {INDIGO_500} from '../CONSTANTS';
import {HoneyButton} from '../components/HoneyButton';
import {useTranslation} from "react-i18next";
import {useHoney} from "../context/HoneyContext";


const CollectionMenu = ({navigation}) =>{
    const {t} = useTranslation()
    const {state} = useHoney()
    const btnColor = state.theme.secondary

    //butonlar secondary
    const btnStyle = {
        backgroundColor: btnColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center"
    }
    return (
        <View style={[styles.container, {backgroundColor: state.theme.primary}]}>
            {/*container primary*/}
            <HoneyButton text={t("COLLECTIONS")} style={btnStyle} onPress={() => navigation.navigate("Collections")} />
            <HoneyButton text={t("NEW_COLLECTION")} style={btnStyle} onPress={() => navigation.navigate("NewCollection")} />
            <HoneyButton text={t("SEARCH_IN_COLLECTION")} style={btnStyle} />
            <HoneyButton text={t("SETTINGS")} style={btnStyle} onPress={() => navigation.navigate("Settings")} />
            <HoneyButton text={t("BUY_NEW_THEMAS")} style={btnStyle} onPress={() =>navigation.navigate("Themas")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: INDIGO_500
    }
})

export default CollectionMenu
