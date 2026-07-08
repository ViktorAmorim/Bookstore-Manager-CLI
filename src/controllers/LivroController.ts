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
      console.log("\n===☞ GERENCIAMENTO DE LIVROS ☜===");
      console.log("1 - Cadastrar Livro");
      console.log("2 - Listar Livros");
      console.log("3 - Buscar Livro por ID");
      console.log("4 - Deletar Livro por ID");
      console.log("0 - Voltar ao menu principal");

      const opcao = readline.question("Escolha uma opcao: ");

      try {
        switch (opcao) {
          case "1":
            const titulo = readline.question("Titulo do Livro: ");
            const quantidade = readline.questionInt("Quantidade do Livro: ");
            const genero = readline.question("Genero do Livro: ");
            const autor_id = readline.questionInt("ID do Autor: ");

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
              livros.forEach((l) =>
                console.log(
                  `[ID: ${l.id}] ${l.titulo} | Quantidade: ${l.quantidade} | Genero: ${l.genero} | Autor: ${l.autor_nome || "Não informado"}`,
                ),
              );
            }
            break;
          case "3":
            const idLivro = readline.questionInt("ID do Livro: ");
            const livroExistente =
              await this.livroService.buscarLivroPorId(idLivro);
            if (livroExistente) {
              console.log(livroExistente);
            } else {
              console.log(`Livro com ID ${idLivro} não encontrado.`);
            }
            break;
          case "4":
            const idDeletar = readline.questionInt(
              "ID do Livro a ser deletado: ",
            );
            await this.livroService.removerLivroPorId(idDeletar);
            console.log(`\n Livro com ID ${idDeletar} deletado com sucesso.`);
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
