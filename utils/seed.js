const { users } = require("./data");
const { User, Thought } = require("../models");

const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      await User.deleteMany({});
    }
    const createdUsers = await User.insertMany(users);

    const thoughts = [];
    createdUsers.forEach((user) => {
      user.thoughts.forEach((thought) => {
        thoughts.push({
          thoughtText: thought.thoughtText,
          username: user.username,
          reactions: [],
        });
      });
    });

    await Thought.insertMany(thoughts);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding the database:", error.message);
  }

  process.exit(0);
};

seedDatabase();
