import { StyleSheet } from "react-native";
import estilos from "../../../styles/estilos";


const styles = StyleSheet.create({
    conteiner:{
        ...estilos.containerPadrao,
        justifyContent:"flex-start"
    },
    areaViewCentro:{
        ...estilos.centralizarViewFlex,
        flex:1,
        width:'100%',
        justifyContent:'flex-start'
     
    },
    textView:{
        ...estilos.textTitulo,
        fontSize:20
    
    },
    input:{
        ...estilos.textInput
    },
    botao:{
        ...estilos.btnBasico,
        width:'90%',
        marginTop:20,
        color: "#FFF"
    }
});

export default styles;