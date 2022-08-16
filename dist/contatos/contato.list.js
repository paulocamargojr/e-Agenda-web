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
        });
    }
}
new ContatoPageList(new ContatoRepositorioLocalStorage());
