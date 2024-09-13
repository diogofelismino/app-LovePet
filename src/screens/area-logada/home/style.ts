import { StyleSheet } from "react-native";
import * as pallete from '../../../styles/colors';

const styles = StyleSheet.create({
    linha: {
        borderColor: pallete.MENU_SELECIONADO,
        borderWidth: 1,
        marginVertical: 10,
    },
    viewRodaPe: {
        flex: 0.27,
        justifyContent: 'center',
        width: '100%',
    },
    img: {
        width: '100%',
        height: "50%",
        marginTop: 5,
    },
});


export default styles;