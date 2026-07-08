import { LivroRepository } from "../repositories/LivroRepository";
import { AutorService } from "./AutorService";
import { Livro } from "../models";

export class LivroService {
  private livroRepository: LivroRepository;
  private autorService: AutorService;

  constructor() {
    this.livroRepository = new LivroRepository();
    this.autorService = new AutorService();
  }

  async cadastrarLivro(
    titulo: string,
    quantidade: number,
    genero: string,
    autor_id: number,
    autor_nome?: string,
  ): Promise<Livro> {
    if (!titulo || titulo.trim() === "") {
      throw new Error("O titulo do livro é obrigatório.");
    }

    if (quantidade <= 0) {
      throw new Error("A quantidade do livro deve ser maior que zero.");
    }

    if (!genero || genero.trim() === "") {
      throw new Error("O genero do livro é obrigatório.");
    }

    if (autor_id <= 0) {
      throw new Error("O autor_id do livro é invalido.");
    }

    const autorExistente = await this.autorService.buscarAutorPorId(autor_id);
    if (!autorExistente) {
      throw new Error(`Autor com ID ${autor_id} nao encontrado.`);
    }
    return this.livroRepository.cadastrar({
      titulo,
      quantidade,
      genero,
      autor_id,
      autor_nome,
    });
  }

  async listarLivros(): Promise<Livro[]> {
    return await this.livroRepository.listar();
  }

  async buscarLivroPorId(id: number): Promise<Livro | null> {
    return await this.livroRepository.buscarPorId(id);
  }

  async removerLivroPorId(id: number): Promise<void> {
    const livroExistente = await this.livroRepository.buscarPorId(id);
    if (!livroExistente) {
      throw new Error(`Livro com ID ${id} nao encontrado.`);
    }
    await this.livroRepository.deletarPorId(id);
  }
}
