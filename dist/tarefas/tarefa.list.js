import { TarefaRepositorioLocalStorage } from "./tarefa.repository.ls.js";
class TarefaPageList {
    constructor(repositorioTarefa) {
        this.repositorioTarefa = repositorioTarefa;
        this.configurarElementos();
        this.atualizaTabela();
    }
    configurarElementos() {
        this.tabela = document.getElementById("tabela");
    }
    atualizaTabela() {
        const tarefas = this.repositorioTarefa.selecionarTodos();
        let tabela = this.tabela.getElementsByTagName("tbody")[0];
        tarefas.forEach(tarefa => {
            const novaLinha = tabela.insertRow();
            Object.values(tarefa).forEach((valor) => {
                const novaCelula = novaLinha.insertCell();
                novaCelula.innerText = valor;
            });
        });
    }
}
new TarefaPageList(new TarefaRepositorioLocalStorage());
