import { Guid } from "../shared/guid.model.js";
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
        registro.id = new Guid().gerarNovoId();
        this.contatos.push(registro);
        this.gravar();
    }
    editar(id, novoRegistro) {
        const indexSelecionado = this.contatos.findIndex(x => x.id === id);
        this.contatos[indexSelecionado] = {
            id: id,
            nome: novoRegistro.nome,
            email: novoRegistro.email,
            telefone: novoRegistro.telefone,
            empresa: novoRegistro.empresa,
            cargo: novoRegistro.cargo
        };
        this.gravar();
    }
    excluir(id) {
        this.contatos = this.contatos.filter(x => x.id !== id);
        this.gravar();
    }
    selecionarPorId(id) {
        return this.contatos.find(x => x.id === id);
    }
    selecionarTodos() {
        const dados = this.localStorage.getItem("contatos");
        if (!dados)
            return [];
        return JSON.parse(dados);
    }
}
