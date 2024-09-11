export class PetDto {
    nome_pet: string
    raca: string
    idade: number|null
    sexo: string
    pet_id:any

    constructor( nome_pet: string, raca: string, idade: number|null, sexo: string, id: any) {     
        this.nome_pet = nome_pet;
        this.raca = raca;
        this.idade = idade;
        this.sexo = sexo;
        this.pet_id = id;
    }
}