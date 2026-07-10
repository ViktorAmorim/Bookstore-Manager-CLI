export interface Autor {
  id?: number;
  nome: string;
  nacionalidade?: string;
}

export interface Livro {
  id?: number;
  titulo: string;
  quantidade: number;
  genero: string;
  autor_id: number;
  autor_nome?: string;
}

export interface Cliente {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
}

export interface Emprestimo {
  id?: number;
  livro_id: number;
  cliente_id: number;
  data_emprestimo?: Date;
  data_devolucao?: Date | null;
  status?: string;

  livro_titulo?: string;
  cliente_nome?: string;
}
