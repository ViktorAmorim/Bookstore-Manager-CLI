import { AutorController } from './controllers/AutorController';

async function bootstrap() {
  console.log(' Inicializando BookStore Manager CLI...');
  
  const autorController = new AutorController();
  await autorController.menuAutores();
}

bootstrap();