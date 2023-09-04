import React from 'react';
import {TextInput} from 'react-native';

export const HoneyInput = ({
                        width = 175,
                        textColor = "black",
                        height = 50,
                        backgroundColor = "white",
                        value,
                        onChangeText,
                        placeHolder = "",
                        placeHolderTextColor = "#ddd",
                        secure = false,
                        fontSize = 16,
                        style}) =>{
    return (
        <TextInput
            onChangeText={t => onChangeText && onChangeText(t)}
            value={value && value}
            placeholder={placeHolder}
            secureTextEntry={secure}
            placeholderTextColor={placeHolderTextColor}
            style={{
                width: width,
                height: height,
                backgroundColor:  backgroundColor,
                borderRadius: 10,
                fontSize: fontSize,
                color: textColor,
                ...style
            }}
        />
    )
}
