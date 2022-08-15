import { IPageList } from "../shared/page.list.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./contato.model.js";
import { ContatoRepositorioLocalStorage } from "./contato.repository.ls.js";

class ContatoPageList implements IPaginaHTML, IPageList{

    tabela: HTMLTableElement;

    constructor(private repositorioContato : IRepositorio<Contato>){

        this.configurarElementos();
        this.atualizaTabela();

    }

    configurarElementos(): void {
        
        this.tabela = document.getElementById("tabela") as HTMLTableElement;

    }

    atualizaTabela(): void {
        
        const contatos = this.repositorioContato.selecionarTodos();

        let tabela = this.tabela.getElementsByTagName("tbody")[0];

        contatos.forEach(contato =>{

            const novaLinha = tabela.insertRow();

            Object.values(contato).forEach((valor : any) =>{

                const novaCelula = novaLinha.insertCell();

                novaCelula.innerText = valor;

            });
        })
    }
}

new ContatoPageList(new ContatoRepositorioLocalStorage());