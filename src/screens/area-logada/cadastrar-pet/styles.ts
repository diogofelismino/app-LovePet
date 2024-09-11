import { StyleSheet } from "react-native";
import  estilos from "../../../styles/estilos"

const styles = StyleSheet.create({

    viewCentro:{
        flex: 2.6, 
        alignItems: 'center' ,
    },
    viewDropDonw:{
        flexDirection: 'row', 
        width: '90%', 
        justifyContent:'space-between',
    },
    botao:{
        ...estilos.btnBasico,
        width:'90%',
        marginTop:20
    }
});

export default styles;