import { IPaginaForm } from "../shared/pagina.crate.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Prioridade, Tarefa } from "./tarefa.model.js";
import { TarefaRepositorioLocalStorage } from "./tarefa.repository.ls.js";

class TarefaCadastro implements IPaginaHTML, IPaginaForm{

    private txtTitulo : HTMLInputElement;
    private selectPrioridade : HTMLSelectElement;
    private btnSalvar : HTMLButtonElement;

    private idSelecionado : string;

    constructor(private repositorioTaefas : IRepositorio<Tarefa>, id?: string){

        this.configurarElementos();

        if(id){

            this.idSelecionado = id;

            const tarefaSelecionada = this.repositorioTaefas.selecionarPorId(id);

            if(tarefaSelecionada)
                this.preencherFormulario(tarefaSelecionada);

        }
    }

    gravarRegistros(): void {

        const tarefa = this.obterDadosFormularios();

        if(!this.validarTituloTarefa(tarefa)){

            alert("O campo título não pode fica vazio!")
            return;

        }

        if(this.tarefaExistente(tarefa)){

            alert("Tarefa duplicada!");
            return;

        }

        if(!tarefa.id)
            this.repositorioTaefas.inserir(tarefa);
        else   
            this.repositorioTaefas.editar(tarefa.id, tarefa)

        window.location.href = "tarefa.list.html"

    }

    private preencherFormulario(tarefaSelecionada : Tarefa){

        this.txtTitulo.value = tarefaSelecionada.titulo;
        this.selectPrioridade.value = tarefaSelecionada.prioridade;

    }

    private obterDadosFormularios(): Tarefa{

        const titulo = this.txtTitulo.value;
        const prioridade = this.selectPrioridade.value as Prioridade;

        const tarefa = new Tarefa(titulo, prioridade);

        tarefa.id = this.idSelecionado;

        return tarefa;

    }
    
    configurarElementos(): void {
        
        this.txtTitulo = document.getElementById("txtTitulo") as HTMLInputElement;
        this.selectPrioridade = document.getElementById("selectPrioridade") as HTMLSelectElement;
        this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros())

    }

    tarefaExistente(essaTarefa : Tarefa) : boolean{

        const tarefas = this.repositorioTaefas.selecionarTodos();
        let teste : string = "";
        let tarefaExiste = false;

        tarefas.forEach(tarefa =>{

            teste = tarefa.titulo;

            if(tarefa.id !== essaTarefa.id && teste === essaTarefa.titulo)
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

const params = new URLSearchParams(window.location.search);

const id = params.get("id") as string;

new TarefaCadastro(new TarefaRepositorioLocalStorage(), id);