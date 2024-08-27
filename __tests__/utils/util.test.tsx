import { validaEmail, validarCPF } from "../../src/utils/util"


describe("../../src/utils/util", () => {
    describe("validaEmail", () => {

        it("deve retornar true caso o email esteja no formato correto", () => {
            const result = validaEmail("teste@gmail.com");
            expect(true).toEqual(result);
        });

        it("deve retornar false caso o email esteja no formato incorreto", () => {
            const result = validaEmail("testegmail.com");
            expect(false).toEqual(result);
        });
    });

    describe('validarCPF', () => {
        it('deve validar um CPF válido', () => {
          expect(validarCPF('123.456.789-09')).toBe(true); // Substitua por um CPF válido
        });
      
        it('deve invalidar um CPF com dígitos inválidos', () => {
          expect(validarCPF('123.456.789-00')).toBe(false); // Substitua por um CPF inválido
        });
      
        it('deve invalidar um CPF com caracteres não numéricos', () => {
          expect(validarCPF('abc.def.ghi-jk')).toBe(false);
        });
      
        it('deve invalidar um CPF com menos de 11 dígitos', () => {
          expect(validarCPF('123.456.789')).toBe(false);
        });
      
        it('deve invalidar um CPF com mais de 11 dígitos', () => {
          expect(validarCPF('123.456.789-01234')).toBe(false);
        });
      
        it('deve invalidar um CPF onde todos os dígitos são iguais', () => {
          expect(validarCPF('111.111.111-11')).toBe(false);
        });
      });
});