import { validaEmail } from "../../src/utils/util"


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
});