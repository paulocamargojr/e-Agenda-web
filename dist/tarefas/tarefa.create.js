import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositorioLocalStorage } from "./tarefa.repository.ls.js";
class TarefaCadastro {
    constructor(repositorioTaefas, id) {
        this.repositorioTaefas = repositorioTaefas;
        this.configurarElementos();
        if (id) {
            this.idSelecionado = id;
            const tarefaSelecionada = this.repositorioTaefas.selecionarPorId(id);
            if (tarefaSelecionada)
                this.preencherFormulario(tarefaSelecionada);
        }
    }
    gravarRegistros() {
        // const prioridade = this.selectPrioridade.value as Prioridade;
        // const novaTarefa = new Tarefa(this.txtTitulo.value, prioridade);
        const tarefa = this.obterDadosFormularios();
        if (!this.validarTituloTarefa(tarefa)) {
            alert("O campo título não pode fica vazio!");
            return;
        }
        if (this.tarefaExistente(tarefa)) {
            alert("Tarefa duplicada!");
            return;
        }
        if (!tarefa.id)
            this.repositorioTaefas.inserir(tarefa);
        else
            this.repositorioTaefas.editar(tarefa.id, tarefa);
        window.location.href = "tarefa.list.html";
    }
    preencherFormulario(tarefaSelecionada) {
        this.txtTitulo.value = tarefaSelecionada.titulo;
        this.selectPrioridade.value = tarefaSelecionada.prioridade;
    }
    obterDadosFormularios() {
        const titulo = this.txtTitulo.value;
        const prioridade = this.selectPrioridade.value;
        const tarefa = new Tarefa(titulo, prioridade);
        tarefa.id = this.idSelecionado;
        return tarefa;
    }
    configurarElementos() {
        this.txtTitulo = document.getElementById("txtTitulo");
        this.selectPrioridade = document.getElementById("selectPrioridade");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
    }
    tarefaExistente(essaTarefa) {
        const tarefas = this.repositorioTaefas.selecionarTodos();
        let teste = "";
        let tarefaExiste = false;
        tarefas.forEach(tarefa => {
            teste = tarefa.titulo;
            if (tarefa.id !== essaTarefa.id && teste === essaTarefa.titulo)
                tarefaExiste = true;
        });
        return tarefaExiste;
    }
    validarTituloTarefa(tarefa) {
        if (tarefa.titulo === "")
            return false;
        return true;
    }
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
new TarefaCadastro(new TarefaRepositorioLocalStorage(), id);
