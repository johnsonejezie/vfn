import mongoose from 'mongoose';

const { Schema } = mongoose;

const stateSchema = new Schema({
  name: {
    type: String,
  },
  state_id: {
    type: String
  }
}, {
  timestamp: true,
});


export default mongoose.model('State', stateSchema);