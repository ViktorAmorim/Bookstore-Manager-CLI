import { AutorRepository } from '../repositories/AutorRepository';
import { Autor } from '../models';

export class AutorService {
  private autorRepository: AutorRepository;

  constructor() {
    this.autorRepository = new AutorRepository();
  }

  async cadastrarAutor(nome: string, nacionalidade?: string): Promise<Autor> {
    if (!nome || nome.trim() === '') {
      throw new Error('O nome do autor é obrigatório.');
    }

    return await this.autorRepository.cadastrar({ 
      nome: nome.trim(), 
      nacionalidade: nacionalidade?.trim() 
    });
  }

  async listarAutores(): Promise<Autor[]> {
    return await this.autorRepository.listar();
  }

  async buscarAutorPorId(id: number): Promise<Autor> {
    const autor = await this.autorRepository.buscarPorId(id);
    if (!autor) {
      throw new Error(`Autor com ID ${id} não encontrado.`);
    }
    return autor;
  }
}