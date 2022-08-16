import { EntidadeBase } from "../shared/entidade.model.js";

export enum Prioridade{

    Baixa = "Baixa",
    Media = "Média",
    Alta  = "Alta"

}

export class Tarefa extends EntidadeBase{

    public titulo : string;
    public prioridade : Prioridade;
    public dataCriacao : Date;
    public DataConclusao? : Date;

    constructor(titulo : string, prioidade  : Prioridade, id? : string){

        super();

        if(id){

            this.id = id;

        }

        this.titulo = titulo;
        this.prioridade  = prioidade;
        this.dataCriacao = new Date();

    }
}