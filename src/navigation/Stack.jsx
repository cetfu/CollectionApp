import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartPage from '../pages/StartPage';
import CollectionMenu from '../pages/CollectionMenu';
import Collections from '../pages/Collections';
import Collection from '../pages/Collection';
import NewCollection from '../pages/NewCollection';
import AddItem from '../pages/AddItem';
import Themes from "../pages/Themes";
import Settings from "../pages/Settings";

const StackNav = createNativeStackNavigator()

const navigations = [
    {
        name: "StartPage",
        component: StartPage
    },{
        name: "CollectionMenu",
        component: CollectionMenu
    },{
        name: "Collections",
        component: Collections
    }, {
        name: "Collection",
        component: Collection
    }, {
        name: "NewCollection",
        component: NewCollection
    }, {
        name: "AddItem",
        component: AddItem
    }, {
        name: "Themas",
        component: Themes
    }, {
        name: "Settings",
        component: Settings
    }
]

const Stack = () =>{
    return (
        <StackNav.Navigator initialRouteName={navigations[0].name && navigations[0].name} screenOptions={{
            headerShown: false
        }}>
            {navigations.map(nav => (
                <StackNav.Screen key={nav.name} name={nav.name} component={nav.component}/>
            ))}
        </StackNav.Navigator>
    )
}

export default Stack
