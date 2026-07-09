//Temporario, usar como esqueleto para teste das CLI
  import { EmprestimoController } from "./controllers/EmprestimoController";

async function main() {
  console.log(" Inicializando BookStore Manager CLI...");

  const emprestimoController = new EmprestimoController();
  await emprestimoController.menuEmprestimos();
}

main();
