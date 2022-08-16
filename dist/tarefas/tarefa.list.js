import { TarefaRepositorioLocalStorage } from "./tarefa.repository.ls.js";
class TarefaPageList {
    constructor(repositorioTarefa) {
        this.repositorioTarefa = repositorioTarefa;
        this.configurarElementos();
        this.atualizaTabela();
    }
    configurarElementos() {
        this.tabela = document.getElementById("listagem");
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
            const celulaBotoes = novaLinha.insertCell();
            const btnEditar = document.createElement("a");
            btnEditar.innerText = "Editar";
            btnEditar.className = "btn btn-primary me-3";
            btnEditar.addEventListener("click", () => {
                const idSelecionado = novaLinha.cells[0].innerText;
                window.location.href = `tarefa.create.html?id=${idSelecionado}`;
            });
            const btnExcluir = document.createElement("a");
            btnExcluir.innerText = "Excluir";
            btnExcluir.className = "btn btn-warning";
            btnExcluir.addEventListener("click", () => {
                const idSelecionado = novaLinha.cells[0].innerText;
                this.repositorioTarefa.excluir(idSelecionado);
                window.location.reload();
            });
            celulaBotoes.appendChild(btnEditar);
            celulaBotoes.appendChild(btnExcluir);
        });
    }
}
new TarefaPageList(new TarefaRepositorioLocalStorage());
