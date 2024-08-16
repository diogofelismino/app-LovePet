export const signInWithEmailAndPassword = jest.fn();
export const getAuth = jest.fn(() => ({
    currentUser: { uid: '12345' },
}));
