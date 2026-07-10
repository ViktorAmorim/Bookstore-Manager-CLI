import pool from "../database/connection";
import { Emprestimo } from "../models";

export class EmprestimoRepository {
  async cadastrar(livroId: number, clienteId: number): Promise<Emprestimo> {
    const query = "INSERT INTO emprestimos (livro_id, cliente_id) VALUES ($1, $2) RETURNING *";
    const { rows } = await pool.query(query, [livroId, clienteId]);
    return rows[0];
  }

  async buscarAtivo(livroId: number, clienteId: number): Promise<Emprestimo | null> {
    const query = "SELECT * FROM emprestimos WHERE livro_id = $1 AND cliente_id = $2 AND status = 'ATIVO'";
    const { rows } = await pool.query(query, [livroId, clienteId]);
    return rows.length ? rows[0] : null;
  }

  async registrarDevolucao(id: number): Promise<void> {
    const query = "UPDATE emprestimos SET status = 'DEVOLVIDO', data_devolucao = NOW() WHERE id = $1";
    await pool.query(query, [id]);
  }

  async listar(): Promise<Emprestimo[]> {
    const query = `
      SELECT
          e.id,
          e.livro_id,
          l.titulo AS livro_titulo,
          e.cliente_id,
          c.nome AS cliente_nome,
          e.data_emprestimo,
          e.data_devolucao,
          e.status
      FROM emprestimos e
      INNER JOIN clientes c
          ON e.cliente_id = c.id
      INNER JOIN livros l
          ON e.livro_id = l.id
      ORDER BY e.data_emprestimo DESC;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }
}
