import mongoose from 'mongoose';
import { app } from './app';
import { config } from './config';

async function start() {
  await mongoose.connect(config.MONGO_URI);
  console.log('Connected to MongoDB');
  app.listen(Number(config.PORT), () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start', err);
  process.exit(1);
});
