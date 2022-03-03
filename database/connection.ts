import mongoose from 'mongoose';

export const configureDatabase = async () => {
  mongoose.connect(process.env.MONGODB_URI || '', {})
    .then(() => { 
      console.log('🟢 The database is connected.'); 
      // si no quieren ver las funciones que se ejecutan en la DB,
      // comenten la linea 9
      mongoose.set('debug', true); 
    })
    .catch((error: Error) => { console.error(`🔴 Unable to connect to the database: ${error}.`); });
};