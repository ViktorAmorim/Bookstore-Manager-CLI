import * as readline from "readline-sync";
import { LivroService } from "../services/LivroService";
import { obterTextoObrigatorio, obterNumeroPositivo, obterNumeroNaoNegativo } from "../utils";

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
            const titulo = obterTextoObrigatorio("Titulo do Livro: ", "Titulo do livro é obrigatório.");
            const quantidade = obterNumeroNaoNegativo("Quantidade do Livro: ", "Quantidade do livro deve ser um número maior ou igual a zero.");
            const genero = obterTextoObrigatorio("Genero do Livro: ", "Genero do livro é obrigatório.");
            const autor_id = obterNumeroPositivo("ID do Autor: ", "ID do autor é obrigatório e deve ser um número positivo.");

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
            const idLivro = obterNumeroPositivo("ID do Livro: ", "ID do livro é obrigatório.");
            const livroExistente =
              await this.livroService.buscarLivroPorId(idLivro);
            if (livroExistente) {
              console.table([livroExistente]);
            } else {
              console.log(`Livro com ID ${idLivro} não encontrado.`);
            }
            break;
          case "4":
            const idDeletar = obterNumeroPositivo("ID do Livro a ser deletado: ", "ID do livro é obrigatório.");
            await this.livroService.removerLivroPorId(idDeletar);
            console.log(`\n Livro com ID ${idDeletar} deletado com sucesso.`);
            break;
          case "5":
            console.log("\n Atualizando livro...");
            const idAtualizar = obterNumeroPositivo("Digite o ID do Livro: ", "ID do livro é obrigatório.");
            const livroAtualizar = await this.livroService.buscarLivroPorId(idAtualizar);
            if (livroAtualizar) {
              const novoTitulo = readline.question("Digite o novo título (deixe vazio para não alterar): ");
              const novaQuantidadeStr = readline.question("Digite a nova quantidade (deixe vazio para não alterar): ");
              const novoGenero = readline.question("Digite o novo gênero (deixe vazio para não alterar): ");
              const novoAutorIdStr = readline.question("Digite o novo ID do Autor (deixe vazio para não alterar): ");

              const novaQuantidade = novaQuantidadeStr !== "" ? parseInt(novaQuantidadeStr, 10) : livroAtualizar.quantidade;
              const novoAutorId = novoAutorIdStr !== "" ? parseInt(novoAutorIdStr, 10) : livroAtualizar.autor_id;

              await this.livroService.atualizarLivro(
                idAtualizar, 
                novoTitulo || livroAtualizar.titulo, 
                novaQuantidade, 
                novoGenero || livroAtualizar.genero, 
                novoAutorId
              );
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
