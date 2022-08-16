import { EntidadeBase } from "../shared/entidade.model.js";
export var Prioridade;
(function (Prioridade) {
    Prioridade["Baixa"] = "Baixa";
    Prioridade["Media"] = "M\u00E9dia";
    Prioridade["Alta"] = "Alta";
})(Prioridade || (Prioridade = {}));
export class Tarefa extends EntidadeBase {
    constructor(titulo, prioidade, id) {
        super();
        if (id) {
            this.id = id;
        }
        this.titulo = titulo;
        this.prioridade = prioidade;
        this.dataCriacao = new Date();
    }
}
