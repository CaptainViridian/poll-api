import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const schema = new Schema({
  description: String,
  options: [{ description: String, votes: Number }],
  views: Number,
});

export default model('Poll', schema);
