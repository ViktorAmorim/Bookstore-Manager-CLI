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
      console.log("\n===☞ GERENCIAMENTO DE AUTORES ☜===");
      console.log("1 - Cadastrar Autor");
      console.log("2 - Listar Autores");
      console.log("3 - Buscar Autor por ID");
      console.log("4 - Deletar Autor por ID");
      console.log("0 - Voltar ao menu principal");

      const opcao = readline.question("Escolha uma opcao: ");

      try {
        switch (opcao) {
          case "1":
            const nome = readline.question("Nome do Autor: ");
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
            if (autores.length === 0) console.log("Nenhum autor cadastrado.");
            autores.forEach((a) =>
              console.log(
                `[ID: ${a.id}] ${a.nome} (${a.nacionalidade || "Não informada"})`,
              ),
            );
            break;
          case "3":
            const id = readline.questionInt("Digite o ID do Autor: ");
            const autor = await this.autorService.buscarAutorPorId(id);
            console.log(
              `\n Autor encontrado: ${autor.nome} | Nacionalidade: ${autor.nacionalidade || "Não informada"}`,
            );
            break;
          case "4":
            const idDeletar = readline.questionInt(
              "Digite o ID do Autor a ser deletado: ",
            );
            await this.autorService.deletarAutorPorId(idDeletar);
            console.log(`\n Autor com ID ${idDeletar} deletado com sucesso.`);
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
