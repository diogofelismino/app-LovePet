import React from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Text,
  View,
  SafeAreaView
} from 'react-native';
import App from './src';
import { PaperProvider } from 'react-native-paper';
import CustomTypeIcon from './src/components/custom-type-icon';
import { Provider } from 'react-redux';
import { store } from './src/store/storage';

export default function Index() {

  return (
    <Provider store={store}>
      <PaperProvider
        settings={{
          icon: props => <CustomTypeIcon {...props} />,
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <App />
        </SafeAreaView>
      </PaperProvider>
    </Provider>

  )
}
