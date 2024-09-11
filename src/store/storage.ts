import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loadingReducer from './loading/loading';
import usuarioReducer from './usuario/usuario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['usuario'] // Indica que queremos persistir apenas o user
};

const rootReducer = combineReducers({
  loading: loadingReducer,
  usuario: usuarioReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);