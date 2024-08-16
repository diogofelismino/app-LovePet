
export function validaEmail(email:string) {
    return  /\S+@\S+\.\S+/.test(email);
}