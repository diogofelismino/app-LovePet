import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: "90%",
        marginTop: 5,
    },
    viewFooter:{
        flex: 0.2, 
        alignItems: 'center', 
        justifyContent: 'center', 
        margin: 10, 
        flexDirection: 'row',
    },
    viewImg:{
        flex: 1, 
        alignItems: 'center', 
        marginBottom:20 
    },
    texto:{
        fontSize:24, 
        color:'#000', 
        fontWeight:'600'
    },
    viewBtn:{
        flex: 1, 
        alignItems: 'flex-end' 
    }
});


export default styles;