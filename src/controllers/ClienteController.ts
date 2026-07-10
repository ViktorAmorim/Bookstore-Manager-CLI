import * as readline from "readline-sync";
import { ClienteService } from "../services/ClienteService";
import { obterTextoObrigatorio, obterNumeroPositivo } from "../utils";

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
            const nome = obterTextoObrigatorio("Nome do Cliente: ", "O nome do cliente é obrigatório.");
            const email = obterTextoObrigatorio("Email: ", "O email do cliente é obrigatório.");
            const telefone = obterTextoObrigatorio("Telefone: ", "O telefone do cliente é obrigatório.");
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
            const id = obterNumeroPositivo("Digite o ID do Cliente: ", "O ID do cliente deve ser um número positivo.");
            const cliente = await this.clienteService.buscarClientePorId(id);
            console.table([cliente]);
            break;
          case "4":
            const idDeletar = obterNumeroPositivo("Digite o ID do Cliente a ser deletado: ", "O ID do cliente deve ser um número positivo.");
            await this.clienteService.deletarClientePorId(idDeletar);
            console.log(`\n Cliente com ID ${idDeletar} deletado com sucesso.`);
            break;
          case "5":
            console.log("\n Atualizando cliente...");
            const idAtualizar = obterNumeroPositivo("Digite o ID do Cliente: ", "O ID do cliente deve ser um número positivo.");
            let clienteAtualizar = await this.clienteService.buscarClientePorId(idAtualizar);
            if (clienteAtualizar) {
              const novoNome = readline.question("Digite o novo nome (deixe vazio para não alterar): ");
              const novoEmail = readline.question("Digite o novo email (deixe vazio para não alterar): ");
              const novoTelefone = readline.question("Digite o novo telefone (deixe vazio para não alterar): ");
              await this.clienteService.atualizarCliente(
                idAtualizar,
                novoNome || clienteAtualizar.nome,
                novoEmail || clienteAtualizar.email,
                novoTelefone || clienteAtualizar.telefone
              );
              console.log(`\n Cliente com ID ${idAtualizar} updated com sucesso.`);
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
