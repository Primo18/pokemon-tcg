// eslint.config.mjs
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict, // Reglas estrictas para encontrar problemas
  tseslint.configs.stylistic, // Reglas estilísticas específicas de TypeScript
  prettierConfig, // Desactiva reglas que conflictúan con Prettier
  {
    // Ignoramos archivos que no necesitan linting
    ignores: [
      'dist/**', // Código compilado
      'build/**', // Archivos de construcció
      'node_modules/**', // Dependencias
      'coverage/**', // Reportes de cobertura
      '**/*.js.map', // Source maps
      '**/*.d.ts', // Archivos de declaración de tipos
      '**/*.min.js', // Archivos minificados
    ],
  }
);
