export class VacinaDto {
    id:any
    nome_vacina: string
    data_aplicacao: Date|string
    proxima_dose: Date|null|string

    constructor(id: any, nome_vacina: string, data_aplicacao: Date|string, proxima_dose: Date|null|string) {     
        this.nome_vacina = nome_vacina;
        this.data_aplicacao = data_aplicacao;
        this.proxima_dose = proxima_dose;     
        this.id = id;
    }

}