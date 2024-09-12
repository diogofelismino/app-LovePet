export class PetDto {
    nome_pet: string
    raca: string
    idade: number|null
    sexo: string
    id:any
    data_pet:any

    constructor( nome_pet: string, raca: string, idade: number|null, sexo: string, id: any, data_pet:any) {     
        this.nome_pet = nome_pet;
        this.raca = raca;
        this.idade = idade;
        this.sexo = sexo;
        this.id = id;
        this.data_pet = data_pet;
    }

}