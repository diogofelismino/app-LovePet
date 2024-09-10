import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Avatar } from 'react-native-paper'
import pet01 from "../../assets/img/pets/pet01.jpg"
import pet02 from "../../assets/img/pets/pet02.jpg"
import pet03 from "../../assets/img/pets/pet03.jpg"
import pet04 from "../../assets/img/pets/pet04.jpg"
import pet05 from "../../assets/img/pets/pet05.jpg"

export default function AvatarPet({name, img=null}: any) {

    const imgs = [pet01, pet02, pet03, pet04, pet05];

    const radomImg = imgs[Math.floor(Math.random() * imgs.length)]

    useEffect(() => {
        if(img == null){
            img = imgs[Math.floor(Math.random() * imgs.length)]
        }
    },[])


    return (
        <View style={{margin:10, alignItems:'center'}}>
            <Avatar.Image size={90} source={radomImg} />
            <Text >{name}</Text>
        </View>
    )
}

