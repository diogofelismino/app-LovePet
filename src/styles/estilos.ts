import { StyleSheet } from "react-native";
import * as colors from "./colors";

const estilos = StyleSheet.create({
    containerPadrao:{
        flex: 1,
        justifyContent:"center",
        alignContent:"center",
        backgroundColor: colors.BACKGROUND_GERAL,
        
    },
    centralizarViewFlex:{
        alignItems:'center',
        justifyContent: 'center'
    },
    textTitulo:{
        color:colors.COLOR_TEXT_BLACK,
        fontWeight:'600',
        fontSize:30
    },
    textInput:{
        backgroundColor:colors.BACKGROUND_INPUT,
        width:'90%',
        marginVertical:5,

        
    },

    textInputError:{
        backgroundColor:colors.BACKGROUND_INPUT,
        width:'90%',
        marginVertical:5,

        
    },
    btnBasico:{
        backgroundColor: colors.COLOR_BUTTON,
        width:'100%'
    }
    

})

export default estilos;