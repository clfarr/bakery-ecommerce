# 🎂 Sweet Delights Bakery

A full-stack e-commerce website for a bakery business, featuring a complete online ordering system with shopping cart, checkout, admin dashboard, and database integration.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Prisma](https://img.shields.io/badge/Prisma-6-2d3748)

## 🌟 Features

### Customer Features
- **Product Catalog** - Browse cakes, cupcakes, and cake pops with filtering by category
- **Product Details** - Detailed product pages with flavor/size selection
- **Shopping Cart** - Full cart functionality with quantity controls and persistent storage
- **Checkout System** - Complete checkout flow with delivery options
- **Image Gallery** - Visual showcase of bakery creations
- **Contact Form** - Customer inquiry form with validation
- **About Page** - Company story and values
- **Responsive Design** - Fully mobile-optimized interface

### Admin Features
- **Admin Dashboard** - Secure admin panel with password protection
- **Product Management** - Full CRUD operations for products
- **Image Management** - Easy product image updates via URL
- **Real-time Preview** - See changes before saving
- **Database Persistence** - All changes saved to database

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **State Management**: React Context API
- **Form Handling**: React Hooks
- **Image Optimization**: Next.js Image component

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/clfarr/bakery-ecommerce.git
cd bakery-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
DATABASE_URL="file:./dev.db" npx prisma migrate dev
DATABASE_URL="file:./dev.db" npx tsx prisma/seed.ts
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Admin Access

- URL: `/admin`
- Password: `bakery123` (demo only - change in production)

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard and product management
│   ├── api/products/      # REST API endpoints
│   ├── products/          # Product catalog and detail pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   └── ...                # Other pages
├── components/            # Reusable React components
├── context/               # React Context (Cart, Admin)
├── lib/                   # Utilities and Prisma client
└── types/                 # TypeScript definitions

prisma/
├── schema.prisma          # Database schema
├── migrations/            # Database migrations
└── seed.ts               # Initial data seeding
```

## 🔧 Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Open Prisma Studio (database GUI)
DATABASE_URL="file:./dev.db" npx prisma studio
```

## 🗃️ Database

The project uses SQLite for easy local development. The database includes:

- **Products** table with full product information
- Automatic timestamps (createdAt, updatedAt)
- JSON fields for flavors and sizes arrays

### Database Commands

```bash
# View/edit database in browser
DATABASE_URL="file:./dev.db" npx prisma studio

# Create new migration
DATABASE_URL="file:./dev.db" npx prisma migrate dev --name migration_name

# Re-seed database
DATABASE_URL="file:./dev.db" npx tsx prisma/seed.ts
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variable: `DATABASE_URL` (use PostgreSQL for production)
4. Deploy

### Environment Variables

For production, update these:
- `DATABASE_URL` - Your production database URL
- `NEXT_PUBLIC_API_URL` - Your API base URL

## 🎨 Customization

### Products
Add/edit products via the admin dashboard or directly in the database using Prisma Studio.

### Styling
- Colors: Edit `tailwind.config.ts`
- Layout: Modify components in `/src/components`

### Images
- Update product images through the admin panel
- Supports Unsplash URLs or local images in `/public/images`

## 📝 API Endpoints

- `GET /api/products` - List all products
- `GET /api/products?category=cakes` - Filter by category
- `GET /api/products/[id]` - Get product by ID
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or your own bakery business!

## 👤 Author

**Caroline Farr**

---

⭐ Star this repo if you found it helpful!
