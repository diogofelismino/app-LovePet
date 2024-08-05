import { StyleSheet } from "react-native";
import * as colors from "../../../styles/colors";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:"center",
        alignContent:"center",
        backgroundColor: colors.BACKGROUND_PINK,
        
    },
    textAnimacao:{
        marginTop:10,
        alignSelf: 'center',
        color:colors.COLOR_TEXT_BLACK,
        fontWeight:'600',
        fontSize:30
    }
})

export default styles;