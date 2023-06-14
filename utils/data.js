const usernames = [
  "joey234",
  "emma456",
  "john_doe",
  "jane_smith",
  "alex_789",
  "sarah80",
  "michael_j",
  "amanda_t",
  "david12",
  "olivia34",
];

const thoughts = [
  "I love coding!",
  "Just finished a great book.",
  "Had a delicious meal today.",
  "Excited for the weekend!",
  "Feeling grateful for my friends.",
  "Enjoying a beautiful sunset.",
  "Working on a challenging project.",
  "Hiking is my favorite activity.",
  "Listening to my favorite music.",
  "Missing my family.",
];

const emailDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "example.com",
];

const reactions = ["👍", "❤️", "😄", "😊", "😃", "🔥", "🎉", "👏", "🙌", "💯"];

const getRandomEmail = () => {
  const username = getRandomArrItem(usernames).toLowerCase();
  const domain = getRandomArrItem(emailDomains);
  return `${username}@${domain}`;
};

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUsername = () => getRandomArrItem(usernames);

const getRandomThought = () => getRandomArrItem(thoughts);

const getRandomReaction = () => getRandomArrItem(reactions);

module.exports = {
  getRandomUsername,
  getRandomThought,
  getRandomReaction,
  getRandomEmail,
};
