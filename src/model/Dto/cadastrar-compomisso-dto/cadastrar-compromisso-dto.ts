export class CadastrarCompromissoDto {
    id:any
    titulo: string
    descricao: string
    data_hora: Date|null|string

    constructor(id: any, titulo: string, descricao: string, data_hora: Date|null|string) {     
        this.titulo = titulo;
        this.descricao = descricao;
        this.data_hora = data_hora;     
        this.id = id;
    }

}