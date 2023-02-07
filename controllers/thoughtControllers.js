const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

const thoughtCount = async () =>
  Thought.aggregate()
    .count("thoughtCount")
    .then((numberOfThoughts) => numberOfThoughts);

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then(async (thought) => {
        const thoughtObj = {
          thought,
          thoughtCount: await thoughtCount(),
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that Id'})
        : res.json({
            thought,
            reaction: await reaction(req.params.thoughtID),
        })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
 },

 createThought(req, res) {
    Thought.create(req.body)
    .then((student) => res.json(student))
    .catch((err) => res.status(500).json(err));
 },

 deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtID })
    .then((thought) => 
    !thought
      ? res.status(404).json({ message: 'No such thought exists' })
      : User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
      )
 )
 .then((user) =>
  !user
    ? res.status(404).json({
        message: 'Thought deleted, but no user found',
      })
    : res.json({ message: 'Thought succesfully deleted' })
 )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
 });
 },
 addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
    )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID =('})
            :res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
 },

 removeReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
    )
        .then((thought) =>
          !thought
            ? res
                .status(404)
                .json({ message: 'No thought found with that ID =(' })
            : res.json(thought)    
        )
        .catch((err) => res.status(500).json(err));
 },
};