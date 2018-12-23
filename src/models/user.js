import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    default: null,
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String,
  },
  vin_full: {
    type: String,
  },
  vin: {
    type: String,
    unique: true,
    required: true,
  },
  state: {
   type: String 
  },
  state_name: { type: String },
  lga_name: { type: String },
  lga_id: { type: Schema.Types.ObjectId },
    gender: {
    type: String,
  },
  profession: {
    type: String,
  },
  ward: {
    type: String,
  },
  polling_unit: {
    type: String,
  },
  channels: {
    type: [Schema.Types.ObjectId],
    default: [],
  }
}, {
  timestamp: true,
});


export default mongoose.model('User', userSchema);