import React, {useState} from 'react';
import {ScrollView, StyleSheet, ToastAndroid, View} from 'react-native';
import {INDIGO_200, HEIGHT, INDIGO_500, WIDTH} from '../CONSTANTS';
import {useFocusEffect} from '@react-navigation/native';
import {useHoney} from '../context/HoneyContext';
import {HoneyInput} from '../components/HoneyInput';
import {HoneyButton} from '../components/HoneyButton';
import {HoneyText} from '../components/HoneyText';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from "react-i18next"

const AddItem = ({navigation, route}) =>{
    const {db, state} = useHoney()
    const [fields, setFields] = useState([])
    const [image, setImage] = useState("")
    let tableName = route?.params?.table
    const [values, setValues] = useState({})
    const { t } = useTranslation()

    useFocusEffect(
        React.useCallback(() =>{
            db.getFields(route?.params?.table)
                .then(fields => {
                    setFields(fields.data)
                })
        }, [])
    )

    return (
        <View style={[styles.container, {backgroundColor: state.theme.primary}]}>
            {/*container primary*/}
           <ScrollView>
               {fields && fields.map((field, i) =>{
                   if(field.fieldType === "TEXT"){
                       return <View style={styles.input} key={i}>
                           <HoneyText>{field.fieldName}</HoneyText>
                           <HoneyInput
                               key={i}
                               placeHolder={field.fieldName}
                               placeHolderTextColor={"#aaa"}
                               //DEGISECEK YER ALT SATIR
                               onChangeText={t => setValues({...values, [field.fieldName]: t})}
                               value={values[field.fieldName]}
                           />
                       </View>
                   } else if(field.fieldType === "IMAGE"){
                       return <View style={styles.button} key={i}>
                           <HoneyText>{field.fieldName}</HoneyText>
                           <HoneyButton
                               imageSource={image}
                               text={!image && t("SELECT_IMAGE")}
                               width={WIDTH / 1.2}
                               style={{backgroundColor: state.theme.secondary}}
                               height={150} onPress={async () =>{
                               const file = await launchImageLibrary({mediaType: "photo", quality: 0.5})
                               setImage(file.assets[0].uri)
                               //DEGISECEK YER ALT SATIR
                               setValues({...values, [field.fieldName]: file.assets[0].uri})
                           }} />
                       </View>
                   } else if(field.fieldType === "DATE"){
                       return  <View style={styles.button} key={i}>
                           <HoneyText>{field.fieldType}</HoneyText>
                           <HoneyButton text={t("COMING_SOON")} width={WIDTH / 1.2} height={100} />
                       </View>
                   }
               })}

               <HoneyButton text={t("ADD_DATA")} style={[styles.button, {backgroundColor: state.theme.secondary}]} onPress={() =>{
                   ToastAndroid.show(t("DATA_CONTROL"), ToastAndroid.SHORT)
                   let successFields = []
                    for(let field of fields){
                        if(typeof values[field.fieldName] !== "undefined"){
                            successFields.push(field.fieldName)
                        }
                    }
                   if(successFields.length === fields.length -1){
                       ToastAndroid.show(t("DATA_CONTROL_TRUE"), ToastAndroid.SHORT)
                       db.addValue(tableName, values)
                           .then(res =>{
                               if(res.status === true){
                                   ToastAndroid.show(t("ADD_DATA_STATUS_TRUE"), ToastAndroid.SHORT)
                                   navigation.pop()
                               }
                           })
                   } else{
                       ToastAndroid.show(t("DATA_CONTROL_FALSE"), ToastAndroid.SHORT)
                   }
               }} />
           </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: INDIGO_500
    },
    button: {
        alignSelf: "center",
        marginVertical: 15,
        alignItems: "center"
    },
    input: {
        alignSelf: "center",
        marginVertical: 15,
        alignItems: "center"
    }
})

export default AddItem
