import mongoose from 'mongoose';
const tradeSchema = mongoose.Schema(
  {
    offerer: {
      type: String,
      required: [true, "Please enter the ID of the offerer"],
    },
    receiver: {
      type: String,
      required: [true, "Please enter the ID of the receiver"],
    },
    gamesOffered: {
      type: [String],
      required: [true, "Please specify games offered"],
    },
    gamesRequested: {
      type: [String],
      required: [true, "Please specify games requested"],
    },
    status: {
      type: String,
      required: [true, "Please enter the trade status"],
    },
  },
  {
    timestamps: true,
  }
);

const Trade = mongoose.model('Trade', tradeSchema);

export default Trade;