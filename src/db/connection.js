import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/latitite',)
  .then(() => {
    console.log('DB connected successfully');
  })
  .catch((e) => {
    console.log('DB connection failed', e);
  });

export default mongoose;