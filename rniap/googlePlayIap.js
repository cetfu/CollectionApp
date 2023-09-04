import {Alert, Platform} from "react-native";
import RNIap from "react-native-iap"
import {useEffect} from "react";
import {useHoney} from "../src/context/HoneyContext";

let androidDevPurchases = [
    'android.test.purchased',
    'android.test.canceled',
    'android.test.refunded',
    'android.test.item_unavailable'
]

let honeyPurchases = [
    "basic_supporter"
]

export const productList = Platform.select({
    ios: [],
    android: __DEV__ ? androidDevPurchases : [...honeyPurchases, ...androidDevPurchases],
});

export const getProducts = async () => {
    try {
        const res = await RNIap.getProducts(productList);
        return res
    } catch (e) {
        console.log("ERROR", e)
    }
}

export const controlPurchases = async () => {
            const purchases = await RNIap.getAvailablePurchases();
            const features = {themes: false}
            purchases.forEach(purchase => {
                    if(purchase.productId === "basic_supporter") {
                        features.themes = true
                    }
                }
            )
            return features
};

export const requestPurchase = async (sku) => {
    try {
        const res = await RNIap.requestPurchase(sku);
    } catch (err) {
        console.warn("ERROR", err.code, err.message);
    }
};
