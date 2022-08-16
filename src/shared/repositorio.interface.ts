export interface IRepositorio<T>{

    inserir(registro: T) : void;

    editar(id : string, novoRegistro : T) : void;

    excluir(id : string) : void;

    selecionarTodos(): T[];

    selecionarPorId(id : string) : T | undefined;

}