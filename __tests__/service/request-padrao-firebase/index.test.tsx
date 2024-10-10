import { criarDocumento, lerDocumento, updateDocumento, deletarDocumento } from '../../../src/service/request-padrao-firebase';
import { getFirestore, doc, setDoc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, collection, where, query } from 'firebase/firestore';


jest.mock('firebase/firestore', () => {
    const originalModule = jest.requireActual('firebase/firestore');
    return {
        __esModule: true,
        ...originalModule,
        getFirestore: jest.fn(), // Mocar a função getFirestore
        doc: jest.fn(),
        setDoc: jest.fn(),
        addDoc: jest.fn(),
        getDoc: jest.fn(),
        getDocs: jest.fn(),
        updateDoc: jest.fn(),
        deleteDoc: jest.fn(),
        collection: jest.fn(),
        query: jest.fn(),
        where: jest.fn(),
    };
});

describe('CRUD Firebase Firestore', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('criarDocumento', () => {
        const path = 'users';
        const data = { nome: 'João', idade: 30 };

        it('deve criar um documento no Firestore', async () => {
            const mockDocRef = { id: 'mockDocId' };
            (addDoc as jest.Mock).mockResolvedValueOnce(mockDocRef);

            const result = await criarDocumento(path, data);

            expect(addDoc).toHaveBeenCalledWith(collection(getFirestore(), path), data);
            expect(result).toEqual(mockDocRef);
        });
    });

    describe('lerDocumento', () => {
        const path = 'users';
        const docId = 'mockDocId';

        it('deve ler um documento específico no Firestore', async () => {
            const mockDocSnap = {
                exists: () => true,
                data: () => ({ nome: 'João', idade: 30 }),
            };
            (getDoc as jest.Mock).mockResolvedValueOnce(mockDocSnap);

            const result = await lerDocumento(path, docId);

            expect(getDoc).toHaveBeenCalledWith(doc(getFirestore(), path, docId));
            expect(result).toEqual({ nome: 'João', idade: 30 });
        });

        it('deve ler todos os documentos de uma coleção no Firestore', async () => {
            const mockDocsSnap = [
                { id: 'doc1', data: () => ({ nome: 'João', idade: 30 }) },
                { id: 'doc2', data: () => ({ nome: 'Maria', idade: 25 }) },
            ];
            (getDocs as jest.Mock).mockResolvedValueOnce({ docs: mockDocsSnap });

            const result = await lerDocumento(path);

            expect(getDocs).toHaveBeenCalledWith(collection(getFirestore(), path));
            expect(result).toEqual([
                { id: 'doc1', nome: 'João', idade: 30 },
                { id: 'doc2', nome: 'Maria', idade: 25 },
            ]);
        });

        it('deve aplicar um filtro ao ler documentos com where no Firestore', async () => {
            const campoFiltro = 'idade';
            const valorFiltro = 30;
            const mockDocsSnap = [
                { id: 'doc1', data: () => ({ nome: 'João', idade: 30 }) },
            ];
            (getDocs as jest.Mock).mockResolvedValueOnce({ docs: mockDocsSnap });
    
            const result = await lerDocumento(path, null, campoFiltro, valorFiltro);
    
            expect(getDocs).toHaveBeenCalledWith(query(
                collection(getFirestore(), path),
                where(campoFiltro, '==', valorFiltro)
            ));
            expect(result).toEqual([
                { id: 'doc1', nome: 'João', idade: 30 },
            ]);
        });
    
        it('deve retornar null se o documento não existir', async () => {
            const mockDocSnap = {
                exists: () => false,
            };
            (getDoc as jest.Mock).mockResolvedValueOnce(mockDocSnap);
    
            const result = await lerDocumento(path, docId);
    
            expect(getDoc).toHaveBeenCalledWith(doc(getFirestore(), path, docId));
            expect(result).toBeNull();
        });
    });

    describe('updateDocumento', () => {
        const path = 'users';
        const docId = 'mockDocId';
        const data = { idade: 31 };

        it('deve atualizar um documento no Firestore', async () => {
            (updateDoc as jest.Mock).mockResolvedValueOnce(undefined);

            await updateDocumento(path, docId, data);

            expect(updateDoc).toHaveBeenCalledWith(doc(getFirestore(), path, docId), data);
        });
    });

    describe('deletarDocumento', () => {
        const path = 'users';
        const docId = 'mockDocId';

        it('deve excluir um documento no Firestore', async () => {
            (deleteDoc as jest.Mock).mockResolvedValueOnce(undefined);

            await deletarDocumento(path, docId);

            expect(deleteDoc).toHaveBeenCalledWith(doc(getFirestore(), path, docId));
        });
    });
});