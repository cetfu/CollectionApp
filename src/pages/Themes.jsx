import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native";
import {INDIGO_500} from "../CONSTANTS";
import {HoneyButton} from "../components/HoneyButton";
import {requestPurchase} from "../../rniap/googlePlayIap";
import {useHoney} from "../context/HoneyContext";
import {HoneyText} from "../components/HoneyText";

const Themes = () =>{
    const {state} = useHoney()

    useEffect(() => {

        return () => {

        };
    }, [state]);


    return (
        <View style={[styles.container, {backgroundColor: state.theme.primary}]}>
            {state.products.length > 0 ? state.products.map((product, i) =>(
                <HoneyButton
                    key={i}
                    text={`${product.title}\n${product.productId}\n${product.localizedPrice}`}
                    onPress={() => requestPurchase(product.productId)}
                    style={[styles.buttons, {backgroundColor: state.theme.secondary}]}
                    width={400}
                />
            )) : <HoneyText>No product available</HoneyText>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: INDIGO_500
    },
    buttons: {
        alignSelf: "center",
    }
})

export default Themes
