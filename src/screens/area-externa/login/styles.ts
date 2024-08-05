import { StyleSheet } from "react-native";
import estilos from "../../../styles/estilos";
import * as colors from "../../../styles/colors";


const styles = StyleSheet.create({
    conteiner:{
        ...estilos.containerPadrao
    },
    areaViewCentro:{
        ...estilos.centralizarViewFlex,
        flex:1,
        width:'100%'
     
    },
    textView:{
        ...estilos.textTitulo,
    
    },
    input:{
        ...estilos.textInput
    },
    viewEsqueceuSenha:{
        width: '90%', 
        marginTop:10,
        
    },
    viewPrincipal:{
        width:'100%',
        alignItems:'center', 
        flex:1
    },
    botao:{
        ...estilos.btnBasico,
        width:'90%',
        marginTop:20
    }

});


export default styles;