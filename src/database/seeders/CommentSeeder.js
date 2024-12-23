import { faker } from "@faker-js/faker";
import { Comment } from "../../models/comment.model.js";

const commentFactory = async () => ({
  email: faker.internet.email(),
  description: faker.lorem.text(),
});

const createTestUsers = async (count = 10) => {
  const testRecords = [];

  for (let i = 0; i < count; i++) {
    testRecords.push(await commentFactory());
  }

  //console.log("Data: ", testRecords);
  await Comment.bulkCreate(testRecords); // Insert multiple users at once
  console.log(`${count} test Comments created successfully.`);
};

// Execute the seeder
(async () => {
  try {
    await createTestUsers(30); // Creates 50 Comments
    process.exit(0);
  } catch (error) {
    console.error("Error creating Comments:", error);
    process.exit(1);
  }
})();
