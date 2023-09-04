import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { FONT_NAME, INDIGO_300} from '../CONSTANTS';
import FastImage from 'react-native-fast-image';


export const HoneyButton = ({width = 250, height = 60, onPress, style, text, imageSource}) =>{
    return (
        <TouchableOpacity style={[styles.honeyButton, {width, height}, style]} onPress={onPress} activeOpacity={0.8}>
            {text ? <Text style={styles.honeyButton.text}>{text}</Text> : imageSource ? <FastImage source={{uri: imageSource}} style={styles.honeyButton.image} resizeMode={FastImage.resizeMode.stretch} /> : null}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    honeyButton: {
        //backgroundColor: INDIGO_300,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginVertical: 8,
        text: {
            fontSize: 17,
            marginHorizontal: 5,
            fontFamily: FONT_NAME,
            color: "white",
            textAlign: "center"
        },
        image: {
            width: 75,
            height: 75
        }
    }
})
