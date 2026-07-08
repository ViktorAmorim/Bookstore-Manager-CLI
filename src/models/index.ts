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
