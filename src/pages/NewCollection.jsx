import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {INDIGO_500, WIDTH} from '../CONSTANTS';
import {HoneyInput} from '../components/HoneyInput';
import {HoneyButton} from '../components/HoneyButton';
import {HoneyText} from '../components/HoneyText';
import {useHoney} from '../context/HoneyContext';
import {HoneyModal} from '../components/HoneyModal';
import {useTranslation} from "react-i18next";
import {useTheme} from "../context/useTheme";

const NewCollection = () => {
    const {state, dispatch, db} = useHoney()
    const [collectionName, setCollectionName] = useState("")
    const [fields, setFields] = useState([])
    const {t} = useTranslation()

    useEffect(() =>{
        try{
            if(collectionName !== ""){
                db.getFields(collectionName)
                    .then(res =>{
                        setFields(res.data)
                    })
            }
        } catch (e) {
            console.log(e)
        }
    }, [state.modalStatus])

    return (
        <View style={[styles.container, {backgroundColor: state.theme.primary}]}>
            {/*container primary*/}
            <HoneyInput
                style={styles.input}
                width={250}
                height={60}
                placeHolder={t("COLLECTION_NAME")}
                placeHolderTextColor={'#aaa'}
                value={collectionName}
                onChangeText={t => {
                    setCollectionName(t)
                }}
            />
            <HoneyModal collectionName={collectionName} />
            {/*button secondary*/}
            <HoneyButton style={[styles.button, {backgroundColor: state.theme.secondary}]} text={t("ADD_CATEGORY")} onPress={() => {
                if(collectionName.length > 0){
                    dispatch({type: 'SHOW_MODAL', modalContent: 'ADD_FIELD'});
                } else{
                    return Alert.alert("WARNING!", "Please typing new Collection Name.", [
                        {
                            text: "SORRY"
                        }
                    ])
                }
            }} />
            <View style={styles.fieldPlace}>
                <HoneyText>{t("CATEGORIES")}</HoneyText>
                <View style={styles.list}>
                    {fields && fields.map(((a, i) => (
                        <View style={styles.field} key={i}>
                            <HoneyText style={styles.fieldText}>{a.fieldName}: {a.fieldType}</HoneyText>
                        </View>
                    )))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: INDIGO_500,
    },
    input: {
        alignSelf: 'center',
        marginVertical: 10,
    },
    button: {
        alignSelf: 'center',
    },
    fieldPlace: {
        alignItems: 'center',
        marginVertical: 30,
    },
    list: {
        minWidth: WIDTH / 1.2,
        minHeight: 100,
        backgroundColor: '#ddd',
    },
    field: {
        marginVertical: 5
    },
    fieldText: {
        marginHorizontal: 20
    }
});

export default NewCollection;
