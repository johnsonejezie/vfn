import mongoose from 'mongoose';

const { Schema } = mongoose;

const lgaSchema = new Schema({
  name: {
    type: String,
  }, 
  state: {
   type: Schema.Types.ObjectId,
   required: true,
  }
}, {
  timestamp: true,
});


export default mongoose.model('LGA', lgaSchema);