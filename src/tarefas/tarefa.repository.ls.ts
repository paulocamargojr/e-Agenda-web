import { Guid } from "../shared/guid.model.js";
import { IRepositorioSerializavel } from "../shared/repositorio-serializavel.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Tarefa } from "./tarefa.model.js";

export class TarefaRepositorioLocalStorage implements IRepositorio<Tarefa>, IRepositorioSerializavel{
    
    private readonly localStorage : Storage;
    private readonly chaveLocal : string;

    private tarefas : Tarefa[];

    constructor(){

        this.localStorage = window.localStorage;
        this.tarefas = this.selecionarTodos();

    }

    gravar(): void {
        
        const tarefasJsonString = JSON.stringify(this.tarefas);
        this.localStorage.setItem(("tarefas"), tarefasJsonString);

    }

    inserir(registro: Tarefa): void {

        registro.id = new Guid().gerarNovoId();

        this.tarefas.push(registro);

        this.gravar();

    }

    editar(id: string, novoRegistro: Tarefa): void {
        
        const indexSelecionado = this.tarefas.findIndex(x => x.id === id);

        this.tarefas[indexSelecionado] = {

            id : id,
            titulo : novoRegistro.titulo,
            dataCriacao : novoRegistro.dataCriacao,
            prioridade : novoRegistro.prioridade

        }

        this.gravar();
    }

    excluir(id: string): void {
        
        this.tarefas = this.tarefas.filter(x => x.id !== id);

        this.gravar();

    }

    selecionarPorId(id: string): Tarefa | undefined{

        return this.tarefas.find(x => x.id === id);
    }

    selecionarTodos(): Tarefa[] {

        const dados = this.localStorage.getItem("tarefas");

        if(!dados)
            return [];
            
        return JSON.parse(dados); 

    }

}