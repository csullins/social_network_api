const connection = require('../config/connection');
const User = require('./models/User');
const Thought = require('./models/Thought');
const { users, thoughts } = require('./data');


connection.on('error', (err) => err);

connection.once('open', async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();

    // Create users
    const users = await User.create([
      {
        username: 'user1',
        email: 'user1@example.com',
        thoughts: [],
        friends: []
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        thoughts: [],
        friends: []
      },
      // Add more users here as needed
    ]);
     // Create thoughts
     const thoughts = await Thought.create([
      {
        thoughtText: 'Thought 1',
        createdAt: new Date(),
        username: users[0].username,
        reactions: []
      },
      {
        thoughtText: 'Thought 2',
        createdAt: new Date(),
        username: users[1].username,
        reactions: []
      },
      // Add more thoughts here as needed
    ]);
    // Add thoughts to users' thoughts array
    users[0].thoughts.push(thoughts[0]);
    users[1].thoughts.push(thoughts[1]);
    await Promise.all(users.map(user => user.save()));

    // Create reactions
    const reactions = await Thought.findByIdAndUpdate(
      thoughts[0]._id,
      {
        $push: {
          reactions: {
            reactionBody: 'Reaction 1',
            username: users[1].username,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );

    console.log('Seeding complete! 🌱');

    connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
  }
});