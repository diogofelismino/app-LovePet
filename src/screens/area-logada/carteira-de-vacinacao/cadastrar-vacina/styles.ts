import { StyleSheet } from "react-native";
import estilos from "../../../../styles/estilos";
import * as color from "../../../../styles/colors";


const styles = StyleSheet.create({
    viewCentro: {
        flex: 2.6,
        alignItems: 'center',
    },
    viewDropDonw: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
    },
    botao: {
        ...estilos.btnBasico,
        width: '90%',
        marginTop: 20
    },
    titulo:{
        fontSize: 16,
        color: color.COLOR_FONT_CARD,
        fontWeight:"600"
    }
});

export default styles;