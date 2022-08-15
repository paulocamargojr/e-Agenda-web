import { Contato } from "./contato.model.js";
import { ContatoRepositorioLocalStorage } from "./contato.repository.ls.js";
class ContatoCadastro {
    constructor(repositorioContato) {
        this.repositorioContato = repositorioContato;
        this.configurarElementos();
    }
    gravarRegistros() {
        const novoContato = new Contato(this.txtNome.value, this.txtEmail.value, this.txtTelefone.value, this.txtEmpresa.value, this.txtCargo.value);
        if (this.validarNomeContato(novoContato.nome)) {
            alert("O campo nome não pode ficar vazio!");
            return;
        }
        if (this.validarEmailContato(novoContato.email)) {
            alert("E-mail inválido ou campo em branco!");
            return;
        }
        if (this.validarTelefoneContato(novoContato.telefone)) {
            alert("Telefone inválido ou em branco!");
            return;
        }
        if (this.validarEmpresaContato(novoContato.empresa)) {
            alert("O campo empresa não pode ficar em branco!");
            return;
        }
        if (this.validarCargoContato(novoContato.cargo)) {
            alert("O campo cargo não pode ficar vazio!");
            return;
        }
        if (this.contatoExistente(novoContato)) {
            alert("Contato existente!");
            return;
        }
        this.repositorioContato.inserir(novoContato);
        window.location.href = "contato.list.html";
    }
    configurarElementos() {
        this.txtNome = document.getElementById("txtNome");
        this.txtEmail = document.getElementById("txtEmail");
        this.txtTelefone = document.getElementById("txtTelefone");
        this.txtEmpresa = document.getElementById("txtEmpresa");
        this.txtCargo = document.getElementById("txtCargo");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
    }
    contatoExistente(contatoAhValidar) {
        const contatos = this.repositorioContato.selecionarTodos();
        let nomeContato = "";
        let emailContato = "";
        let telefoneContato = "";
        let contatoExiste = false;
        contatos.forEach(contato => {
            nomeContato = contato.nome;
            emailContato = contato.email;
            telefoneContato = contato.telefone;
            if (nomeContato === contatoAhValidar.nome || emailContato === contatoAhValidar.email || telefoneContato === contatoAhValidar.telefone)
                contatoExiste = true;
        });
        return contatoExiste;
    }
    validarNomeContato(nome) {
        if (nome === "")
            return true;
        return false;
    }
    validarEmailContato(email) {
        if (email === "" || !(email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)))
            return true;
        return false;
    }
    validarTelefoneContato(telefone) {
        if (telefone === "" || !(telefone.match(/\d+/g)))
            return true;
        return false;
    }
    validarEmpresaContato(empresa) {
        if (empresa === "")
            return true;
        return false;
    }
    validarCargoContato(cargo) {
        if (cargo === "")
            return true;
        return false;
    }
}
new ContatoCadastro(new ContatoRepositorioLocalStorage());
