import { Guid } from "../shared/guid.model.js";
import { IRepositorioSerializavel } from "../shared/repositorio-serializavel.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./contato.model.js";

export class ContatoRepositorioLocalStorage implements IRepositorio<Contato>, IRepositorioSerializavel{
    
    private readonly localStorage : Storage;
    private readonly chaveLocal : string;

    private contatos : Contato[];

    constructor(){

        this.localStorage = window.localStorage;
        this.contatos = this.selecionarTodos();

    }

    gravar(): void {
        
        const tarefasJsonString = JSON.stringify(this.contatos);
        this.localStorage.setItem(("contatos"), tarefasJsonString);

    }

    inserir(registro: Contato): void {

        registro.id = new Guid().gerarNovoId();

        this.contatos.push(registro);

        this.gravar();

    }

    editar(id: string, novoRegistro: Contato): void {

        const indexSelecionado = this.contatos.findIndex(x => x.id === id);

        this.contatos[indexSelecionado] = {

            id : id,
            nome : novoRegistro.nome,
            email : novoRegistro.email,
            telefone : novoRegistro.telefone,
            empresa : novoRegistro.empresa,
            cargo : novoRegistro.cargo

        }

        this.gravar();
        
    }

    excluir(id: string): void {
        
        this.contatos = this.contatos.filter(x => x.id !== id);

        this.gravar();

    }

    selecionarPorId(id: string): Contato | undefined {

        return this.contatos.find(x => x.id === id);
    }

    selecionarTodos(): Contato[] {

        const dados = this.localStorage.getItem("contatos");

        if(!dados)
            return [];
            
        return JSON.parse(dados); 

    }

}