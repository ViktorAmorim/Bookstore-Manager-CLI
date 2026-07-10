import * as readline from "readline-sync";
import { AutorController } from "../controllers/AutorController";
import { LivroController } from "../controllers/LivroController";
import { ClienteController } from "../controllers/ClienteController";
import { EmprestimoController } from "../controllers/EmprestimoController";
import { RelatorioController } from "../controllers/RelatorioController";

export async function menuPrincipal(): Promise<void> {
  const autorController = new AutorController();
  const livroController = new LivroController();
  const clienteController = new ClienteController();
  const emprestimoController = new EmprestimoController();
  const relatorioController = new RelatorioController();

  let continuar = true;
  while (continuar) {
    console.log("=".repeat(40));
    console.log("\n=== BOOKSTORE MANAGER CLI ===");
    console.log("\n 1 - Gerenciar Autores");
    console.log("\n 2 - Gerenciar Livros");
    console.log("\n 3 - Gerenciar Clientes");
    console.log("\n 4 - Gerenciar Empréstimos");
    console.log("\n 5 - Relatórios Gerenciais");
    console.log("\n 0 - Sair");
    console.log(`\n${"=".repeat(40)}`);


    const opcao = readline.question("Escolha uma opcao: ");

    try {
      switch (opcao) {
        case "1":
          await autorController.menuAutores();
          break;
        case "2":
          await livroController.menuLivros();
          break;
        case "3":
          await clienteController.menuClientes();
          break;
        case "4":
          await emprestimoController.menuEmprestimos();
          break;
        case "5":
          await relatorioController.menuRelatorios();
          break;
        case "0":
          console.log("\nSaindo do sistema... Até logo! 🥺");
          continuar = false;
          break;
        default:
          console.log("Opção inválida. Tente novamente.");
      }
    } catch (err: any) {
      console.log(`Erro: ${err.message}`);
    }
  }
}
