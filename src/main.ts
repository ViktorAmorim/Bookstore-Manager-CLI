//Temporario, usar como esqueleto para teste das CLI
import { LivroController } from "./controllers/LivroController";

async function main() {
  console.log(" Inicializando BookStore Manager CLI...");

  const livroController = new LivroController();
  await livroController.menuLivros();
}

main();
