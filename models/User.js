import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"]
    },
    password: {
      type: String,
      required: [true, "Please enter a password"]
    },
    email: {
      type: String,
      required: [true, "Please enter an email address"]
    },
    address: {
      type: String,
      required: false
    },
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

export default User;