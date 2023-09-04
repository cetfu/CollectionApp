import React from "react";
import {useHoney} from "./HoneyContext";

export const useTheme = () =>{
    const {state} = useHoney()
    const [theme, setTheme] = React.useState(state.theme.name);

    return {theme}
}
