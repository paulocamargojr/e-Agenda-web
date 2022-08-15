export class Tarefa {
    //dataConclusao? : Date;
    constructor(id, titulo, prioridade, dataCriacao) {
        this.id = id;
        this.titulo = titulo;
        this.prioridade = prioridade;
        this.dataCriacao = dataCriacao;
    }
}
export var Prioridade;
(function (Prioridade) {
    Prioridade[Prioridade["Baixa"] = 0] = "Baixa";
    Prioridade[Prioridade["M\u00E9dia"] = 1] = "M\u00E9dia";
    Prioridade[Prioridade["Alta"] = 2] = "Alta";
})(Prioridade || (Prioridade = {}));
