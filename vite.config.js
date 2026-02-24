import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        index_archive: resolve(__dirname, 'index-archive.html'),
        membresias: resolve(__dirname, 'membresias.html'),
        nuestro_equipo: resolve(__dirname, 'nuestro-equipo.html'),
        politica_privacidad: resolve(__dirname, 'politica-privacidad.html'),
        proyectos: resolve(__dirname, 'proyectos.html'),
        quienes_somos: resolve(__dirname, 'quienes-somos.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        terminos_condiciones: resolve(__dirname, 'terminos-condiciones.html')
      }
    }
  }
});
