import { Autor } from "../models/index";
import pool from "../database/connection";

export class AutorRepository {
  async cadastrar(autor: Autor): Promise<Autor> {
    const query =
      "INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2) RETURNING *";
    const values = [autor.nome, autor.nacionalidade];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async listar(): Promise<Autor[]> {
    const query = "SELECT * FROM autores";
    const result = await pool.query(query);
    return result.rows;
  }

  async buscarPorId(id: number): Promise<Autor | null> {
    const query = "SELECT * FROM autores WHERE id = $1";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }
}

export default AutorRepository;
