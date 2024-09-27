export class CompromissoDto {
    id:any
    data_hora: string|Date
    descricao: string
    titulo:string

    constructor(id: any, data_hora: string|Date, descricao: string, titulo:string) {     
        this.id = id;
        this.data_hora = data_hora;
        this.descricao = descricao;
        this.titulo = titulo;
    }

}