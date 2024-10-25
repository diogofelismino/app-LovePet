import { StyleSheet } from "react-native";


const styles = (backgroundColor: string = "#FFF", usaScroll: boolean = false, sombra: boolean = true) => StyleSheet.create({

    card: {
        backgroundColor: backgroundColor,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: backgroundColor,
        marginVertical: 15,
        marginHorizontal: 10,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        elevation: sombra ? 5 : 0,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: sombra ? 2 : 0,
        },
        shadowOpacity: sombra ? 0.2 : 0,
        shadowRadius: sombra ? 3.84 : 0,

        height: usaScroll ? 200 : 0,
        minHeight: usaScroll ? 0 : 200,
        flex: usaScroll ? 0 : 1
    }
})

export default styles;