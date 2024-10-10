import React from 'react';

import {
  Text,
  View,
  SafeAreaView
} from 'react-native';
import App from './src';
import { Provider } from 'react-redux';
import { store } from './src/store/storage';
import { PaperProvider } from 'react-native-paper';
import CustomTypeIcon from './src/components/custom-type-icon';

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
