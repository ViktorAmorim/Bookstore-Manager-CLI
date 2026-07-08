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
      console.log("\n===☞ GERENCIAMENTO DE CLIENTES ☜===");
      console.log("1 - Cadastrar Cliente");
      console.log("2 - Listar Clientes");
      console.log("3 - Buscar Cliente por ID");
      console.log("4 - Deletar Cliente por ID");
      console.log("5 - Atualizar Cliente");
      console.log("0 - Voltar ao menu principal");

      const opcao = readline.question("Escolha uma opcao: ");

      try {
        switch (opcao) {
          case "1":
            const nome = readline.question("Nome do Cliente: ");
            const email = readline.question("Email: ");
            const telefone = readline.question("Telefone: ");
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
            if (clientes.length === 0) console.log("Nenhum cliente cadastrado.");
            clientes.forEach((c) =>
              console.log(
                `[ID: ${c.id}] ${c.nome} (${c.email})`,
              ),
            );
            break;
          case "3":
            const id = readline.questionInt("Digite o ID do Cliente: ");
            const cliente = await this.clienteService.buscarClientePorId(id);
            console.log(
              `\n Cliente encontrado: ${cliente.nome} | Email: ${cliente.email}`,
            );
            break;
          case "4":
            const idDeletar = readline.questionInt(
              "Digite o ID do Cliente a ser deletado: ",
            );
            await this.clienteService.deletarClientePorId(idDeletar);
            console.log(`\n Cliente com ID ${idDeletar} deletado com sucesso.`);
            break;
          case "5":
            console.log("\n Atualizando cliente...");
            const idAtualizar = readline.questionInt("Digite o ID do Cliente: ");
            const clienteAtualizar = await this.clienteService.buscarClientePorId(idAtualizar);
            if (clienteAtualizar) {
              const novoNome = readline.question("Digite o novo nome: ");
              const novoEmail = readline.question("Digite o novo email: ");
              const novoTelefone = readline.question("Digite o novo telefone: ");
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
