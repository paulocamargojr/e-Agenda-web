import { IRepositorioSerializavel } from "../shared/repositorio-serializavel.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./contato.model.js";

export class ContatoRepositorioLocalStorage implements IRepositorio<Contato>, IRepositorioSerializavel{
    
    private readonly localStorage : Storage;
    private readonly chaveLocal : string;

    private readonly contatos : Contato[];

    constructor(){

        this.localStorage = window.localStorage;
        this.contatos = this.selecionarTodos();

    }

    gravar(): void {
        
        const tarefasJsonString = JSON.stringify(this.contatos);
        this.localStorage.setItem(("contatos"), tarefasJsonString);

    }

    inserir(registro: Contato): void {

        this.contatos.push(registro);

        this.gravar();

    }

    editar(id: string, novoRegistro: Contato): void {

        const nada = id;
        const outroNada = novoRegistro;
        
    }

    excluir(id: string): void {
        
        const nada = id;

    }

    selecionarPorId(id: string): Contato | undefined {

        const teste = id;

        return new Contato("", "", "", "", "");
    }

    selecionarTodos(): Contato[] {

        const dados = this.localStorage.getItem("contatos");

        if(!dados)
            return [];
            
        return JSON.parse(dados); 

    }

}