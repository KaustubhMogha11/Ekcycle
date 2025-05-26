import mongoose from 'mongoose';

const DbConnection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@ekcycle.ej3rk02.mongodb.net/ekcycle?retryWrites=true&w=majority&appName=Ekcycle`;

  try {
    await mongoose.connect(URL);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    throw error; 
  }
};

export default DbConnection;
