import pool from "../database/connection";

export class RelatorioRepository {
  async livrosDisponiveis() {
    const query = "SELECT id, titulo, quantidade, genero FROM livros WHERE quantidade > 0 ORDER BY titulo ASC";
    return (await pool.query(query)).rows;
  }

  async livrosEmprestados() {
    const query = `
      SELECT e.id, l.titulo, c.nome AS cliente_nome, e.data_emprestimo
      FROM emprestimos e
      INNER JOIN livros l ON e.livro_id = l.id
      INNER JOIN clientes c ON e.cliente_id = c.id
      WHERE e.status = 'ATIVO'
    `;
    return (await pool.query(query)).rows;
  }

  async livrosPorAutor() {
    const query = `
      SELECT a.nome AS autor, COUNT(l.id) AS total_livros
      FROM autores a
      LEFT JOIN livros l ON a.id = l.autor_id
      GROUP BY a.nome
      ORDER BY total_livros DESC
    `;
    return (await pool.query(query)).rows;
  }

  async quantidadeEmprestimosPorLivro() {
    const query = `
      SELECT l.titulo, COUNT(e.id) AS total_emprestimos
      FROM livros l
      LEFT JOIN emprestimos e ON l.id = e.livro_id
      GROUP BY l.titulo
      ORDER BY total_emprestimos DESC
    `;
    return (await pool.query(query)).rows;
  }

  async clientesComEmprestimosAtivos() {
    const query = `
      SELECT DISTINCT c.id, c.nome, c.email
      FROM clientes c
      INNER JOIN emprestimos e ON c.id = e.cliente_id
      WHERE e.status = 'ATIVO'
    `;
    return (await pool.query(query)).rows;
  }
}
