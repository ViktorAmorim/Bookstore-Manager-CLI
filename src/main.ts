import { menuPrincipal } from "./menus/menuPrincipal";

async function main() {
  console.log("=".repeat(40));
  console.log(" Inicializando BookStore Manager CLI...");

  await menuPrincipal();
}

main();
