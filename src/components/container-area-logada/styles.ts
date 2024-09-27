import { StyleSheet } from "react-native";
import * as color from "../../styles/colors";

const styles = (iconBack: boolean = false, home: boolean = false) => StyleSheet.create({
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
        paddingHorizontal: home ? 10 : 0
    },
    viewTitulo: {
        flex: 3,
        justifyContent: 'center',
        alignItems:  "center",
        marginBottom: home ? 0 : 10,
    },
    viewIcon: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
        marginBottom: 10,
    },
    fontTitle: {
        fontSize: home ? 28 : 20,
        color: 'black',
        fontWeight: home ? "700" : "500"
    },
    viewBtnMenu: {
        flex: 1,
        justifyContent: 'center',
    },

    viewBtnSair: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',      
    },

});

export default styles;