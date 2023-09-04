import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {INDIGO_500} from '../CONSTANTS';
import ACollection from '../components/ACollection';
import {useFocusEffect} from '@react-navigation/native';
import {useHoney} from '../context/HoneyContext';
import {HoneyText} from "../components/HoneyText";
import {useTranslation} from "react-i18next";

const Collections = ({ navigation }) =>{
    const {db, state} = useHoney()
    const [tables, setTables] = useState([])
    const {t} = useTranslation()

    useFocusEffect(
        React.useCallback(() =>{
            db.getTables()
                .then(tables =>{
                    if(tables.status){
                        setTables(tables.data)
                    }
                })
        }, [])
    )

    return (
        <View style={[styles.container, {backgroundColor: state.theme.primary}]}>
            {tables.length > 0 ? <ScrollView>
                {tables.map((table, i) =>{
                    return <ACollection style={{alignSelf: "center"}} title={table} onPress={() => navigation.navigate("Collection", {table})} key={i} />
                })}
            </ScrollView> : <View style={styles.noData}>
                <HoneyText style={{textAlign: "center"}} color={"white"}>{t("EMPTY_DATA")}</HoneyText>
            </View> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: INDIGO_500
    },
    noData: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Collections
