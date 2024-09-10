import { StyleSheet } from "react-native";

const styles = (color:string, colorBorder:string = '', tamanhoButton:number = 55, sombra = false) => StyleSheet.create({
    buttonAround: {
        backgroundColor: color,
        height: tamanhoButton,
        width: tamanhoButton,
        borderRadius:100,
        justifyContent:"center",
        alignItems:"center",
        borderColor:colorBorder,
        borderWidth:3,

        elevation: sombra ? 5 : 0,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: sombra ? 2: 0,
        },
        shadowOpacity: sombra ? 0.2 : 0,
        shadowRadius: sombra ? 3.84 : 0,
       

    }
})

export default styles;