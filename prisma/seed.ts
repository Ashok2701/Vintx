import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create conditions
  const conditions = await Promise.all([
    prisma.condition.upsert({
      where: { name: 'New with tags' },
      update: {},
      create: {
        name: 'New with tags',
        description: 'Brand new item with original tags attached'
      }
    }),
    prisma.condition.upsert({
      where: { name: 'Excellent' },
      update: {},
      create: {
        name: 'Excellent',
        description: 'Like new, barely worn with no visible flaws'
      }
    }),
    prisma.condition.upsert({
      where: { name: 'Very Good' },
      update: {},
      create: {
        name: 'Very Good',
        description: 'Gently used with minimal signs of wear'
      }
    }),
    prisma.condition.upsert({
      where: { name: 'Good' },
      update: {},
      create: {
        name: 'Good',
        description: 'Used with some signs of wear but still in good condition'
      }
    })
  ])

  // Create categories
  const womenCategory = await prisma.category.upsert({
    where: { slug: 'women' },
    update: {},
    create: {
      name: 'Women',
      slug: 'women',
      icon: '👗'
    }
  })

  const menCategory = await prisma.category.upsert({
    where: { slug: 'men' },
    update: {},
    create: {
      name: 'Men',
      slug: 'men',
      icon: '👔'
    }
  })

  const shoesCategory = await prisma.category.upsert({
    where: { slug: 'shoes' },
    update: {},
    create: {
      name: 'Shoes',
      slug: 'shoes',
      icon: '👟'
    }
  })

  // Create subcategories
  await prisma.category.upsert({
    where: { slug: 'dresses' },
    update: {},
    create: {
      name: 'Dresses',
      slug: 'dresses',
      parentId: womenCategory.id
    }
  })

  await prisma.category.upsert({
    where: { slug: 'shirts' },
    update: {},
    create: {
      name: 'Shirts',
      slug: 'shirts',
      parentId: menCategory.id
    }
  })

  // Create brands
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { name: 'Zara' },
      update: {},
      create: { name: 'Zara' }
    }),
    prisma.brand.upsert({
      where: { name: 'H&M' },
      update: {},
      create: { name: 'H&M' }
    }),
    prisma.brand.upsert({
      where: { name: 'Nike' },
      update: {},
      create: { name: 'Nike' }
    })
  ])

  // Create sizes
  const sizes = await Promise.all([
    prisma.size.upsert({
      where: { id: 'size-xs' },
      update: {},
      create: {
        id: 'size-xs',
        name: 'XS',
        category: 'clothing'
      }
    }),
    prisma.size.upsert({
      where: { id: 'size-s' },
      update: {},
      create: {
        id: 'size-s',
        name: 'S',
        category: 'clothing'
      }
    }),
    prisma.size.upsert({
      where: { id: 'size-m' },
      update: {},
      create: {
        id: 'size-m',
        name: 'M',
        category: 'clothing'
      }
    }),
    prisma.size.upsert({
      where: { id: 'size-l' },
      update: {},
      create: {
        id: 'size-l',
        name: 'L',
        category: 'clothing'
      }
    })
  ])

  // Create a test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      clerkId: 'user_test_123',
      email: 'test@example.com',
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      bio: 'Fashion enthusiast and sustainable shopping advocate',
      location: 'New York, NY',
      verified: true,
      rating: 4.8,
      totalSales: 15
    }
  })

  // Create sample products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        title: 'Vintage Leather Jacket',
        description: 'Beautiful vintage leather jacket in excellent condition. Perfect for fall and winter.',
        price: 89.99,
        originalPrice: 150.00,
        images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'],
        color: 'Black',
        material: 'Leather',
        sellerId: testUser.id,
        categoryId: womenCategory.id,
        brandId: brands[0].id,
        sizeId: sizes[2].id, // M
        conditionId: conditions[1].id, // Excellent
        views: 234,
        likes: 18
      }
    }),
    prisma.product.create({
      data: {
        title: 'Designer Handbag',
        description: 'Authentic designer handbag with minimal signs of wear. Comes with dust bag.',
        price: 245.00,
        originalPrice: 450.00,
        images: ['https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg'],
        color: 'Brown',
        material: 'Leather',
        sellerId: testUser.id,
        categoryId: womenCategory.id,
        brandId: brands[0].id,
        conditionId: conditions[1].id, // Excellent
        views: 156,
        likes: 32
      }
    }),
    prisma.product.create({
      data: {
        title: 'Casual Summer Dress',
        description: 'Light and airy summer dress, perfect for warm weather. Worn only a few times.',
        price: 35.00,
        originalPrice: 65.00,
        images: ['https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'],
        color: 'Blue',
        material: 'Cotton',
        sellerId: testUser.id,
        categoryId: womenCategory.id,
        brandId: brands[1].id,
        sizeId: sizes[1].id, // S
        conditionId: conditions[2].id, // Very Good
        views: 89,
        likes: 12
      }
    }),
    prisma.product.create({
      data: {
        title: 'Nike Sneakers',
        description: 'Classic Nike sneakers in great condition. Some signs of wear but lots of life left.',
        price: 120.00,
        originalPrice: 200.00,
        images: ['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'],
        color: 'White',
        material: 'Synthetic',
        sellerId: testUser.id,
        categoryId: shoesCategory.id,
        brandId: brands[2].id,
        conditionId: conditions[2].id, // Very Good
        views: 301,
        likes: 45
      }
    })
  ])

  console.log('✅ Database seeded successfully!')
  console.log(`Created ${conditions.length} conditions`)
  console.log(`Created ${brands.length} brands`)
  console.log(`Created ${sizes.length} sizes`)
  console.log(`Created ${products.length} products`)
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })