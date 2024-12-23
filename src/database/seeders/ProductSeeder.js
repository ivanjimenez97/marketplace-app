import { faker } from "@faker-js/faker";
import { Product } from "../../models/product.model.js";

const productFactory = () => ({
  name: faker.commerce.productName(),
  sku: faker.string.alphanumeric(10),
  quantity: faker.number.int({ min: 1, max: 100 }),
  price: faker.commerce.price(),
  userId: 2, // Fixed user ID
});

const createTestProducts = async (count = 10) => {
  const testRecords = [];

  for (let i = 0; i < count; i++) {
    testRecords.push(productFactory());
  }

  await Product.bulkCreate(testRecords); // Insert multiple products at once
  console.log(`${count} test products created successfully.`);
};

// Execute the seeder
(async () => {
  try {
    await createTestProducts(50); // Creates 50 products
    process.exit(0);
  } catch (error) {
    console.error("Error creating products:", error);
    process.exit(1);
  }
})();
