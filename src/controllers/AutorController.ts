import * as readline from "readline-sync";
import { AutorService } from "../services/AutorService";
import { obterTextoObrigatorio, obterNumeroPositivo } from "../utils";

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
            const nome = obterTextoObrigatorio("Nome do Autor: ", "Nome do autor é obrigatório.");
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
            const id = obterNumeroPositivo("Digite o ID do Autor: ", "ID do autor é obrigatório.");
            const autor = await this.autorService.buscarAutorPorId(id);
            console.table([autor]);
            break;
          case "4":
            const idDeletar = obterNumeroPositivo("Digite o ID do Autor a ser deletado: ", "ID do autor é obrigatório.");
            await this.autorService.deletarAutorPorId(idDeletar);
            console.log(`\n Autor com ID ${idDeletar} deletado com sucesso.`);
            break;
          case "5":
            console.log("\n Atualizando autor...");
            const idAtualizar = obterNumeroPositivo("Digite o ID do Autor: ", "ID do autor é obrigatório.");
            const autorAtualizar = await this.autorService.buscarAutorPorId(idAtualizar);
            if (autorAtualizar) {
              const novoNome = readline.question("Digite o novo nome (deixe vazio para não alterar): ");
              const novaNacionalidade = readline.question("Digite a nova nacionalidade (opcional, deixe vazio para não alterar): ");
              await this.autorService.atualizarAutor(idAtualizar, novoNome || autorAtualizar.nome, novaNacionalidade || autorAtualizar.nacionalidade);
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
