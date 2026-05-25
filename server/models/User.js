const mongoose = require('mongoose');

// Intentional gap: no pre-save hook for password hashing here — done in controller
// Intentional gap: role is not validated server-side on registration (intern can pass any role)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Admin', 'Talent'],
      default: 'Talent',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
