import { createSlice } from "@reduxjs/toolkit";
import { UsuarioLogadoDto } from "../../model/Dto/usuario-dto/usuario-logado-dto";
import AsyncStorage from "@react-native-async-storage/async-storage";


const initialState: UsuarioLogadoDto = {
    usuario: { nome: '', cpf: '', senha: '', id: '', email: ''},
    token: ''
}

const userSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
      login: (state, action) => {
        state.usuario = action.payload.usuario;
        state.token = action.payload.token;
        AsyncStorage.setItem('usuario', JSON.stringify(action.payload)); // Salva no AsyncStorage
      },
      logout: (state) => {
        state.usuario = { nome: '', cpf: '', senha: '', id: '', email: '' };
        state.token = '';
        AsyncStorage.removeItem('usuario'); // Remove do AsyncStorage
      },
      restoreSession: (state, action) => {
        state.usuario = action.payload.usuario;
        state.token = action.payload.token;
      }
    }
  });
  
  export const { login, logout, restoreSession } = userSlice.actions;
  export default userSlice.reducer;