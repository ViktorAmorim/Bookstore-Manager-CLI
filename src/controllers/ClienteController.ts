import * as readline from "readline-sync";
import { ClienteService } from "../services/ClienteService";

export class ClienteController {
  private clienteService: ClienteService;

  constructor() {
    this.clienteService = new ClienteService();
  }

  async menuClientes(): Promise<void> {
    let continuar = true;

    while (continuar) {
      console.log("=".repeat(40));
      console.log("\n=== GERENCIAMENTO DE CLIENTES ===");
      console.log("\n 1 - Cadastrar Cliente");
      console.log("\n 2 - Listar Clientes");
      console.log("\n 3 - Buscar Cliente por ID");
      console.log("\n 4 - Deletar Cliente por ID");
      console.log("\n 5 - Atualizar Cliente");
      console.log("\n 0 - Voltar ao menu principal");
      console.log(`\n${"=".repeat(40)}`);


      const opcao = readline.question("Escolha uma opcao: ");

      try {
        switch (opcao) {
          case "1":
            let nome = readline.question("Nome do Cliente: ");
            while (!nome || nome.trim() === "") {
              console.log("O nome do cliente é obrigatório.");
              nome = readline.question("Nome do Cliente: ");
            }
            let email = readline.question("Email: ");
            while (!email || email.trim() === "") {
              console.log("O email do cliente é obrigatório.");
              email = readline.question("Email: ");
            }
            let telefone = readline.question("Telefone: ");
            while (!telefone || telefone.trim() === "") {
              console.log("O telefone do cliente é obrigatório.");
              telefone = readline.question("Telefone: ");
            }
            const novoCliente = await this.clienteService.cadastrarCliente(
              nome,
              email,
              telefone,
            );
            console.log(`\n Cliente cadastrado com sucesso! ID: ${novoCliente.id}`);
            break;
          case "2":
            const clientes = await this.clienteService.listarClientes();
            console.log("\n=== LISTA DE CLIENTES ===");
            if (clientes.length === 0) {
              console.log("Nenhum cliente cadastrado.");
            } else {
              console.table(clientes);
            }
            break;
          case "3":
            let id = parseInt(readline.question("Digite o ID do Cliente: "), 10);
            while (Number.isNaN(id) || id <= 0) {
              console.log("O ID do cliente deve ser um número positivo.");
              const idInput = parseInt(readline.question("Digite o ID do Cliente: "), 10);
              if (idInput > 0) id = idInput;
            }
            const cliente = await this.clienteService.buscarClientePorId(id);
            console.table([cliente]);
            break;
          case "4":
            let idDeletar = parseInt(readline.question("Digite o ID do Cliente a ser deletado: "), 10);
            while (Number.isNaN(idDeletar) || idDeletar <= 0) {
              console.log("O ID do cliente deve ser um número positivo.");
              const idInput = parseInt(readline.question("Digite o ID do Cliente: "), 10);
              if (idInput > 0) idDeletar = idInput;
            }
            await this.clienteService.deletarClientePorId(idDeletar);
            console.log(`\n Cliente com ID ${idDeletar} deletado com sucesso.`);
            break;
          case "5":
            console.log("\n Atualizando cliente...");
            let idAtualizar = parseInt(readline.question("Digite o ID do Cliente: "), 10);
            while (Number.isNaN(idAtualizar) || idAtualizar <= 0) {
              console.log("O ID do cliente deve ser um número positivo.");
              const idInput = parseInt(readline.question("Digite o ID do Cliente: "), 10);
              if (idInput > 0) idAtualizar = idInput;
            }
            let clienteAtualizar = await this.clienteService.buscarClientePorId(idAtualizar);
            if (clienteAtualizar) {
              let novoNome = readline.question("Digite o novo nome: ");
              while (!novoNome || novoNome.trim() === "") {
                console.log("O nome do cliente é obrigatório.");
                novoNome = readline.question("Digite o novo nome: ");
              }
              let novoEmail = readline.question("Digite o novo email: ");
              while (!novoEmail || novoEmail.trim() === "") {
                console.log("O email do cliente é obrigatório.");
                novoEmail = readline.question("Digite o novo email: ");
              }
              let novoTelefone = readline.question("Digite o novo telefone: ");
              while (!novoTelefone || novoTelefone.trim() === "") {
                console.log("O telefone do cliente é obrigatório.");
                novoTelefone = readline.question("Digite o novo telefone: ");
              }
              await this.clienteService.atualizarCliente(idAtualizar, novoNome, novoEmail, novoTelefone);
              console.log(`\n Cliente com ID ${idAtualizar} atualizado com sucesso.`);
            } else {
              console.log(`\n Cliente com ID ${idAtualizar} não encontrado.`);
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
