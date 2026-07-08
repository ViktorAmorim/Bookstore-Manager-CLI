import { ClientesRepository } from "../repositories/ClienteRepository";
import { Cliente } from "../models";

export class ClienteService {
  private clientesRepository: ClientesRepository;

  constructor() {
    this.clientesRepository = new ClientesRepository();
  }

  async cadastrarCliente(nome: string, email: string, telefone: string): Promise<Cliente> {
    if (!nome || nome.trim() === "") {
      throw new Error("O nome do cliente é obrigatório.");
    }
    if (!email || email.trim() === "") {
      throw new Error("O email do cliente é obrigatório.");
    }

    return await this.clientesRepository.cadastrar({
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
    });
  }

  async listarClientes(): Promise<Cliente[]> {
    return await this.clientesRepository.listar();
  }

  async buscarClientePorId(id: number): Promise<Cliente> {
    const cliente = await this.clientesRepository.buscarPorId(id);
    if (!cliente) {
      throw new Error(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  async deletarClientePorId(id: number): Promise<void> {
    const cliente = await this.clientesRepository.buscarPorId(id);
    if (!cliente) {
      throw new Error(`Cliente com ID ${id} não encontrado.`);
    }
    await this.clientesRepository.deletarPorId(id);
  }

  async atualizarCliente(id: number, nome: string, email: string, telefone: string): Promise<void> {
    const cliente = await this.clientesRepository.buscarPorId(id);
    if (!cliente) {
      throw new Error(`Cliente com ID ${id} não encontrado.`);
    }
    const telefoneAtualizado = telefone.trim() || cliente.telefone;
    await this.clientesRepository.atualizar(id, nome, email, telefoneAtualizado);
  }
}
