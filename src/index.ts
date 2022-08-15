import { IPaginaHTML } from "./shared/pagina.interface.js";

class Index implements IPaginaHTML{

    constructor(){
        this.configurarElementos();
    }

    public configurarElementos(): void {
        throw new Error("Method not implemented.");
    }

}

new Index();



// import { RepositorioTarefaLocalStorage } from "./repositorioTarefaLocalStorage.js";
// import { Prioridade, Tarefa } from "./tarefa.js";

// const telaTarefas = document.getElementById("tarefas") as HTMLAnchorElement;
// const telaContatos = document.getElementById("contatos") as HTMLAnchorElement;
// const telaInicio = document.getElementById("inicio") as HTMLAnchorElement;
// const divCadastrroTarefas = document.getElementById("cadastro-tarefas") as HTMLDivElement;
// const divCadastrroContatos = document.getElementById("cadastro-contatos") as HTMLDivElement;
// const btnCadastrarTarefa = document.getElementById("btnCadastrar") as HTMLButtonElement;

// const inputTitulo = document.getElementById("inputTitulo") as HTMLInputElement;
// const selectPrioridade = document.getElementById("selectPrioridade") as HTMLSelectElement;
// const inputDataCriacao = document.getElementById("inputData") as HTMLInputElement;

// const repositorioTarefaLocalStorage = new RepositorioTarefaLocalStorage();


// function mostrarTarefas(){

//     if(divCadastrroContatos.classList.contains("d-flex"))
//         divCadastrroContatos.classList.replace("d-flex", "d-none");

//     divCadastrroTarefas.classList.replace("d-none", "d-flex");
// }

// function cadastrarTarefas(){

//     const titulo = inputTitulo.value;
//     var prioridade;

//     switch(selectPrioridade.value){

//         case "1":
//             prioridade = Prioridade.Baixa;
//             break;
//         case "2":
//             prioridade = Prioridade.Média;
//             break;
//         case "3":
//             prioridade = Prioridade.Alta;
//             break;
//         default:
//             prioridade = Prioridade.Baixa;
//             break;
//     }
    
//     const dataCriacao  = new Date(inputDataCriacao.value); 

//     const tarefa = new Tarefa(1, titulo, prioridade, dataCriacao); 

//     repositorioTarefaLocalStorage.inserir(tarefa);

// }

// function cadastrarContatos(){

//     if(divCadastrroTarefas.classList.contains("d-flex"))
//         divCadastrroTarefas.classList.replace("d-flex", "d-none");
        
//     divCadastrroContatos.classList.replace("d-none", "d-flex");

// }

// function voltarInicio(){

//     divCadastrroContatos.classList.replace("d-flex", "d-none");
//     divCadastrroTarefas.classList.replace("d-flex", "d-none");

// }

// telaTarefas.addEventListener("click", mostrarTarefas);
// telaContatos.addEventListener("click", cadastrarContatos);
// telaInicio.addEventListener("click", voltarInicio);
// btnCadastrarTarefa.addEventListener("click", cadastrarTarefas)