import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {INDIGO_200, INDIGO_300, INDIGO_500, FONT_NAME, HEIGHT} from '../CONSTANTS';
import {useTranslation} from "react-i18next";
import FastImage from "react-native-fast-image";
import {useHoney} from "../context/HoneyContext";
import { HoneyText } from '../components/HoneyText';


const LogoComponent = ({bgColor}) => {
    return (
        <View style={[styles.logo, {backgroundColor: bgColor}]}>
            <HoneyText color={"white"} style={{textAlign: "center"}}>
                Collection{"\n"}App
            </HoneyText>
        </View>
    );
};

const StartButton = ({onPress}) =>{

    const {t} = useTranslation()
    const {state} = useHoney();
    //secondary
    return (
        <TouchableOpacity style={[styles.startButton, {backgroundColor: state.theme.secondary}]} activeOpacity={0.8} onPress={onPress}>
            <Text style={styles.startButton.text}>{t("START_NOW")}</Text>
        </TouchableOpacity>
    )
}

const StartPage = ({navigation}) => {
    const {state} = useHoney()
    return (
        <View style={[styles.container, {backgroundColor: state.theme.primary}]}>
            {/*ana div primary*/}
            <LogoComponent bgColor={state.theme.primary} />
            <StartButton onPress={() => navigation.replace("CollectionMenu")} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: INDIGO_500,
    },
    logo: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: 250,
        height: 125,
        logoArea: {
            width: 125,
            height: 125,
            borderRadius: 20,
            alignSelf: 'center',
            marginTop: 50,
        },
        text: {
            fontSize: 25,
            textAlign: "center",
            marginTop: 10,
            color: "white",
            fontFamily: FONT_NAME
        },
        alignItems: 'center',
    },
    startButton: {
        width: 250,
        height: 75,
        borderRadius: 20,
        //backgroundColor: INDIGO_300,
        alignSelf: "center",
        marginTop: HEIGHT / 2.5,
        justifyContent: "center",
        alignItems: "center",
        text: {
            fontSize: 20,
            color: "white",
            fontFamily: FONT_NAME
        }
    }
});

export default StartPage;
