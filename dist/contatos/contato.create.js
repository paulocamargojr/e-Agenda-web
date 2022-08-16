import { Contato } from "./contato.model.js";
import { ContatoRepositorioLocalStorage } from "./contato.repository.ls.js";
class ContatoCadastro {
    constructor(repositorioContato, id) {
        this.repositorioContato = repositorioContato;
        this.configurarElementos();
        if (id) {
            this.idSelecionado = id;
            const contatoSelecionado = this.repositorioContato.selecionarPorId(id);
            if (contatoSelecionado)
                this.preencherFormulario(contatoSelecionado);
        }
    }
    gravarRegistros() {
        const contato = this.obterDadosFormularios();
        if (this.validarNomeContato(contato.nome)) {
            alert("O campo nome não pode ficar vazio!");
            return;
        }
        if (this.validarEmailContato(contato.email)) {
            alert("E-mail inválido ou campo em branco!");
            return;
        }
        if (this.validarTelefoneContato(contato.telefone)) {
            alert("Telefone inválido ou em branco!");
            return;
        }
        if (this.validarEmpresaContato(contato.empresa)) {
            alert("O campo empresa não pode ficar em branco!");
            return;
        }
        if (this.validarCargoContato(contato.cargo)) {
            alert("O campo cargo não pode ficar vazio!");
            return;
        }
        if (this.contatoExistente(contato)) {
            alert("Contato existente!");
            return;
        }
        if (!contato.id)
            this.repositorioContato.inserir(contato);
        else
            this.repositorioContato.editar(contato.id, contato);
        window.location.href = "contato.list.html";
    }
    preencherFormulario(contatoSelecionado) {
        this.txtNome.value = contatoSelecionado.nome;
        this.txtEmail.value = contatoSelecionado.email;
        this.txtTelefone.value = contatoSelecionado.telefone;
        this.txtEmpresa.value = contatoSelecionado.empresa;
        this.txtCargo.value = contatoSelecionado.cargo;
    }
    obterDadosFormularios() {
        const nome = this.txtNome.value;
        const email = this.txtEmail.value;
        const telefone = this.txtTelefone.value;
        const empresa = this.txtEmpresa.value;
        const cargo = this.txtCargo.value;
        const contato = new Contato(nome, email, telefone, empresa, cargo);
        contato.id = this.idSelecionado;
        return contato;
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
            if ((contato.id !== contatoAhValidar.id && nomeContato === contatoAhValidar.nome) || (contato.id !== contatoAhValidar.id && emailContato === contatoAhValidar.email)
                || (contato.id !== contatoAhValidar.id && telefoneContato === contatoAhValidar.telefone))
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
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
new ContatoCadastro(new ContatoRepositorioLocalStorage(), id);
