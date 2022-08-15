import { IPaginaForm } from "../shared/pagina.crate.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./contato.model.js";
import { ContatoRepositorioLocalStorage } from "./contato.repository.ls.js";

class ContatoCadastro implements IPaginaHTML, IPaginaForm{

    private txtNome : HTMLInputElement;
    private txtEmail : HTMLInputElement;
    private txtTelefone : HTMLInputElement;
    private txtEmpresa : HTMLInputElement;
    private txtCargo : HTMLInputElement;
    private btnSalvar : HTMLButtonElement;

    constructor(private repositorioContato : IRepositorio<Contato>){

        this.configurarElementos();

    }

    gravarRegistros(): void {

        const novoContato = new Contato(this.txtNome.value, this.txtEmail.value, this.txtTelefone.value, this.txtEmpresa.value, this.txtCargo.value);

        if(this.validarNomeContato(novoContato.nome)){

            alert("O campo nome não pode ficar vazio!")
            return;

        }

        if(this.validarEmailContato(novoContato.email)){

            alert("E-mail inválido ou campo em branco!");
            return;

        }

        if(this.validarTelefoneContato(novoContato.telefone)){

            alert("Telefone inválido ou em branco!")
            return;

        }

        if(this.validarEmpresaContato(novoContato.empresa)){

            alert("O campo empresa não pode ficar em branco!");
            return;

        }

        if(this.validarCargoContato(novoContato.cargo)){

            alert("O campo cargo não pode ficar vazio!");
            return;

        }

        if(this.contatoExistente(novoContato)){

            alert("Contato existente!")
            return;

        }

        this.repositorioContato.inserir(novoContato);

        window.location.href = "contato.list.html"

    }
    
    configurarElementos(): void {
        
        this.txtNome = document.getElementById("txtNome") as HTMLInputElement;
        this.txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
        this.txtTelefone = document.getElementById("txtTelefone") as HTMLInputElement;
        this.txtEmpresa = document.getElementById("txtEmpresa") as HTMLInputElement;
        this.txtCargo = document.getElementById("txtCargo") as HTMLInputElement;
        this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros())

    }

    contatoExistente(contatoAhValidar : Contato) : boolean{

        const contatos = this.repositorioContato.selecionarTodos();
        let nomeContato : string = "";
        let emailContato : string = "";
        let telefoneContato : string = "";
        let contatoExiste = false;

        contatos.forEach(contato =>{

            nomeContato = contato.nome;
            emailContato = contato.email;
            telefoneContato = contato.telefone;

            if(nomeContato === contatoAhValidar.nome || emailContato === contatoAhValidar.email || telefoneContato === contatoAhValidar.telefone)
                contatoExiste = true;

            
        });

        return contatoExiste;
    }

    validarNomeContato(nome : string) : boolean{

        if(nome === "")
            return true;

        return false;
    }

    validarEmailContato(email : string) : boolean{

        if(email === "" || !(email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)))
            return true;

        return false;
    }

    validarTelefoneContato(telefone : string) : boolean{


        if(telefone === "" || !(telefone.match(/\d+/g)))
            return true;

        return false;
    }

    validarEmpresaContato(empresa : string) : boolean{

        if(empresa === "")
            return true;
        
        return false;
    }

    validarCargoContato(cargo : string) : boolean{

        if(cargo === "")
            return true;

        return false;
    }
}

new ContatoCadastro(new ContatoRepositorioLocalStorage());