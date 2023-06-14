const connection = require("../config/connection");
const { User, Reaction, Thought } = require("../models");
const {
  getRandomUsername,
  getRandomThought,
  getRandomReaction,
  getRandomEmail,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("Connected to the database.");

  // Drop existing data
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Loop 10 times -- add users to the users array
  for (let i = 0; i < 10; i++) {
    const username = getRandomUsername();
    const email = getRandomEmail();
    users.push({ username, email });
  }

  // Add users to the collection and await the results
  const createdUsers = await User.insertMany(users);

  // Create empty array to hold the thoughts
  const thoughts = [];

  // Loop through each user and add random thoughts
  for (let user of createdUsers) {
    const thought = getRandomThought();
    thoughts.push({ thought, username: user.username, userId: user._id });
  }

  // Add thoughts to the collection and await the results
  const createdThoughts = await Thought.insertMany(thoughts);

  // Loop through each thought and add random reactions
  for (let thought of createdThoughts) {
    const reactions = [];
    for (let i = 0; i < 5; i++) {
      const reaction = getRandomReaction();
      reaction.thoughtId = thought._id;
      reactions.push(reaction);
    }
    await Reaction.insertMany(reactions);
  }

  console.log("Seeding complete!");

  process.exit(0);
});
