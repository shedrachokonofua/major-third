import { Schema, Types } from 'mongoose';

export default new Schema({
  name: {
    type: String,
    required: true 
  },
  artists: [{
    type: String,
    required: true 
  }],
  genres: [{
    type: String,
    default: []
  }],
  descriptors: [{
    type: String,
    default: []
  }],
  meta: {
    type: Types.Mixed,
    default: {}
  }
});