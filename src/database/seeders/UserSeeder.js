import { faker } from "@faker-js/faker";
import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs";

const userFactory = async () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: await bcrypt.hash(faker.internet.password(10), 10), //this line is causing issues. ---> password: Promise { <pending> },
  phone: faker.phone.number({ style: "international" }),
  roleId: faker.number.bigInt({ min: 1, max: 3 }),
});

const createTestUsers = async (count = 10) => {
  const testRecords = [];

  for (let i = 0; i < count; i++) {
    testRecords.push(await userFactory());
  }

  //console.log("Data: ", testRecords);
  await User.bulkCreate(testRecords); // Insert multiple users at once
  console.log(`${count} test users created successfully.`);
};

// Execute the seeder
(async () => {
  try {
    await createTestUsers(50); // Creates 50 users
    process.exit(0);
  } catch (error) {
    console.error("Error creating users:", error);
    process.exit(1);
  }
})();