import React, {useEffect, useState} from 'react';
import {Alert, KeyboardAvoidingView, Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useHoney} from '../context/HoneyContext';
import {
    HEIGHT,
    INDIGO_200,
    INDIGO_500,
    RED_500,
    WIDTH
} from '../CONSTANTS';
import {HoneyInput} from './HoneyInput';
import {HoneyText} from './HoneyText';
import {HoneyButton} from './HoneyButton';
import {Picker} from '@react-native-picker/picker';
import FastImage from 'react-native-fast-image';
import {useTranslation} from "react-i18next";

const GetModal = ({TYPE, collectionName}) => {
    const {dispatch, db, state} = useHoney();
    const [data, setData] = useState([]);
    const {t} = useTranslation()
    switch (TYPE) {

        case 'COLLECTION_DETAILS':
            useEffect(() => {
                db.getValues(collectionName)
                    .then(res => {
                        console.log(res)
                        setData(res.data);
                    });
            }, []);
            const onDelete = () =>{
                db.deleteValue(collectionName, state.lastCollectId)
                    .then(res => {
                        dispatch({type: "CLOSE_MODAL"})
                    });
            }

            return (
                <View style={styles.modal}>
                    <ScrollView>
                        <HoneyButton
                            style={{alignSelf: 'center', marginVertical: 10, backgroundColor: RED_500}}
                            text={t("DELETE_VALUE")}
                            onPress={() => onDelete()
                            }
                        />
                        {data && data.map((aData, i) => {
                            if (aData.id !== state.lastCollectId) return
                            return <View key={i} style={{borderWidth: 1, borderColor: state.theme.secondary}}>
                                {Object.keys(aData).map((key, a) => (
                                    <View key={a} style={{justifyContent: "center"}}>
                                        {aData[key].toString().startsWith("file://") ? <View style={{}}>
                                            <HoneyText color={state.theme.primary}>{key}: </HoneyText>
                                            <FastImage source={{uri: aData[key]}}
                                                       style={{
                                                           width: WIDTH / 1.3,
                                                           height: HEIGHT / 2.5,
                                                           marginHorizontal: 5,
                                                           alignSelf: "center",
                                                           borderRadius: 20
                                                       }} resizeMode={FastImage.resizeMode.stretch}/>
                                        </View> : <HoneyText color={state.theme.primary}>{key}: {aData[key]}</HoneyText>}
                                    </View>
                                ))}
                            </View>
                        })}
                    </ScrollView>
                </View>
            );
        case 'ADD_FIELD':
            const [fieldName, setFieldName] = useState('');
            const [fieldType, setFieldType] = useState('TEXT');

            const controlTypes = async () => {
                if (fieldName !== '') {
                    if (fieldType === 'DATE' || fieldType === 'IMAGE' || fieldType === 'TEXT') {
                        const res = await db.addField(collectionName, fieldName, fieldType);
                        if (res.no === 1) {
                            dispatch({type: 'CLOSE_MODAL'});
                        }
                    } else {
                        return Alert.alert(t("ALERT"), t("WRONG_CATEGORY"), [
                            {
                                text: t("SORRY"),
                                onPress: () => {
                                },
                            },
                        ], {
                            cancelable: true,
                            onDismiss: () => {
                            },
                        });
                    }
                }
            };

            return (
                <View style={styles.modal}>
                    <HoneyInput
                        backgroundColor={state.theme.tertiary}
                        style={styles.addFieldInput}
                        placeHolder={t("CATEGORY_NAME")}
                        placeHolderTextColor={'white'}
                        value={fieldName}
                        onChangeText={t => setFieldName(t)}
                    />
                    <Picker selectedValue={fieldType}
                            onValueChange={(itemValue, itemIndex) => {
                                setFieldType(itemValue)
                            }}>
                        <Picker.Item label={t("TEXT")} value="TEXT"/>
                        <Picker.Item label={t("IMAGE")} value="IMAGE"/>
                        <Picker.Item label={t("DATE")} value="DATE" enabled={false}/>
                    </Picker>
                    <HoneyButton text={t("ADD_CATEGORY")} style={[styles.addFieldButton, {backgroundColor: state.theme.secondary}]} onPress={controlTypes}/>
                </View>
            );
        default:
            return (
                <HoneyText>ERROR</HoneyText>
            )
    }
};

export const HoneyModal = ({collectionName}) => {
    const {state, dispatch} = useHoney();
    const closeModal = () => {
        dispatch({type: 'CLOSE_MODAL'});
    };

    return (
        <Modal onRequestClose={closeModal} transparent={true} animationType={'slide'} visible={state.modalStatus}>
            <GetModal TYPE={state.modalContent} collectionName={collectionName}/>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        width: WIDTH / 1.1,
        height: HEIGHT / 1.15,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: 15,
    },
    addFieldInput: {
        alignSelf: 'center',
        marginVertical: 15,
    },
    fieldTypes: {
        alignSelf: 'center',
    },
    addFieldButton: {
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: HEIGHT / 6,
    },
});
