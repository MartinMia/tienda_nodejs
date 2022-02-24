import mongoose from 'mongoose';

export const configureDatabase = async () => {
  mongoose.connect(process.env.MONGODB_URI || '', {})
    .then(() => { console.log('🟢 The database is connected.'); mongoose.set('debug', true); })
    .catch((error: Error) => { console.error(`🔴 Unable to connect to the database: ${error}.`); });
};