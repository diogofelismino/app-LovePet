import { useDispatch, useSelector } from "react-redux";
import { login, logout, restoreSession } from "../../store/usuario/usuario";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { UsuarioCadastroDto } from "../../model/Dto/cadastrar-usuario-dto/usuario-cadastro-dto";
import { UsuarioDto } from "../../model/Dto/usuario-dto/usuario-dto";
import { UsuarioLogadoDto } from "../../model/Dto/usuario-dto/usuario-logado-dto";


export const useUsuario = () => {
    const dispatch = useDispatch();
    const usuario: UsuarioLogadoDto = useSelector((state:any) => state.usuario);

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