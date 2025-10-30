import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

const products = [
  // Cakes
  {
    id: 'classic-vanilla-cake',
    name: 'Classic Vanilla Cake',
    description: 'A timeless favorite with moist vanilla layers and creamy buttercream frosting',
    price: 45.00,
    category: 'cakes',
    image: '/images/products/vanilla-cake.jpg',
    emoji: '🎂',
    flavors: JSON.stringify(['Vanilla', 'Chocolate', 'Red Velvet', 'Lemon']),
    sizes: JSON.stringify(['6 inch (serves 8)', '8 inch (serves 12)', '10 inch (serves 20)']),
  },
  {
    id: 'chocolate-dream-cake',
    name: 'Chocolate Dream Cake',
    description: 'Rich chocolate cake with decadent chocolate ganache and buttercream',
    price: 50.00,
    category: 'cakes',
    image: '/images/products/chocolate-cake.jpg',
    emoji: '🍫',
    flavors: JSON.stringify(['Dark Chocolate', 'Milk Chocolate', 'Triple Chocolate']),
    sizes: JSON.stringify(['6 inch (serves 8)', '8 inch (serves 12)', '10 inch (serves 20)']),
  },
  {
    id: 'red-velvet-cake',
    name: 'Red Velvet Elegance',
    description: 'Smooth red velvet cake with cream cheese frosting',
    price: 48.00,
    category: 'cakes',
    image: '/images/products/red-velvet-cake.jpg',
    emoji: '❤️',
    flavors: JSON.stringify(['Classic Red Velvet', 'Blue Velvet', 'Pink Velvet']),
    sizes: JSON.stringify(['6 inch (serves 8)', '8 inch (serves 12)', '10 inch (serves 20)']),
  },
  {
    id: 'custom-wedding-cake',
    name: 'Custom Wedding Cake',
    description: 'Elegant multi-tier wedding cake customized to your specifications',
    price: 200.00,
    category: 'cakes',
    image: '/images/products/wedding-cake.jpg',
    emoji: '💒',
    flavors: JSON.stringify(['Vanilla', 'Chocolate', 'Red Velvet', 'Lemon', 'Strawberry', 'Almond']),
    sizes: JSON.stringify(['2 tier (serves 30)', '3 tier (serves 50)', '4 tier (serves 75)']),
  },
  {
    id: 'birthday-celebration-cake',
    name: 'Birthday Celebration Cake',
    description: 'Festive birthday cake with custom decorations and sprinkles',
    price: 55.00,
    category: 'cakes',
    image: '/images/products/birthday-cake.jpg',
    emoji: '🎉',
    flavors: JSON.stringify(['Funfetti', 'Chocolate', 'Vanilla', 'Strawberry']),
    sizes: JSON.stringify(['6 inch (serves 8)', '8 inch (serves 12)', '10 inch (serves 20)']),
  },
  // Cupcakes
  {
    id: 'classic-vanilla-cupcakes',
    name: 'Classic Vanilla Cupcakes',
    description: 'Light and fluffy vanilla cupcakes with buttercream frosting',
    price: 3.50,
    category: 'cupcakes',
    image: '/images/products/vanilla-cupcakes.jpg',
    emoji: '🧁',
    flavors: JSON.stringify(['Vanilla', 'Chocolate', 'Strawberry', 'Lemon']),
    sizes: null,
  },
  {
    id: 'chocolate-cupcakes',
    name: 'Chocolate Cupcakes',
    description: 'Rich chocolate cupcakes with chocolate buttercream',
    price: 3.50,
    category: 'cupcakes',
    image: '/images/products/chocolate-cupcakes.jpg',
    emoji: '🍫',
    flavors: JSON.stringify(['Dark Chocolate', 'Milk Chocolate', 'Chocolate Mint']),
    sizes: null,
  },
  {
    id: 'red-velvet-cupcakes',
    name: 'Red Velvet Cupcakes',
    description: 'Classic red velvet cupcakes with cream cheese frosting',
    price: 4.00,
    category: 'cupcakes',
    image: '/images/products/red-velvet-cupcakes.jpg',
    emoji: '❤️',
    flavors: JSON.stringify(['Red Velvet', 'Blue Velvet']),
    sizes: null,
  },
  {
    id: 'specialty-cupcakes',
    name: 'Specialty Cupcakes',
    description: 'Gourmet cupcakes with premium ingredients and unique flavors',
    price: 5.00,
    category: 'cupcakes',
    image: '/images/products/specialty-cupcakes.jpg',
    emoji: '✨',
    flavors: JSON.stringify(['Salted Caramel', 'Cookies & Cream', 'Nutella', 'S\'mores', 'Lemon Raspberry']),
    sizes: null,
  },
  {
    id: 'mini-cupcakes',
    name: 'Mini Cupcakes',
    description: 'Bite-sized cupcakes perfect for parties (minimum order: 24)',
    price: 2.00,
    category: 'cupcakes',
    image: '/images/products/mini-cupcakes.jpg',
    emoji: '🧁',
    flavors: JSON.stringify(['Vanilla', 'Chocolate', 'Strawberry', 'Red Velvet']),
    sizes: null,
  },
  // Cake Pops
  {
    id: 'classic-cake-pops',
    name: 'Classic Cake Pops',
    description: 'Delicious cake pops dipped in chocolate (minimum order: 12)',
    price: 3.00,
    category: 'cake-pops',
    image: '/images/products/classic-cake-pops.jpg',
    emoji: '🍭',
    flavors: JSON.stringify(['Vanilla', 'Chocolate', 'Red Velvet', 'Funfetti']),
    sizes: null,
  },
  {
    id: 'fancy-cake-pops',
    name: 'Fancy Cake Pops',
    description: 'Decorated cake pops with custom designs and drizzles',
    price: 4.50,
    category: 'cake-pops',
    image: '/images/products/fancy-cake-pops.jpg',
    emoji: '✨',
    flavors: JSON.stringify(['Vanilla', 'Chocolate', 'Red Velvet', 'Cookies & Cream', 'Strawberry']),
    sizes: null,
  },
  {
    id: 'themed-cake-pops',
    name: 'Themed Cake Pops',
    description: 'Custom themed cake pops for special occasions (minimum order: 12)',
    price: 5.50,
    category: 'cake-pops',
    image: '/images/products/themed-cake-pops.jpg',
    emoji: '🎨',
    flavors: JSON.stringify(['Vanilla', 'Chocolate', 'Red Velvet', 'Funfetti']),
    sizes: null,
  },
  {
    id: 'wedding-cake-pops',
    name: 'Wedding Cake Pops',
    description: 'Elegant cake pops perfect for wedding favors (minimum order: 24)',
    price: 5.00,
    category: 'cake-pops',
    image: '/images/products/wedding-cake-pops.jpg',
    emoji: '💍',
    flavors: JSON.stringify(['Champagne', 'Vanilla', 'Chocolate', 'Red Velvet']),
    sizes: null,
  },
]

