import {Text, View } from 'react-native'
import React from 'react'
import Animated, { BounceIn } from 'react-native-reanimated';
import * as AnimaTable from 'react-native-animatable';
import styles from './styles';
import logoImg from '../../../assets/img/Logo.png'

export default function TelaSplash({ navigation }:any) {

    const entrada = BounceIn.duration(700);

  return (
    <View style={styles.container}>
    <Animated.View  style={styles.container} entering={entrada}>
        <AnimaTable.Image 
            animation={'bounceOut'}
            delay={3000}
            duration={700}
            onAnimationEnd={() => {
                    navigation.replace("Login");
            }}
            source={logoImg}
            resizeMode='contain'
            style={{
                width:  300, 
                height: 300, 
                alignSelf: 'center'}}
        />
    </Animated.View>
</View>
  )
}

