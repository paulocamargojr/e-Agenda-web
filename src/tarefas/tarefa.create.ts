import { IPaginaForm } from "../shared/pagina.crate.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Prioridade, Tarefa } from "./tarefa.model.js";
import { TarefaRepositorioLocalStorage } from "./tarefa.repository.ls.js";

class TarefaCadastro implements IPaginaHTML, IPaginaForm{

    private txtTitulo : HTMLInputElement;
    private selectPrioridade : HTMLSelectElement;
    private btnSalvar : HTMLButtonElement;

    constructor(private repositorioTaefas : IRepositorio<Tarefa>){

        this.configurarElementos();

    }

    gravarRegistros(): void {

        const prioridade = this.selectPrioridade.value as Prioridade;

        const novaTarefa = new Tarefa(this.txtTitulo.value, prioridade);

        if(!this.validarTituloTarefa(novaTarefa)){

            alert("O campo título não pode fica vazio!")
            return;

        }

        if(this.tarefaExistente(novaTarefa.titulo)){

            alert("Tarefa duplicada!");
            return;

        }

        this.repositorioTaefas.inserir(novaTarefa);

        window.location.href = "tarefa.list.html"

    }
    
    configurarElementos(): void {
        
        this.txtTitulo = document.getElementById("txtTitulo") as HTMLInputElement;
        this.selectPrioridade = document.getElementById("selectPrioridade") as HTMLSelectElement;
        this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros())

    }

    tarefaExistente(titulo : string) : boolean{

        const tarefas = this.repositorioTaefas.selecionarTodos();
        let teste : string = "";
        let tarefaExiste = false;

        tarefas.forEach(tarefa =>{

            teste = tarefa.titulo;

            if(teste === titulo)
                tarefaExiste = true;

            
        });

        return tarefaExiste;
    }

    validarTituloTarefa(tarefa : Tarefa) : boolean{

        if(tarefa.titulo === "")
            return false;

        return true;
    }
}

new TarefaCadastro(new TarefaRepositorioLocalStorage());