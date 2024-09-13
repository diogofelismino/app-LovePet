import { StyleSheet } from "react-native";
import estilos from "../../../../styles/estilos";
import * as pallete from '../../../../styles/colors';

const styles = StyleSheet.create({
    conteinerimg: {
        ...estilos.centralizarViewFlex,
        height: 100,
        marginBottom: 40,
        width: '100%',

    },
    areaBtnClose: {
        width: '100%',
        alignItems: 'flex-end',
        marginRight: 10,
        marginTop: 32,

    },
    iconTab: {
        width: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    linha: {
        borderColor: pallete.MENU_SELECIONADO,
        borderWidth: 1,
        marginVertical:10,
    }
});

export default styles;