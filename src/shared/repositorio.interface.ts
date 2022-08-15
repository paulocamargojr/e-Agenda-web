export interface IRepositorio<T>{

    inserir(registro: T) : void;

    selecionarTodos(): T[];

}