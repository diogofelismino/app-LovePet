import { StyleSheet } from "react-native";


const styles = (backgroundColor: string = "#FFF", usaScroll: boolean = false) => StyleSheet.create({
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
        elevation: 5,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,

        height: usaScroll ? 200 : 0,
        flex: usaScroll ? 0 : 1
    }
})

export default styles;