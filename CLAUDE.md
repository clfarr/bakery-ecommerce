# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based e-commerce website for "Sweet Delights Bakery" - a business that sells custom cakes, cupcakes, and cake pops. The site features a full shopping cart system, product catalog, checkout flow, image gallery, contact form, and about page.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **State Management**: React Context API (for shopping cart)
- **Package Manager**: npm

## Development Commands

```bash
# Install dependencies
npm install

# Set up database (first time only)
DATABASE_URL="file:./dev.db" npx prisma migrate dev
DATABASE_URL="file:./dev.db" npx tsx prisma/seed.ts

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Database commands
DATABASE_URL="file:./dev.db" npx prisma studio  # Open Prisma Studio to view/edit database
DATABASE_URL="file:./dev.db" npx prisma migrate dev --name migration_name  # Create new migration
DATABASE_URL="file:./dev.db" npx tsx prisma/seed.ts  # Re-seed database
```

## Project Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with CartProvider
│   ├── page.tsx            # Homepage
│   ├── products/           # Product catalog and detail pages
│   │   ├── page.tsx        # Product listing with category filter
│   │   └── [id]/page.tsx   # Individual product detail page
│   ├── cart/               # Shopping cart page
│   ├── checkout/           # Checkout and order form
│   ├── order-confirmation/ # Post-order confirmation page
│   ├── gallery/            # Image gallery with modal viewer
│   ├── about/              # About page with bakery story
│   └── contact/            # Contact form
├── components/             # Reusable React components
│   ├── Navbar.tsx          # Main navigation with cart icon
│   └── Footer.tsx          # Site footer with links and contact info
├── context/
│   ├── CartContext.tsx     # Shopping cart state management
│   └── AdminContext.tsx    # Admin authentication
├── lib/
│   ├── prisma.ts           # Prisma client singleton
│   └── products.ts         # Product API utilities
└── types/
    └── index.ts            # TypeScript type definitions

prisma/
├── schema.prisma           # Database schema
├── migrations/             # Database migrations
└── seed.ts                 # Database seeding script

public/
└── images/                 # Static images
```

### Key Architecture Patterns

**State Management**:
- Shopping cart state is managed via React Context API (CartContext)
- Cart data persists to localStorage for user convenience
- Context is provided at the root layout level

**Database**:
- SQLite database with Prisma ORM
- Products are stored in the database with full CRUD operations
- Database file: `prisma/dev.db`
- Prisma schema: `prisma/schema.prisma`
- API routes in `src/app/api/products/` handle all database operations

**Routing**:
- Uses Next.js App Router with file-based routing
- Dynamic routes for individual products: `/products/[id]`
- Query params for category filtering: `/products?category=cakes`

**Styling**:
- Tailwind CSS with custom primary color palette (warm bakery tones)
- Responsive design with mobile-first approach
- Custom gradient backgrounds for product images (using emojis as placeholders)

## Data Models

### Product
```typescript
{
  id: string
  name: string
  description: string
  price: number
  category: 'cakes' | 'cupcakes' | 'cake-pops'
  emoji: string  // Visual placeholder
  flavors?: string[]
  sizes?: string[]
}
```

### CartItem
```typescript
{
  product: Product
  quantity: number
  selectedFlavor?: string
  selectedSize?: string
}
```

### OrderFormData
```typescript
{
  firstName: string
  lastName: string
  email: string
  phone: string
  deliveryMethod: 'pickup' | 'delivery'
  address?: string
  city?: string
  zipCode?: string
  specialInstructions?: string
}
```

## Database Schema

### Product Model
```typescript
{
  id: string (cuid)
  name: string
  description: string
  price: float
  category: string ('cakes' | 'cupcakes' | 'cake-pops')
  image: string (optional, URL to image)
  emoji: string (fallback visual)
  flavors: string (JSON array)
  sizes: string (JSON array, optional)
  createdAt: DateTime
  updatedAt: DateTime
}
```

## API Routes

### GET /api/products
Get all products, optionally filtered by category
- Query params: `?category=cakes|cupcakes|cake-pops`

### GET /api/products/[id]
Get single product by ID

### PUT /api/products/[id]
Update product (admin only)
- Body: Product object with updated fields

### DELETE /api/products/[id]
Delete product (admin only)

## Admin Panel

Access: `/admin`
Password: `bakery123` (demo only - change in production)

Features:
- View all products
- Edit product details
- Update product images
- Change prices, descriptions, flavors, sizes
- Changes persist in database

## Cart Functionality

The shopping cart system includes:
- Add items with flavor/size selection
- Update quantities
- Remove items
- Persistent storage via localStorage
- Real-time total calculation
- Item count badge in navbar

Cart context methods:
- `addToCart(product, quantity, flavor?, size?)`
- `removeFromCart(productId)`
- `updateQuantity(productId, quantity)`
- `clearCart()`

## Checkout Flow

1. User adds items to cart with flavor/size selections
2. Cart page shows items, quantities, and subtotal
3. Checkout page collects customer information
4. Delivery method selection (pickup or delivery)
5. Order submission (currently simulated, logs to console)
6. Redirect to order confirmation page
7. Cart is cleared after successful order

## Image Assets

Currently using emoji placeholders for product images. To add real images:
1. Place images in `public/images/`
2. Update product data to reference image paths
3. Use Next.js `<Image>` component for optimization
4. Configure `next.config.js` if using external image sources

## Customization Notes

**Colors**: Primary color palette is defined in `tailwind.config.ts` (warm brown/orange tones suitable for a bakery)

**Products**: Add/edit products in `src/data/products.ts`

**Contact Info**: Update footer and contact page with actual business details

**Forms**: Currently simulate submission (console.log). Integrate with backend API or form service for production

## Future Enhancements

Potential features to add:
- Backend API integration for order processing
- Payment gateway integration (Stripe, Square)
- Admin dashboard for order management
- User accounts and order history
- Real product images and photo uploads
- Email notifications
- Inventory management
- Reviews and ratings system
