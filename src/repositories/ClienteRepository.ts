import pool from "../database/connection";
import { Cliente } from "../models";

export class ClientesRepository {
    async cadastrar(cliente: Cliente): Promise<Cliente> {
    const query =
      "INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *";
    const values = [cliente.nome, cliente.email, cliente.telefone];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async listar(): Promise<Cliente[]> {
    const query = "SELECT * FROM clientes ORDER BY id ASC";
    const { rows } = await pool.query(query);
    return rows;
  }

  async buscarPorId(id: number): Promise<Cliente | null> {
    const query = "SELECT * FROM clientes WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows.length ? rows[0] : null;
  }

  async deletarPorId(id: number): Promise<void> {
    const query = "DELETE FROM clientes WHERE id = $1";
    await pool.query(query, [id]);
  }

  async atualizar(id: number, nome: string, email: string, telefone: string): Promise<void> {
    const query = "UPDATE clientes SET nome = $1, email = $2, telefone = $3 WHERE id = $4";
    await pool.query(query, [nome, email, telefone, id]);
  }
}
