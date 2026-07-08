//Temporario, usar como esqueleto para teste das CLI
  import { ClienteController } from "./controllers/ClienteController";

async function main() {
  console.log(" Inicializando BookStore Manager CLI...");

  const clienteController = new ClienteController();
  await clienteController.menuClientes();
}

main();
