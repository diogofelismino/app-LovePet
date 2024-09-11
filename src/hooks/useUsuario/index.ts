import { useDispatch, useSelector } from "react-redux";
import { login, logout, restoreSession } from "../../store/usuario/usuario";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";


export const useUsuario = () => {
    const dispatch = useDispatch();
    const usuario = useSelector((state:any) => state.usuario);
  
    // Função para realizar o login
    const signIn = async (usuario:any, token:any) => {
      const usuarioLogado = { usuario, token };
      dispatch(login(usuarioLogado));
    };
  
    // Função para realizar o logout
    const signOut = () => {
      dispatch(logout());
    };
  
    // Função para restaurar a sessão
    const restoreUserSession = async () => {
      const storedUser = await AsyncStorage.getItem('usuario');
      if (storedUser) {
        dispatch(restoreSession(JSON.parse(storedUser)));
      }
    };
  
    // Restaura a sessão ao carregar o componente
    useEffect(() => {
      restoreUserSession();
    }, []);
  
    return { usuario, signIn, signOut };
  };