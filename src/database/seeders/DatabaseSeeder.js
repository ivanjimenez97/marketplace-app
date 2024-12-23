import { Role } from "../../models/role.model.js";
import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs";

// Execute the seeder
(async () => {
  try {
    await Role.bulkCreate([
      {
        name: "Admin",
      },
      {
        name: "Seller",
      }
    ]);

    await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@testmail.com",
      password: await bcrypt.hash("abc123", 10),
      phone: "9876543210",
      roleId: 1
    }); // Insert main user
    console.log(`Main Test Records created successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("Error creating users:", error);
    process.exit(1);
  }
})();