const users = [
  {
    username: 'jabbatheHut34',
    email: 'jabba@example.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'kyloren43!',
    email: 'kylo@mail.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'r2D2',
    email: 'deetu@droids.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'darthdarth11!',
    email: 'vader@space.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'leiaSkywalker',
    email: 'organa@mailwars.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'genGrieveous$',
    email: 'octorobot@maul.com',
    thoughts: [],
    friends: []
  },
  {
    username: 'chewbacca4!$',
    email: 'wookies@Nabu.com',
    thoughts: [],
    friends: []
  },
];

const thoughts = [
  {
    thoughtText: 'May the force be with us all!',
    createdAt: new Date(),
    username: 'leiaSkywalker',
    reactions: []
  },
  {
    thoughtText: 'Need some WD40 for bionic legs.',
    createdAt: new Date(),
    username: 'genGrieveous$',
    reactions: []
  },
  {
    thoughtText: 'Im a gangster slug.',
    createdAt: new Date(),
    username: 'jabbatheHut34',
    reactions: []
  },
  {
    thoughtText: 'I find your lack of faith disturbing.',
    createdAt: new Date(),
    username: 'darthdarth11!',
    reactions: []
  },
  {
    thoughtText: 'MORE!',
    createdAt: new Date(),
    username: 'kyloren43!',
    reactions: []
  },
  {
    thoughtText: 'barrrggghhh',
    createdAt: new Date(),
    username: 'chewbacca4!$',
    reactions: []
  },
];

const possibleReactions = [
  {
    reactionBody: 'Cool',
  },
  {
    reactionBody: 'Lame!',
  },
  {
    reactionBody: 'Like',
  },
];

// Export the functions for use in seed.js
module.exports = { users, thoughts, possibleReactions };
