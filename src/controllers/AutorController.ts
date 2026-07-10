import * as readline from "readline-sync";
import { AutorService } from "../services/AutorService";

export class AutorController {
  private autorService: AutorService;

  constructor() {
    this.autorService = new AutorService();
  }

  async menuAutores(): Promise<void> {
    let continuar = true;

    while (continuar) {
      console.log("=".repeat(40));
      console.log("\n=== GERENCIAMENTO DE AUTORES ===");
      console.log(`\n 1 - Cadastrar Autor`);
      console.log(`\n 2 - Listar Autores`);
      console.log(`\n 3 - Buscar Autor por ID`);
      console.log(`\n 4 - Deletar Autor por ID`);
      console.log(`\n 5 - Atualizar Autor`);
      console.log(`\n 0 - Voltar ao menu principal`);
      console.log(`\n${"=".repeat(40)}`);


      const opcao = readline.question("Escolha uma opcao: ");

      try {
        switch (opcao) {
          case "1":
            let nome = readline.question("Nome do Autor: ");
            while(!nome) {
              console.log("Nome do autor é obrigatório.");
              nome = readline.question("Nome do Autor: ");
            }
            const nacionalidade = readline.question(
              "Nacionalidade (opcional): ",
            );
            const novoAutor = await this.autorService.cadastrarAutor(
              nome,
              nacionalidade,
            );
            console.log(`\n Autor cadastrado com sucesso! ID: ${novoAutor.id}`);
            break;
          case "2":
            const autores = await this.autorService.listarAutores();
            console.log("\n=== LISTA DE AUTORES ===");
            if (autores.length === 0) {
              console.log("Nenhum autor cadastrado.");
            } else {
              console.table(autores);
            }
            break;
          case "3":
            let id = parseInt(readline.question("Digite o ID do Autor: "), 10);
            while (!id) {
              console.log("ID do autor é obrigatório.");
              id = parseInt(readline.question("Digite o ID do Autor: "), 10);
            }
            const autor = await this.autorService.buscarAutorPorId(id);
            console.table([autor]);
            break;
          case "4":
            let idDeletar = parseInt(readline.question("Digite o ID do Autor a ser deletado: "), 10);
            while (!idDeletar) {
              console.log("ID do autor é obrigatório.");
              idDeletar = parseInt(readline.question("Digite o ID do Autor a ser deletado: "), 10);
            }
            await this.autorService.deletarAutorPorId(idDeletar);
            console.log(`\n Autor com ID ${idDeletar} deletado com sucesso.`);
            break;
          case "5":
            console.log("\n Atualizando autor...");
            let idAtualizar = parseInt(readline.question("Digite o ID do Autor: "), 10);
            while (!idAtualizar) {
              console.log("ID do autor é obrigatório.");
              const idAtualizarInput = readline.question("Digite o ID do Autor: ");
              idAtualizar = parseInt(idAtualizarInput, 10);
            }
            const autorAtualizar = await this.autorService.buscarAutorPorId(idAtualizar);
            if (autorAtualizar) {
              const novoNome = readline.question("Digite o novo nome: ");
              const novaNacionalidade = readline.question("Digite a nova nacionalidade (opcional): ");
              await this.autorService.atualizarAutor(idAtualizar, novoNome, novaNacionalidade);
              console.log(`\n Autor com ID ${idAtualizar} atualizado com sucesso.`);
            } else {
              console.log(`\n Autor com ID ${idAtualizar} não encontrado.`);
            }
            break;
          case "0":
            continuar = false;
            break;
          default:
            console.log(" Opção inválida.");
        }
      } catch (error: any) {
        console.log(`\n Erro: ${error.message}`);
      }
    }
  }
}
