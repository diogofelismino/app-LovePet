import { StyleSheet } from "react-native";
import * as pallete from '../../../styles/colors';


const styles = (backgroundColor: string, flex: boolean = false, fontTitulo:number = 20,  fontSubTitulo:number = 24) => StyleSheet.create({
    card: {
        backgroundColor: backgroundColor,
        borderRadius: 15,
        marginVertical: 15,
        marginHorizontal: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        // height: usaScroll ? 200 : 0,
        flex: !flex ? 0 : 1,
        height: !flex ? 110 : 0,
        flexDirection: 'row'
    },
    viewImg: {
        backgroundColor: backgroundColor,
        flex: 1,
        borderTopStartRadius: 15,
        borderBottomStartRadius: 15,
        borderEndColor: backgroundColor,

        alignItems: 'center',
        justifyContent: 'center'
    },

    viewTexto: {
        backgroundColor: '#FFF',
        flex: 1.8,
        borderBottomEndRadius: 15,
        borderTopEndRadius: 15,
        borderEndColor: backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTitulo: {
        fontSize: fontTitulo,
        fontWeight: '600',
        color: pallete.COLOR_FONT_CARD,
    },
    textSubtitulo: {
        fontSize: fontSubTitulo,
        fontWeight: '600',
        color: pallete.COLOR_FONT_CARD,
        marginTop: 10,
    }
});

export default styles;