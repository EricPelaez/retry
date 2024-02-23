import mongoose from 'mongoose';

const gameSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a game name"],
    },
    publisher: {
      type: String,
      required: [true, "Please enter a publisher"],
    },
    year: {
      type: Number,
      required: true,
    },
    gamingSystem: {
      type: String,
      required: [true, "Please enter a gaming system"],
    },
    condition: {
      type: String,
      required: false,
    },
    owners: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

gameSchema.index({ name: "text" });

const Game = mongoose.model('Game', gameSchema);

export default Game;