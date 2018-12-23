import mongoose from 'mongoose';

const { Schema } = mongoose;

const pollingUnitSchema = new Schema({
  name: {
    type: String,
  }, 
  ward: {
   type: Schema.Types.ObjectId,
   required: true,
  }
}, {
  timestamp: true,
});


export default mongoose.model('PollingUnit', pollingUnitSchema);