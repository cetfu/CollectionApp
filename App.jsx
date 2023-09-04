import React, {useEffect} from 'react';
import {HoneyProvider, useHoney} from './src/context/HoneyContext';
import Stack from './src/navigation/Stack';
import {NavigationContainer} from '@react-navigation/native';
import RNIap from "react-native-iap";

const App = () => {


    useEffect(() =>{

        return () =>{
             RNIap.endConnection()
        }
    }, [])
    return (

        <HoneyProvider>
            <NavigationContainer>
                <Stack/>
            </NavigationContainer>
        </HoneyProvider>
    );
};

export default App;
