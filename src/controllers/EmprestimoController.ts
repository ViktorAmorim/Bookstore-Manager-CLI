import * as readline from 'readline-sync';
import { EmprestimoService } from '../services/EmprestimoService';

export class EmprestimoController {
  private emprestimoService: EmprestimoService;

  constructor() {
    this.emprestimoService = new EmprestimoService();
  }

  async menuEmprestimos(): Promise<void> {
    let continuar = true;

    while (continuar) {
      console.log('\n=== Gerenciamento de Empréstimos ===');
      console.log('1 - Registrar Empréstimo');
      console.log('2 - Registrar Devolução');
      console.log('3 - Listar Todos os Empréstimos');
      console.log('0 - Voltar ao menu principal');

      const opcao = readline.question('Escolha uma opcao: ');

      try {
        switch (opcao) {
          case '1':
            console.log('\n--- REGISTRAR EMPRÉSTIMO ---');
            const livroId = readline.questionInt('ID do Livro: ');
            const clienteId = readline.questionInt('ID do Cliente: ');

            const novoEmprestimo = await this.emprestimoService.realizarEmprestimo(livroId, clienteId);
            console.log(`\n Empréstimo registrado com sucesso! ID do Empréstimo: ${novoEmprestimo.id}`);
            break;

          case '2':
            console.log('\n--- REGISTRAR DEVOLUÇÃO ---');
            const livroIdDev = readline.questionInt('ID do Livro: ');
            const clienteIdDev = readline.questionInt('ID do Cliente: ');

            await this.emprestimoService.registrarDevolucao(livroIdDev, clienteIdDev);
            console.log('\n Devolução registrada com sucesso! Estoque atualizado.');
            break;

          case '3':
            const emprestimos = await this.emprestimoService.listarEmprestimos();
            console.log('\n=== HISTÓRICO DE EMPRÉSTIMOS ===');
            if (emprestimos.length === 0) {
              console.log('Nenhum empréstimo registrado.');
            } else {
              emprestimos.forEach(e => {
                const dataFormatada = e.data_emprestimo ? new Date(e.data_emprestimo).toLocaleDateString('pt-BR') : 'N/A';
                console.log(
                  `[ID: ${e.id}] Livro: ${e.livro_titulo} (ID: ${e.livro_id}) | ` +
                  `Cliente: ${e.cliente_nome} (ID: ${e.cliente_id}) | ` +
                  `Data: ${dataFormatada} | Status: ${e.status}`
                );
              });
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
