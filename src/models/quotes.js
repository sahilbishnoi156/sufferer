import { Schema, model, models } from 'mongoose';

const QuoteSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Title is required.'],
  },
  quote: {
    type: String,
    required: [true, 'Quote is required.'],
  },
  date:{
    type:String,
    default : Date.now
  }
});
QuoteSchema.set('toJSON', { getters: true, virtuals: false, minimize: false });
const Quote = models.Quote || model('Quote', QuoteSchema);

export default Quote;