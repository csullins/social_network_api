const connection = require('../config/connection');
const User = require('../models/User');
const Thought = require('../models/Thought');
const { users, thoughts, possibleReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected!')
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();
  
    // Create users
    const createdUsers = await User.create(users);

     // Create thoughts and associate them with users
     const createdThoughts = await Thought.create(
      thoughts.map((thought) => ({
        ...thought,
        username: createdUsers.find((user) => user.username === thought.username).username,
      }))
    );
    // Add thoughts to users' thoughts array
 createdThoughts.forEach((thought) => {
      const user = createdUsers.find((user) => user.username === thought.username);
       if (user) {
        user.thoughts.push(thought._id);
       }
    });
    
   // Save the updated users
   await Promise.all(createdUsers.map((user) => user.save()));

    // Create reactions and associate them with thoughts
    createdThoughts.forEach((thought) => {
      const reactions = [];
    
      for (let i = 0; i < 2; i++) {
        const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
        const randomReaction = possibleReactions[Math.floor(Math.random() * possibleReactions.length)];
    
        reactions.push({
          reactionBody: randomReaction.reactionBody,
          username: randomUser.username,
        });
        
      }
      
      thought.reactions = reactions;
    });

    await Promise.all(createdThoughts.map((thought) => thought.save()));

    console.log('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
  }
});