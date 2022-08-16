import { ContatoRepositorioLocalStorage } from "./contato.repository.ls.js";
class ContatoPageList {
    constructor(repositorioContato) {
        this.repositorioContato = repositorioContato;
        this.configurarElementos();
        this.atualizaTabela();
    }
    configurarElementos() {
        this.tabela = document.getElementById("listagem");
    }
    atualizaTabela() {
        const contatos = this.repositorioContato.selecionarTodos();
        let tabela = this.tabela.getElementsByTagName("tbody")[0];
        contatos.forEach(contato => {
            const novaLinha = tabela.insertRow();
            Object.values(contato).forEach((valor) => {
                const novaCelula = novaLinha.insertCell();
                novaCelula.innerText = valor;
            });
            const celulaBotoes = novaLinha.insertCell();
            const btnEditar = document.createElement("a");
            btnEditar.innerText = "Editar";
            btnEditar.className = "btn btn-primary me-3";
            btnEditar.addEventListener("click", () => {
                const idSelecionado = novaLinha.cells[0].innerText;
                window.location.href = `contato.create.html?id=${idSelecionado}`;
            });
            const btnExcluir = document.createElement("a");
            btnExcluir.innerText = "Excluir";
            btnExcluir.className = "btn btn-warning";
            btnExcluir.addEventListener("click", () => {
                const idSelecionado = novaLinha.cells[0].innerText;
                this.repositorioContato.excluir(idSelecionado);
                window.location.reload();
            });
            celulaBotoes.appendChild(btnEditar);
            celulaBotoes.appendChild(btnExcluir);
        });
    }
}
new ContatoPageList(new ContatoRepositorioLocalStorage());
