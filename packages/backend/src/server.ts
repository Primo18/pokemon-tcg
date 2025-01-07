import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '@config/swagger';
import { config } from '@config/env';
import { router } from '@routes/index';

export const server = express();

// Middlewares
server.use(
  cors({
    origin: config.CORS_ORIGIN,
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Swagger UI 
if (config.NODE_ENV === 'development') {
  const swaggerOptions = {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      filter: true,
      showCommonExtensions: true,
      syntaxHighlight: {
        theme: 'monokai',
      },
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Pokémon TCG - Documentación',
  };

  server.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerOptions)
  );
}

// API Routes
server.use('/api', router);

// Error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});
