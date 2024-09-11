import { StyleSheet } from "react-native";
import * as color from "../../styles/colors";

const styles = (iconBack: boolean = false) => StyleSheet.create({
    viewGeral: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    viewHeader: {
        backgroundColor: color.BACKGROUND_PINK,
        borderColor: color.BACKGROUND_CARD_05,
        borderWidth: 1,
        fontWeight: '100',
        flexDirection: 'row',
        height: 80,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    viewTitulo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: iconBack ? "flex-start" : "center",
        marginBottom: 10,
    },
    viewIcon: {
        flex: 0.45,
        justifyContent: 'center',
        marginLeft: 10,
        marginBottom: 10,
    },
    fontTitle: {
        fontSize: 20,
        color: 'black',
        fontWeight:"500"
    }

});

export default styles;