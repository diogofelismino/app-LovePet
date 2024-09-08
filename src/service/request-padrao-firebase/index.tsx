import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";


/**
 * Função genérica para criar um documento em uma coleção ou subcoleção
 * @param {string} path Caminho da coleção ou subcoleção
 * @param {object} dados Dados a serem inseridos
 * @param {string} [id] ID do documento, se necessário
 * @returns {object} Documento criado
 */
export async function criarDocumento(path:any, dados:any, id:any = null) {
    try {
        let docRef;
        if (id) {
            docRef = await doc(db, path, id);
            await setDoc(docRef, dados);
        } else {
            docRef = await addDoc(collection(db, path), dados);
        }
        return docRef;
    } catch (error) {
        console.error("Erro ao criar documento:", error);
        throw error;
    }
}

/**
 * Função genérica para ler documentos de uma coleção ou subcoleção
 * @param {string} path Caminho da coleção ou subcoleção
 * @param {string} [id] ID do documento, se necessário
 * @returns {object} Documento ou lista de documentos
 */
export async function lerDocumento(path:any, id:any = null) {
    try {
        if (id) {
            const docRef = doc(db, path, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("Nenhum documento encontrado.");
                return null;
            }
        } else {
            const querySnapshot = await getDocs(collection(db, path));
            const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return documents;
        }
    } catch (error) {
        console.error("Erro ao ler documento(s):", error);
        throw error;
    }
}

/**
 * Função genérica para atualizar um documento em uma coleção ou subcoleção
 * @param {string} path Caminho da coleção ou subcoleção
 * @param {string} id ID do documento a ser atualizado
 * @param {object} dados Novos dados para atualizar
 * @returns {void}
 */
export async function updateDocumento(path:any, id:any, dados:any) {
    try {
        const docRef = doc(db, path, id);
        await updateDoc(docRef, dados);
    } catch (error) {
        console.error("Erro ao atualizar documento:", error);
        throw error;
    }
}

/**
 * Função genérica para excluir um documento de uma coleção ou subcoleção
 * @param {string} path Caminho da coleção ou subcoleção
 * @param {string} id ID do documento a ser excluído
 * @returns {void}
 */
export async function deletarDocumento(path:any, id:any) {
    try {
        const docRef = doc(db, path, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Erro ao excluir documento:", error);
        throw error;
    }
}