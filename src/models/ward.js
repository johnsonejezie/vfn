import mongoose from 'mongoose';

const { Schema } = mongoose;

const wardSchema = new Schema({
  name: {
    type: String,
  }, 
  lga: {
   type: Schema.Types.ObjectId,
   required: true,
  }
}, {
  timestamp: true,
});


export default mongoose.model('Ward', wardSchema);