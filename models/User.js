const { Schema, model } = require("mongoose");

//Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      //unique ID
      required: true,
      //trim
    },
    email: {
      type: String,
      required: true,
      //unique ID
      //matching validation
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount')
  .get(function () {
    return `${this.friends.length}`;
  });

  const User = model('user', userSchema);

  module.exports = User;
