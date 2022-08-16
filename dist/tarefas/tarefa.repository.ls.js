import { Guid } from "../shared/guid.model.js";
export class TarefaRepositorioLocalStorage {
    constructor() {
        this.localStorage = window.localStorage;
        this.tarefas = this.selecionarTodos();
    }
    gravar() {
        const tarefasJsonString = JSON.stringify(this.tarefas);
        this.localStorage.setItem(("tarefas"), tarefasJsonString);
    }
    inserir(registro) {
        registro.id = new Guid().gerarNovoId();
        this.tarefas.push(registro);
        this.gravar();
    }
    editar(id, novoRegistro) {
        const indexSelecionado = this.tarefas.findIndex(x => x.id === id);
        this.tarefas[indexSelecionado] = {
            id: id,
            titulo: novoRegistro.titulo,
            dataCriacao: novoRegistro.dataCriacao,
            prioridade: novoRegistro.prioridade
        };
        this.gravar();
    }
    excluir(id) {
        this.tarefas = this.tarefas.filter(x => x.id !== id);
        this.gravar();
    }
    selecionarPorId(id) {
        return this.tarefas.find(x => x.id === id);
    }
    selecionarTodos() {
        const dados = this.localStorage.getItem("tarefas");
        if (!dados)
            return [];
        return JSON.parse(dados);
    }
}
