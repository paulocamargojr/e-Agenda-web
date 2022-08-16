import { Contato } from "./contato.model.js";
export class ContatoRepositorioLocalStorage {
    constructor() {
        this.localStorage = window.localStorage;
        this.contatos = this.selecionarTodos();
    }
    gravar() {
        const tarefasJsonString = JSON.stringify(this.contatos);
        this.localStorage.setItem(("contatos"), tarefasJsonString);
    }
    inserir(registro) {
        this.contatos.push(registro);
        this.gravar();
    }
    editar(id, novoRegistro) {
        const nada = id;
        const outroNada = novoRegistro;
    }
    excluir(id) {
        const nada = id;
    }
    selecionarPorId(id) {
        const teste = id;
        return new Contato("", "", "", "", "");
    }
    selecionarTodos() {
        const dados = this.localStorage.getItem("contatos");
        if (!dados)
            return [];
        return JSON.parse(dados);
    }
}
