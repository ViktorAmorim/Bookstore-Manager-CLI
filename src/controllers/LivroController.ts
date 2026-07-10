import * as readline from "readline-sync";
import { LivroService } from "../services/LivroService";

export class LivroController {
  private livroService: LivroService;

  constructor() {
    this.livroService = new LivroService();
  }

  async menuLivros(): Promise<void> {
    let continuar = true;

    while (continuar) {
      console.log("=".repeat(40));
      console.log("\n=== GERENCIAMENTO DE LIVROS ===");
      console.log(`\n 1 - Cadastrar Livro`);
      console.log(`\n 2 - Listar Livros`);
      console.log(`\n 3 - Buscar Livro por ID`);
      console.log(`\n 4 - Deletar Livro por ID`);
      console.log(`\n 5 - Atualizar Livro`);
      console.log(`\n 0 - Voltar ao menu principal`);
      console.log(`\n${"=".repeat(40)}`);

      const opcao = readline.question("Escolha uma opcao: ");

      try {
        switch (opcao) {
          case "1":
            let titulo = readline.question("Titulo do Livro: ");
            while(!titulo) {
              console.log("Titulo do livro é obrigatório.");
              titulo = readline.question("Titulo do Livro: ");
            }
            let quantidade = parseInt(readline.question("Quantidade do Livro: "), 10);
            while(!quantidade) {
              console.log("Quantidade do livro é obrigatória.");
              quantidade = parseInt(readline.question("Quantidade do Livro: "), 10);
            }
            while(Number.isNaN(quantidade) || quantidade <= 0) {
              console.log("Quantidade do livro deve ser um número positivo.");
              quantidade = parseInt(readline.question("Quantidade do Livro: "), 10);
            }
            let genero = readline.question("Genero do Livro: ");
            while(!genero) {
              console.log("Genero do livro é obrigatório.");
              genero = readline.question("Genero do Livro: ");
            }
            let autor_id = parseInt(readline.question("ID do Autor: "), 10);
            while(!autor_id) {
              console.log("ID do autor é obrigatório.");
              autor_id = parseInt(readline.question("ID do Autor: "), 10);
            }

            const novoLivro = await this.livroService.cadastrarLivro(
              titulo,
              quantidade,
              genero,
              autor_id,
            );
            console.log(`\n Livro cadastrado com sucesso! ID: ${novoLivro.id}`);
            break;
          case "2":
            const livros = await this.livroService.listarLivros();
            console.log("\n=== LISTA DE LIVROS ===");
            if (livros.length === 0) {
              console.log("Nenhum livro cadastrado.");
            } else {
              console.table(livros);
            }
            break;
          case "3":
            let idLivro = parseInt(readline.question("ID do Livro: "), 10);
            while (!idLivro) {
              console.log("ID do livro é obrigatório.");
              idLivro = parseInt(readline.question("ID do Livro: "), 10);
            }
            const livroExistente =
              await this.livroService.buscarLivroPorId(idLivro);
            if (livroExistente) {
              console.table([livroExistente]);
            } else {
              console.log(`Livro com ID ${idLivro} não encontrado.`);
            }
            break;
          case "4":
            let idDeletar = parseInt(readline.question("ID do Livro a ser deletado: "), 10);
            while (!idDeletar) {
              console.log("ID do livro é obrigatório.");
              idDeletar = parseInt(readline.question("ID do Livro a ser deletado: "), 10);
            }
            await this.livroService.removerLivroPorId(idDeletar);
            console.log(`\n Livro com ID ${idDeletar} deletado com sucesso.`);
            break;
          case "5":
            console.log("\n Atualizando livro...");
            let idAtualizar = parseInt(readline.question("Digite o ID do Livro: "), 10);
            while (!idAtualizar) {
              console.log("ID do livro é obrigatório.");
              idAtualizar = parseInt(readline.question("Digite o ID do Livro: "), 10);
            }
            const livroAtualizar = await this.livroService.buscarLivroPorId(idAtualizar);
            if (livroAtualizar) {
              const novoTitulo = readline.question("Digite o novo título: ");
              const novaQuantidade = readline.questionInt("Digite a nova quantidade: ");
              const novoGenero = readline.question("Digite o novo gênero: ");
              const novoAutorId = readline.questionInt("Digite o novo ID do Autor: ");
              await this.livroService.atualizarLivro(idAtualizar, novoTitulo, novaQuantidade, novoGenero, novoAutorId);
              console.log(`\n Livro com ID ${idAtualizar} atualizado com sucesso.`);
            } else {
              console.log(`\n Livro com ID ${idAtualizar} não encontrado.`);
            }
            break;
          case "0":
            continuar = false;
            break;
          default:
            console.log("Opcao invalida. Tente novamente.");
        }
      } catch (error: any) {
        console.log(`\n Erro: ${error.message}`);
      }
    }
  }
}
