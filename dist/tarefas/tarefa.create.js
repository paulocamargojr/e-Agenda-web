import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositorioLocalStorage } from "./tarefa.repository.ls.js";
class TarefaCadastro {
    constructor(repositorioTaefas) {
        this.repositorioTaefas = repositorioTaefas;
        this.configurarElementos();
    }
    gravarRegistros() {
        const prioridade = this.selectPrioridade.value;
        const novaTarefa = new Tarefa(this.txtTitulo.value, prioridade);
        if (!this.validarTituloTarefa(novaTarefa)) {
            alert("O campo título não pode fica vazio!");
            return;
        }
        if (this.tarefaExistente(novaTarefa.titulo)) {
            alert("Tarefa duplicada!");
            return;
        }
        this.repositorioTaefas.inserir(novaTarefa);
        window.location.href = "tarefa.list.html";
    }
    configurarElementos() {
        this.txtTitulo = document.getElementById("txtTitulo");
        this.selectPrioridade = document.getElementById("selectPrioridade");
        this.btnSalvar = document.getElementById("btnSalvar");
        this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
    }
    tarefaExistente(titulo) {
        const tarefas = this.repositorioTaefas.selecionarTodos();
        let teste = "";
        let tarefaExiste = false;
        tarefas.forEach(tarefa => {
            teste = tarefa.titulo;
            if (teste === titulo)
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
new TarefaCadastro(new TarefaRepositorioLocalStorage());
