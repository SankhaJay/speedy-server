const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, required: true },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true
  },
  permission_level: {
    type: Number,
    required: true
  },
  contact_number: {
    type: String
  },
  nic: {
    type: String
  },
  avatar_url: {
    type: String
  },
  registered_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
