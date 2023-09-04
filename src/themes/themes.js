import {defaultSettings} from "../../settings/defaultSettings";

const allThemes = defaultSettings.themes.preferences

export const getThemeColors = (myTheme, availableTheme) =>{
    if(availableTheme){
        const theme = allThemes.find(theme => theme.name === myTheme)
        return theme
    } else{
        //tema not found filan ekle
        const theme = allThemes.find(theme => {
            return theme.name === myTheme && theme.type === "FREE"
        })
        if(theme){
            return theme
        } else{
            console.log("theme.length > 0 false",allThemes[0])
            return allThemes[0]
        }
    }
}
