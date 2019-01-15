
import mongoose from 'mongoose';
import Admin from './admin';

const { Schema } = mongoose;

const messageSchema = new Schema({
    status: {
      type: String,
      enum: ['sent', 'pending'],
    },
    channels: {
      type: Array
    },
    states: {
      type: [String]
    },
    lgas: {
      type: [String]
    },
    wards: {
      type: [String]
    },
    polling_units: {
      type: [String],
    },
    is_scheduled: {
      type: Boolean,
      default: false,
    },
    scheduled_date: {
      type: Date,
      default: null,
    },
    message: {
     type: String,
     required: true,
    },
    sent_by: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },{
    timestamps: true
  });
  
  export default mongoose.model('Message', messageSchema);