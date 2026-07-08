import pool from "../database/connection";
import { Livro } from "../models";

export class LivroRepository {
  async cadastrar(livro: Livro): Promise<Livro> {
    const query =
      "INSERT INTO livros (titulo, quantidade, genero, autor_id) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [
      livro.titulo,
      livro.quantidade,
      livro.genero,
      livro.autor_id,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async listar(): Promise<Livro[]> {
    const query =
      "SELECT l.*, a.nome as autor_nome FROM livros l INNER JOIN autores a ON l.autor_id = a.id ORDER BY l.id ASC";
    const { rows } = await pool.query(query);
    return rows;
  }

  async buscarPorId(id: number): Promise<Livro | null> {
    const query = "SELECT * FROM livros WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows.length ? rows[0] : null;
  }

  async deletarPorId(id: number): Promise<void> {
    const query = "DELETE FROM livros WHERE id = $1";
    await pool.query(query, [id]);
  }
}
