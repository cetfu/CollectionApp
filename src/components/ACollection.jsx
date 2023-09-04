import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {INDIGO_500, FONT_NAME, WIDTH} from '../CONSTANTS';
import FastImage from "react-native-fast-image"
import {useHoney} from '../context/HoneyContext';
import {useTranslation} from "react-i18next";

const ACImage = ({source, style}) =>{
    return (
        <View style={styles.collection.image}>
            <FastImage style={[style, styles.collection.images.image]} source={source} resizeMode={FastImage.resizeMode.contain} />
        </View>
    )
}

const ACollection = ({style, onPress, title}) =>{
    const [fields, setFields] = useState([])
    const [datas, setDatas] = useState([])
    const [images, setImages] = useState([])
    const {db, state} = useHoney()
    const {t} = useTranslation()



    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.collection, style]} onPress={onPress}>
            <Text style={[styles.collection.title, {color: state.theme.primary}]}>{t("COLLECTION")}: {title}</Text>
            <View style={styles.collection.images}>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    collection: {
        width: WIDTH / 1.1,
        minHeight: 100,
        backgroundColor: "#fff",
        marginVertical: 15,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        title: {
            textAlign: "center",
            fontSize: 16,
            fontFamily: FONT_NAME,
            //color: INDIGO_500,
            marginVertical: 10
        },
        images: {
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "row",
            image: {
                width: 75,
                height: 45,
                marginHorizontal: 10,
                marginVertical: 10
            }
        },
        image: {
            backgroundColor: "#ddd",
            marginHorizontal: 30,
            marginVertical: 20
        }
    }
})

export default ACollection
