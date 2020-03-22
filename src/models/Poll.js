import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const optionSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
}, {
  versionKey: false
});

const pollSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  options: {
    type: [optionSchema],
    required: true,
    default: undefined,
    validate: o => (o.length > 0),
  },
  views: {
    type: Number,
    default: 0,
  },
}, {
  versionKey: false,
});

export default model('Poll', pollSchema);
