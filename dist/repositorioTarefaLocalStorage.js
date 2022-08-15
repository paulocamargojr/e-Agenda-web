export class RepositorioTarefaLocalStorage {
    constructor() {
        this.localStorage = window.localStorage;
    }
    inserir(tarefa) {
        const jsonString = JSON.stringify(tarefa);
        this.localStorage.setItem(tarefa.id.toString(), jsonString);
    }
    excluir(tarefa) {
        this.localStorage.removeItem(tarefa.id.toString());
    }
    editar(tarefa) {
        const jsonString = JSON.stringify(tarefa);
        this.localStorage.setItem(tarefa.id.toString(), jsonString);
    }
    selecionarPorId(id) {
        throw new Error("Method not implemented.");
    }
    selecionarTodos() {
        throw new Error("Method not implemented.");
    }
}