const galleryItems = [
  {
    id: 'gallery-wedding-cake',
    name: 'Elegant Wedding Cake',
    description: '3-tier vanilla wedding cake with elegant buttercream flowers',
    category: 'cakes',
    image: '/images/products/wedding-cake.jpg',
    order: 1,
  },
  {
    id: 'gallery-chocolate-cake',
    name: 'Chocolate Dream',
    description: 'Rich chocolate cake with decadent ganache',
    category: 'cakes',
    image: '/images/products/chocolate-cake.jpg',
    order: 2,
  },
  {
    id: 'gallery-birthday-cake',
    name: 'Birthday Celebration',
    description: 'Colorful funfetti design perfect for birthdays',
    category: 'cakes',
    image: '/images/products/birthday-cake.jpg',
    order: 3,
  },
  {
    id: 'gallery-red-velvet',
    name: 'Red Velvet Romance',
    description: 'Classic red velvet with cream cheese frosting',
    category: 'cakes',
    image: '/images/products/red-velvet-cake.jpg',
    order: 4,
  },
  {
    id: 'gallery-vanilla-cupcakes',
    name: 'Vanilla Cupcakes',
    description: 'Classic vanilla cupcakes with swirl frosting',
    category: 'cupcakes',
    image: '/images/products/vanilla-cupcakes.jpg',
    order: 5,
  },
  {
    id: 'gallery-chocolate-cupcakes',
    name: 'Chocolate Cupcakes',
    description: 'Double chocolate delight',
    category: 'cupcakes',
    image: '/images/products/chocolate-cupcakes.jpg',
    order: 6,
  },
  {
    id: 'gallery-specialty-cupcakes',
    name: 'Specialty Cupcakes',
    description: 'Gourmet flavors with premium ingredients',
    category: 'cupcakes',
    image: '/images/products/specialty-cupcakes.jpg',
    order: 7,
  },
  {
    id: 'gallery-cake-pops',
    name: 'Classic Cake Pops',
    description: 'Delicious cake pops dipped in chocolate',
    category: 'cake-pops',
    image: '/images/products/classic-cake-pops.jpg',
    order: 8,
  },
  {
    id: 'gallery-fancy-cake-pops',
    name: 'Fancy Cake Pops',
    description: 'Decorated cake pops with custom designs',
    category: 'cake-pops',
    image: '/images/products/fancy-cake-pops.jpg',
    order: 9,
  },
  {
    id: 'gallery-themed-cake-pops',
    name: 'Themed Cake Pops',
    description: 'Custom themed cake pops for special occasions',
    category: 'cake-pops',
    image: '/images/products/themed-cake-pops.jpg',
    order: 10,
  },
]

async function main() {
  console.log('Starting seed...')

  // Seed products
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    })
  }

  // Seed gallery items
  for (const item of galleryItems) {
    await prisma.galleryItem.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    })
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
