import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {FONT_NAME} from '../CONSTANTS';

export const HoneyText = ({children, fontSize = 20, color = "white", style}) =>{
    return (
        <Text style={{
            fontSize: fontSize,
            color: color,
            fontFamily: FONT_NAME,
            ...style
        }}>
            {children}
        </Text>
    )
}

