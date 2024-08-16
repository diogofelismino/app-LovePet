import { login } from '../../../src/service/usuario/request-user';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { auth } from '../../../src/config/firebase';
 
jest.mock('firebase/auth');

jest.mock('../../../src/config/firebase', () => {
    const originalModule = jest.requireActual('../../../src/config/firebase');
    return {
      __esModule: true,
      ...originalModule,
      auth: { signInWithEmailAndPassword: jest.fn() },
    };
  });

  describe('login', () => {
    const email = 'pedrocrac2306@gmail.com.com';
    const password = 'animeQ123';
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('deve retornar o usuário quando o login for bem-sucedido', async () => {
      const mockUser = { uid: '12345' };
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
        user: mockUser,
      });
      const result = await login(email, password);

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
      expect(result).toEqual(mockUser);
    });
  
    it('deve exibir um alerta quando as credenciais forem inválidas', async () => {
      const mockAlert = jest.spyOn(Alert, 'alert');
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce({
        code: 'auth/invalid-credential',
        message: 'Invalid credentials',
      });
  
      await login(email, password);
  
      expect(mockAlert).toHaveBeenCalledWith("Login inválido", "O Email ou a Senha estão incorretos.");
    });
  });