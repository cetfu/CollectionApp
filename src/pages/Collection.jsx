import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {INDIGO_200, INDIGO_300, INDIGO_500, FONT_NAME, RED_500, WIDTH} from '../CONSTANTS';
import {HoneyButton} from '../components/HoneyButton';
import FastImage from 'react-native-fast-image';
import {useHoney} from '../context/HoneyContext';
import {HoneyModal} from '../components/HoneyModal';
import {HoneyText} from '../components/HoneyText';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from "react-i18next";


const Data = ({id, name, source, style}) =>{
    const {state, dispatch} = useHoney()

    return (
        <View>
            <View style={{width: "100%", backgroundColor: state.theme.secondary, height: 0.8, marginVertical: 1}} />
            <TouchableOpacity activeOpacity={0.5} style={styles.list.datas.data} onPress={() => {
                dispatch({type: "CHANGE_COLLECT_ID", id: id})
                dispatch({type: "SHOW_MODAL", modalContent: "COLLECTION_DETAILS"})
            }}>
                <View style={styles.list.datas.data.block}>
                    <HoneyText fontSize={16} color={"white"}>{id}</HoneyText>
                </View>
                <View style={styles.list.datas.data.block}>
                    <HoneyText fontSize={16} color={"white"}>{name}</HoneyText>
                </View>
                {typeof source.uri !== "undefined" && <View style={styles.list.datas.data.block}>
                    <FastImage source={source} style={[styles.list.datas.image, style]} resizeMode={FastImage.resizeMode.contain} />
                </View>}
            </TouchableOpacity>
        </View>
    )
}


const Collection = ({navigation, route}) => {
    const {db, state} = useHoney()
    const [tables, setTables] = useState([])
    const [datas, setDatas] = useState([])
    const {t} = useTranslation()

    useFocusEffect(
        React.useCallback(() =>{
            db.getFields(route?.params?.table)
                .then(data =>{
                    setTables(data.data)
                })
            db.getValues(route?.params?.table)
                .then(datas =>{
                    setDatas(datas.data)
                })
        }, [state.modalStatus])
    )

    const onDelete = () =>{
        return Alert.alert(t("ALERT"), t("DELETE_COLLECTION_WARNING"), [
            {text: t("CANCEL"), style: "cancel"},
            {text: t("OK"), onPress: () => {
                db.deleteCollection(route?.params?.table)
                    .then(() =>{
                        navigation.goBack()
                    })
            }}
        ])
    }

    const fieldStyle = {
        marginVertical: 10,
    }

    return (
        <View style={[styles.container, {backgroundColor: state.theme.primary}]}>
            <HoneyButton style={{alignSelf: 'center', marginVertical: 10, backgroundColor: state.theme.secondary}} text={t("NEW_ITEM")} onPress={() => navigation.navigate("AddItem", {table: route?.params?.table})} />
            <HoneyButton
                style={{alignSelf: 'center', marginVertical: 10, backgroundColor: RED_500}}
                text={t("DELETE_COLLECTION")}
                onPress={() => onDelete()
            }
            />
            <HoneyModal collectionName={route?.params?.table} />
            <View style={[styles.list, {backgroundColor: state.theme.secondary}]}>
                <View style={styles.list.fields}>
                    {tables && tables.map((table, i) =>(
                        <View style={styles.list.fields.block} key={i}>
                            <HoneyText fontSize={16} color={'white'} style={fieldStyle}>{table.fieldName}</HoneyText>
                        </View>
                    ))}
                </View>
                <View style={styles.list.datas}>
                        <ScrollView>
                            {datas && datas.map((data, i) =>{
                            let imageFieldName = tables.filter(arr => arr.fieldType === "IMAGE")
                            let textFieldName = tables.filter(arr => arr.fieldType === "TEXT")
                            return <Data id={data.id} name={data[textFieldName[0]?.fieldName]} source={{uri: data[imageFieldName[0]?.fieldName]}} key={i} />
                        })}
                        </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: INDIGO_500,
    },
    list: {
        flex: 1,
        width: WIDTH / 1.1,
        marginVertical: 10,
        //backgroundColor: INDIGO_300,
        borderRadius: 20,
        alignSelf: 'center',
        fields: {
            flexDirection: 'row',
            block: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            },
        },
        text: {
            fontSize: 16,
            fontFamily: FONT_NAME,
            color: 'white',
            marginVertical: 10,
        },
        datas: {
            marginBottom: 50,
            data: {
                flexDirection: 'row',
                alignItems: "center",
                text: {
                    fontSize: 16,
                    fontFamily: FONT_NAME,
                    color: 'white',
                },
                block: {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }
            },
            image: {
                width: 100,
                height: 45,
                marginVertical: 5
            }
        },
    },
});

export default Collection;
