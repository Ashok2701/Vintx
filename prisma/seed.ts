// prisma/seed.ts
import { prisma } from "@/lib/prisma";

async function main() {
  console.log("🌱 Starting database seed...");

  // Step 1: Create a user first
  const user = await prisma.user.upsert({
    where: { email: "seller@example.com" },
    update: {},
    create: {
      clerkId: "user_seed_example_123",
      email: "seller@example.com",
      name: "Example Seller",
      role: "seller",
    },
  });

  console.log("✅ Created user:", user.id);

  // Step 2: Create a category
  const category = await prisma.category.upsert({
    where: { slug: "clothing" },
    update: {},
    create: {
      name: "Clothing",
      slug: "clothing",
      gender: "unisex",
    },
  });

  console.log("✅ Created category:", category.id);

  // Step 3: Create a subcategory
  const subcategory = await prisma.category.upsert({
    where: { slug: "shirts" },
    update: {},
    create: {
      name: "Shirts",
      slug: "shirts",
      gender: "unisex",
      parentId: category.id,
    },
  });

  console.log("✅ Created subcategory:", subcategory.id);

  // Step 4: Create products using the actual IDs
  const product1 = await prisma.product.upsert({
    where: { id: "seed_product_1" },
    update: {},
    create: {
      id: "seed_product_1",
      name: "Classic White Shirt",
      description: "A crisp white shirt perfect for formal occasions.",
      price: 99.99,
      images: ["https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg"],
      sellerId: user.id,
      categoryId: subcategory.id,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { id: "seed_product_2" },
    update: {},
    create: {
      id: "seed_product_2",
      name: "Blue Denim Shirt",
      description: "Comfortable denim shirt for casual wear.",
      price: 79.99,
      images: ["https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"],
      sellerId: user.id,
      categoryId: subcategory.id,
    },
  });

  console.log("✅ Created products:", product1.id, product2.id);
  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });