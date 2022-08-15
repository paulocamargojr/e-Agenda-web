import { IPageList } from "../shared/page.list.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Prioridade, Tarefa } from "./tarefa.model.js";
import { TarefaRepositorioLocalStorage } from "./tarefa.repository.ls.js";

class TarefaPageList implements IPaginaHTML, IPageList{

    tabela: HTMLTableElement;

    constructor(private repositorioTarefa : IRepositorio<Tarefa>){

        this.configurarElementos();
        this.atualizaTabela();

    }

    configurarElementos(): void {
        
        this.tabela = document.getElementById("tabela") as HTMLTableElement;

    }

    atualizaTabela(): void {
        
        const tarefas = this.repositorioTarefa.selecionarTodos();

        let tabela = this.tabela.getElementsByTagName("tbody")[0];

        tarefas.forEach(tarefa =>{

            const novaLinha = tabela.insertRow();

            Object.values(tarefa).forEach((valor : any) =>{

                const novaCelula = novaLinha.insertCell();

                novaCelula.innerText = valor;

            });
        })
    }
}

new TarefaPageList(new TarefaRepositorioLocalStorage());