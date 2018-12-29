import mongoose from 'mongoose';

const { Schema } = mongoose;

const candidateSchema = new Schema({
  name: {
    type: String,
  },
  party: {
    type: String,
  },
  photo: {
    type: String,
  }
}, {
  timestamp: true,
});

export default mongoose.model('Candidate', candidateSchema);