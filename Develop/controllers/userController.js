const { User, Thought } = require('../models');
module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
// update a user
async updateUser (req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );

      if (!updatedUser) {
        res.status(404).json({ message: "No user with this id" });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a friend to a user
async addFriend(req, res) {
  try {
    const { userId, friendId } = req.params;

    const friend = await User.findOne({ _id: friendId})

    if (!friend) {
      return res.status(404).json({ message: "No friend with this id" });
    }

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { friends: friend } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "No user with this id" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
},
  // Remove friend from a user
  async removeFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const user = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
      { runValidators: true, new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

