import { RelatorioRepository } from "../repositories/RelatorioRepository";
import * as readline from "readline-sync";

export class RelatorioController {
  private relatorioRepo: RelatorioRepository;

  constructor() {
    this.relatorioRepo = new RelatorioRepository();
  }

  async menuRelatorios(): Promise<void> {
    let continuar = true;
    while (continuar) {
      console.log("\n" + "=".repeat(40));
      console.log("\n=== RELATÓRIOS GERENCIAIS ===");
      console.log("\n 1 - Livros Disponíveis");
      console.log("\n 2 - Livros Atualmente Emprestados");
      console.log("\n 3 - Total de Livros por Autor");
      console.log("\n 4 - Ranking de Empréstimos por Livro");
      console.log("\n 5 - Clientes com Empréstimos Ativos");
      console.log("\n 0 - Voltar");
      console.log("\n" + "=".repeat(40));


      const opcao = readline.question("Escolha um relatorio: ");

      try {
        switch (opcao) {
          case "1":
            const disponiveis = await this.relatorioRepo.livrosDisponiveis();
            console.table(disponiveis);
            break;
          case "2":
            const emprestados = await this.relatorioRepo.livrosEmprestados();
            console.table(emprestados);
            break;
          case "3":
            const autores = await this.relatorioRepo.livrosPorAutor();
            console.table(autores);
            break;
          case "4":
            const rank = await this.relatorioRepo.quantidadeEmprestimosPorLivro();
            console.table(rank);
            break;
          case "5":
            const clientes = await this.relatorioRepo.clientesComEmprestimosAtivos();
            console.table(clientes);
            break;
          case "0":
            continuar = false;
            break;
          default:
            console.log("Opção inválida.");
        }
      } catch (err: any) {
        console.log(`Erro ao gerar relatório: ${err.message}`);
      }
    }
  }
}
