import React from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  Text,
  View,
  SafeAreaView
} from 'react-native';
import App from './src';
import { PaperProvider } from 'react-native-paper';

export default function Index() {

  return (
    <PaperProvider 
    settings={{
      icon: props => <AntDesign {...props} />,
    }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <App />
      </SafeAreaView>
    </PaperProvider>

  )
}
