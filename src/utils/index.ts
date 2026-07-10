import * as readline from "readline-sync";

export function obterTextoObrigatorio(prompt: string, mensagemErro: string = "Este campo é obrigatório."): string {
  let valor = readline.question(prompt).trim();
  while (!valor) {
    console.log(mensagemErro);
    valor = readline.question(prompt).trim();
  }
  return valor;
}

export function obterNumeroPositivo(prompt: string, mensagemErro: string = "Digite um número positivo válido."): number {
  let valor = parseInt(readline.question(prompt), 10);
  while (Number.isNaN(valor) || valor <= 0) {
    console.log(mensagemErro);
    valor = parseInt(readline.question(prompt), 10);
  }
  return valor;
}

export function obterNumeroNaoNegativo(prompt: string, mensagemErro: string = "Digite um número maior ou igual a zero."): number {
  let valor = parseInt(readline.question(prompt), 10);
  while (Number.isNaN(valor) || valor < 0) {
    console.log(mensagemErro);
    valor = parseInt(readline.question(prompt), 10);
  }
  return valor;
}
