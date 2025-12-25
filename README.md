# Nexora - E-commerce Platform

A modern, full-featured e-commerce application built with Next.js 16, featuring dynamic product browsing, shopping cart functionality, user authentication, and online payment integration.

![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8)

## Features

### User Features
- **Product Browsing**: Explore products by categories and brands
- **Search & Filter**: Find products quickly with advanced search
- **Shopping Cart**: Add, remove, and manage cart items
- **Wishlist**: Save favorite products for later
- **User Authentication**: Secure login/registration with NextAuth
- **Order Management**: View order history and track purchases
- **Address Management**: Save and manage multiple shipping addresses
- **Online Payment**: Secure checkout with integrated payment gateway

### Technical Features
- **Server-Side Rendering**: Fast page loads with SSR
- **Dynamic Routes**: SEO-friendly product and category pages
- **Optimistic UI Updates**: Instant feedback on user actions
- **Image Optimization**: Automatic image optimization with Next.js Image
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Notifications**: Toast notifications for user feedback
- **Type Safety**: Full TypeScript support

## Tech Stack

- **Framework**: Next.js 16.1.0 (App Router)
- **UI Library**: React 19.2.3
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Authentication**: NextAuth.js v4
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod
- **UI Components**: Radix UI
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nexora
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL=http://localhost:3000
   API_URL=https://ecommerce.routemisr.com/api/v1/
   ```

   To generate a secure `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nexora/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── (Pages)/           # Grouped routes
│   │   │   ├── (User)/        # User-specific pages
│   │   │   ├── brands/        # Brand pages
│   │   │   ├── categories/    # Category pages
│   │   │   ├── products/      # Product pages
│   │   │   └── checkout/      # Checkout flow
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── APIs/                  # API integration functions
│   │   ├── Cart/             # Cart operations
│   │   ├── Wishlist/         # Wishlist operations
│   │   ├── Address/          # Address management
│   │   ├── Payment/          # Payment integration
│   │   └── ...
│   ├── Components/            # React components
│   │   ├── ui/               # UI primitives
│   │   ├── Navbar/           # Navigation
│   │   ├── Footer/           # Footer
│   │   └── ...
│   ├── interfaces/            # TypeScript interfaces
│   ├── Schemas/              # Zod validation schemas
│   ├── lib/                  # Utility functions
│   ├── Providers/            # Context providers
│   └── middleware.ts         # Next.js middleware
├── public/                   # Static assets
├── .env.local               # Environment variables
└── package.json
```

## Key Features Implementation

### Authentication
- NextAuth v4 with credentials provider
- Protected routes using middleware
- Session management with JWT
- Secure token storage in HTTP-only cookies

### State Management
- TanStack Query for server state
- Optimistic updates for better UX
- Automatic cache invalidation
- Background data refetching

### Forms & Validation
- React Hook Form for form management
- Zod schemas for validation
- Type-safe form inputs
- Real-time validation feedback

### Payment Integration
- Dynamic redirect URL handling
- Secure checkout session
- Order confirmation
- Payment status tracking

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_SECRET` | Secret for NextAuth encryption | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `API_URL` | Backend API endpoint | Yes |

## Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import project in Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your repository

3. **Configure environment variables**
   - Add all variables from `.env.local`
   - Set `NEXTAUTH_URL` to your production URL

4. **Deploy**
   - Vercel will automatically build and deploy

### Production Environment Variables

```env
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL=https://your-domain.vercel.app
API_URL=https://ecommerce.routemisr.com/api/v1/
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Static page generation where possible
- Dynamic imports for code splitting
- Image optimization with Next.js Image
- Font optimization with next/font
- Middleware for route protection
- React Query caching strategies

## Security Features

- CSRF protection
- XSS prevention
- Secure authentication flow
- HTTP-only cookies
- Environment variable protection
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [TanStack Query](https://tanstack.com/query)

## Support

For support, email your-email@example.com or open an issue in the repository.

---

**Live Demo**: [https://nexora-blond.vercel.app](https://nexora-blond.vercel.app)

Made with ❤️ using Next.js
