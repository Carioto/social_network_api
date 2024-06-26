const connection = require("../config/connection");
const User = require("../models/User");

connection.once("open", async () => {
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  const users = [
    {
      username: "darkskies",
      email: "darkskies@clearskies.com",
    },
  ];

  await User.collection.insertMany(users);
  console.table(users);
  console.log("seeding complete");
  process.exit(0);
});
