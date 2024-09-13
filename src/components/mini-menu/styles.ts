import { StyleSheet } from "react-native";
import * as pallete from "../../styles/colors";
const styles = StyleSheet.create({
    viewContent: {
        borderRadius: 20,
        borderColor: pallete.MENU_SELECIONADO,
        backgroundColor: pallete.BACKGROUND_MINI_MENU,
        borderWidth: 1.3
    },
    viewStyle: {
        position: 'absolute',
        top: 50,
        borderRadius: 20

    },
});

export default styles;