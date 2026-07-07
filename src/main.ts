import { AutorRepository } from "./repositories/AutorRepository";

async function main() {
  const autorRepository = new AutorRepository();
  const result = await autorRepository.cadastrar({
    nome: "Rahian",
    nacionalidade: "Brasileiro",
  });
  console.log(result);
}
main();
