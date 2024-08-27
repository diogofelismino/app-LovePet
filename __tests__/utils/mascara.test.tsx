import { aplicarMascaraCPF } from "../../src/utils/mascara";

describe("../../src/utils/mascara", () => {
    describe('aplicarMascaraCPF', () => {
        it('deve aplicar a máscara corretamente para um CPF válido', () => {
            expect(aplicarMascaraCPF('12345678909')).toBe('123.456.789-09');
        });

        it('deve retornar uma string vazia quando a entrada é vazia', () => {
            expect(aplicarMascaraCPF('')).toBe('');
        });

        it('deve aplicar a máscara corretamente para um CPF com caracteres misturados', () => {
            expect(aplicarMascaraCPF('123a456b789c09')).toBe('123.456.789-09');
        });

        it('deve aplicar a máscara corretamente para um CPF com menos de 11 dígitos', () => {
            expect(aplicarMascaraCPF('123456789')).toBe('123.456.789');
        });
    });
});