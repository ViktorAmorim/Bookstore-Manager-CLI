import { EmprestimoRepository } from "../repositories/EmprestimoRepository";
import { LivroRepository } from "../repositories/LivroRepository";
import { ClientesRepository } from "../repositories/ClienteRepository";
import { Emprestimo } from "../models";

export class EmprestimoService {
  private emprestimoRepository: EmprestimoRepository;
  private livroRepository: LivroRepository;
  private clienteRepository: ClientesRepository;

  constructor() {
    this.emprestimoRepository = new EmprestimoRepository();
    this.livroRepository = new LivroRepository();
    this.clienteRepository = new ClientesRepository();
  }

  async realizarEmprestimo(livroId: number, clienteId: number): Promise<Emprestimo> {
    const cliente = await this.clienteRepository.buscarPorId(clienteId);
    if (!cliente) {
      throw new Error(`Cliente com ID ${clienteId} não encontrado.`);
    }

    const livro = await this.livroRepository.buscarPorId(livroId);
    if (!livro) {
      throw new Error(`Livro com ID ${livroId} não encontrado.`);
    }

    if (livro.quantidade <= 0) {
      throw new Error(`O livro "${livro.titulo}" não está disponível no estoque.`);
    }

    const emprestimoExistente = await this.emprestimoRepository.buscarAtivo(livroId, clienteId);
    if (emprestimoExistente) {
      throw new Error("Este cliente já possui um empréstimo ativo deste livro.");
    }
    const novaQuantidade = livro.quantidade - 1;

    await this.livroRepository.alterarEstoque(livroId, novaQuantidade);
    return await this.emprestimoRepository.cadastrar(livroId, clienteId);
  }

  async registrarDevolucao(livroId: number, clienteId: number): Promise<void> {
    const emprestimoAtivo = await this.emprestimoRepository.buscarAtivo(livroId, clienteId);
    if (!emprestimoAtivo) {
      throw new Error("Não foi encontrado nenhum empréstimo ATIVO para este livro e cliente.");
    }

    await this.emprestimoRepository.registrarDevolucao(emprestimoAtivo.id!);
    const livro = await this.livroRepository.buscarPorId(livroId);
    if (livro) {
      await this.livroRepository.alterarEstoque(livroId, livro.quantidade + 1);
    }
  }

  async listarEmprestimos(): Promise<Emprestimo[]> {
    return await this.emprestimoRepository.listar();
  }
}
