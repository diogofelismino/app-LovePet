import React from 'react';

import {
  Text,
  View,
  SafeAreaView
} from 'react-native';
import App from './src';

export default function Index() {

  return(
        <SafeAreaView style={{flex:1}}>
          <App/>
        </SafeAreaView>
  )
}
