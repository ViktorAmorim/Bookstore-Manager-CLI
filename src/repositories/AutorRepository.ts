import pool from "../database/connection";
import { Autor } from "../models";

export class AutorRepository {
  async cadastrar(autor: Autor): Promise<Autor> {
    const query =
      "INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2) RETURNING *";
    const values = [autor.nome, autor.nacionalidade];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async listar(): Promise<Autor[]> {
    const query = "SELECT * FROM autores ORDER BY id ASC";
    const { rows } = await pool.query(query);
    return rows;
  }

  async buscarPorId(id: number): Promise<Autor | null> {
    const query = "SELECT * FROM autores WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows.length ? rows[0] : null;
  }

  async deletarPorId(id: number): Promise<void> {
    const query = "DELETE FROM autores WHERE id = $1";
    await pool.query(query, [id]);
  }
}
