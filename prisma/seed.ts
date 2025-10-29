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
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1426869884541-df7117556757?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1599785209796-786432b228bc?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80',
    emoji: '💍',
    flavors: JSON.stringify(['Champagne', 'Vanilla', 'Chocolate', 'Red Velvet']),
    sizes: null,
  },
]

async function main() {
  console.log('Starting seed...')

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
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
