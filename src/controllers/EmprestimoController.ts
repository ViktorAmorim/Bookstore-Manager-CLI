import * as readline from 'readline-sync';
import { EmprestimoService } from '../services/EmprestimoService';
import { parse } from 'path/win32';

export class EmprestimoController {
  private emprestimoService: EmprestimoService;

  constructor() {
    this.emprestimoService = new EmprestimoService();
  }

  async menuEmprestimos(): Promise<void> {
    let continuar = true;

    while (continuar) {
      console.log("=".repeat(40));
      console.log('\n=== Gerenciamento de Empréstimos ===');
      console.log(`\n 1 - Registrar Empréstimo`);
      console.log(`\n 2 - Registrar Devolução`);
      console.log(`\n 3 - Listar Todos os Empréstimos`);
      console.log(`\n 0 - Voltar ao menu principal`);
      console.log(`\n${"=".repeat(40)}`);


      const opcao = readline.question('Escolha uma opcao: ');

      try {
        switch (opcao) {
          case '1':
            console.log('\n=== REGISTRAR EMPRÉSTIMO ===');
            let livroId = parseInt(readline.question('ID do Livro: '), 10);
            do {
              if (Number.isNaN(livroId)) {
                console.log('Digite um número válido.');
                livroId = parseInt(readline.question('ID do Livro: '), 10);
              } else if (livroId <= 0) {
                console.log('Digite um número positivo.');
                livroId = parseInt(readline.question('ID do Livro: '), 10);
               }
            } while (Number.isNaN(livroId) || livroId <= 0);
            let clienteId = parseInt(readline.question('ID do Cliente: '), 10);
            do {
              if (Number.isNaN(clienteId)) {
                console.log('Digite um número válido.');
                clienteId = parseInt(readline.question('ID do Cliente: '), 10);
              } else if (clienteId <= 0) {
                console.log('Digite um número positivo.');
                clienteId = parseInt(readline.question('ID do Cliente: '), 10);
              }
            } while (Number.isNaN(clienteId) || clienteId <= 0);

            const novoEmprestimo = await this.emprestimoService.realizarEmprestimo(livroId, clienteId);
            console.log(`\n Empréstimo registrado com sucesso! ID do Empréstimo: ${novoEmprestimo.id}`);
            break;

          case '2':
            console.log('\n=== REGISTRAR DEVOLUÇÃO ===');
            let livroIdDev = parseInt(readline.question('ID do Livro: '), 10);
            do {
              if (Number.isNaN(livroIdDev)) {
                console.log('Digite um número válido.');
                livroIdDev = parseInt(readline.question('ID do Livro: '), 10);
              } else if (livroIdDev <= 0) {
                console.log('Digite um número positivo.');
                livroIdDev = parseInt(readline.question('ID do Livro: '), 10);
              }
            } while (Number.isNaN(livroIdDev) || livroIdDev <= 0);
            let clienteIdDev = parseInt(readline.question('ID do Cliente: '), 10);
            do {
              if (Number.isNaN(clienteIdDev)) {
                console.log('Digite um número válido.');
                clienteIdDev = parseInt(readline.question('ID do Cliente: '), 10);
              } else if (clienteIdDev <= 0) {
                console.log('Digite um número positivo.');
                clienteIdDev = parseInt(readline.question('ID do Cliente: '), 10);
              }
            } while (Number.isNaN(clienteIdDev) || clienteIdDev <= 0);

            await this.emprestimoService.registrarDevolucao(livroIdDev, clienteIdDev);
            console.log('\n Devolução registrada com sucesso! Estoque atualizado.');
            break;

          case '3':
            const emprestimos = await this.emprestimoService.listarEmprestimos();
            console.log('\n=== HISTÓRICO DE EMPRÉSTIMOS ===');
            if (emprestimos.length === 0) {
              console.log('Nenhum empréstimo registrado.');
            } else {
              const emprestimosFormatados = emprestimos.map(e => ({
                ...e,
                data_emprestimo: e.data_emprestimo ? new Date(e.data_emprestimo).toLocaleDateString('pt-BR') : 'N/A'
              }));
              console.table(emprestimosFormatados);
            }
            break;

          case '0':
            continuar = false;
            break;

          default:
            console.log('❌ Opção inválida.');
        }
      } catch (error: any) {
        console.log(`\n Erro na operação: ${error.message}`);
      }
    }
  }
}
