import { server } from '@/server';
import { config } from '@config/env';
import { initDatabase } from '@config/database';

const PORT = config.PORT;

const startServer = async () => {
  await initDatabase();

  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(
      `📚 API Documentation available on http://localhost:${PORT}/api-docs`
    );
  });
};

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
