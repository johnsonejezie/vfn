import mongoose from 'mongoose';

const { Schema } = mongoose;

const channelSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  url: {
    type: String,
  },
  description: {
    type: String,
  },
  level: {
    type: String,
    enum: ['country', 'state', 'lga', 'ward', 'pu'],
    default: 'pu',
  }
}, {
  timestamp: true,
});


export default mongoose.model('Channel', channelSchema);