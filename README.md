# ShopYangu Shop Management System

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Data Models](#data-models)
6. [API Services](#api-services)
7. [Error Handling](#error-handling)
8. [State Management](#state-management)
9. [User Interface](#user-interface)
10. [Component Architecture](#component-architecture)
11. [Development Practices](#development-practices)
12. [Installation & Setup](#installation--setup)
13. [Usage Guide](#usage-guide)

## Project Overview

ShopYangu is a modern shop management system built with Next.js 15, designed to help businesses manage their shops and products efficiently. It provides a clean, intuitive interface for shop owners to manage their inventory, track stock levels, and organize products across multiple shops.

Backend repo: [ShopYangu Backend](https://github.com/bridgitkanini/shop-yangu-backend)

## Features

### 1. Shop Management

- **Create Shop**: Modal form with name, description, and logo upload
- **Edit Shop**: Pre-populated form for updates
- **Delete Shop**: Confirmation dialog with cascade options
- **View Shop**: Detailed shop page with products

### 2. Product Management

- **Add Product**: Comprehensive form with shop selection
- **Edit Product**: Inline editing with validation
- **Delete Product**: Confirmation with impact warning
- **Stock Tracking**: Visual indicators for stock levels

### 3. Inventory Management

- **Stock Levels**: Color-coded status indicators
  - Green: In Stock (>5 units)
  - Orange: Low Stock (1-5 units)
  - Red: Out of Stock (0 units)
- **Value Calculation**: Automatic price × quantity calculations
- **Stock Monitoring**: Real-time stock level tracking

### 4. Search & Filtering

- **Text Search**: Name, description, and shop name
- **Shop Filter**: Products by specific shop
- **Stock Filter**: By availability status
- **Combined Filters**: Multiple filter application
- **Sort Options**: Sort by name, price, or stock level

## User Interface

### Design System

- **Color Scheme**:
  - Primary: `#041c4c` (dark blue)
  - Secondary: `#1d4268` (medium blue)
  - Accent: `#4ebcbe` (teal)
  - Background: White to `#1d4268` gradient
  - Cards: White with opacity for glass effect

### Components

1. **Navigation**

   - Responsive navigation bar
   - Quick access to main features
   - Breadcrumb navigation

2. **Cards**

   - Shop cards with logo display
   - Product cards with image preview
   - Glass-morphism effect with hover states

3. **Forms**

   - Modal-based forms for data entry
   - Real-time validation
   - Image upload preview
   - Responsive form layouts

4. **Status Indicators**
   - Color-coded stock levels
   - Loading states
   - Error messages
   - Success confirmations

### Responsive Design

- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Mobile Optimizations**:
  - Stack layouts on small screens
  - Touch-friendly buttons
  - Responsive typography
  - Adaptive spacing

## Component Architecture

### Page Components

1. **Dashboard (`/`)**

   - Welcome message
   - Quick access cards
   - Navigation to main features

2. **Shops Page (`/shops`)**

   - Shop listing
   - Add shop button
   - Shop cards with actions

3. **Shop Detail (`/shops/[id]`)**

   - Shop information
   - Product management
   - Stock monitoring

4. **Products Page (`/products`)**
   - Cross-shop product view
   - Advanced filtering
   - Bulk management options

### Shared Components

1. **Navigation**

   - `Navbar.tsx`: Main navigation
   - `Footer.tsx`: Site footer

2. **UI Elements**
   - Loading states
   - Error boundaries
   - Confirmation dialogs

### Component Features

- **State Management**: Local state with React hooks
- **Side Effects**: Controlled with useEffect
- **Error Handling**: Try-catch with user feedback
- **Loading States**: Skeleton loaders and spinners

## Development Practices

### Code Organization

- **Feature-based Structure**: Components grouped by feature
- **Shared Components**: Reusable UI elements
- **Type Definitions**: Centralized type system
- **API Services**: Centralized API calls

### Styling Approach

- **Tailwind CSS**: Utility-first styling
- **Custom Classes**: Extended Tailwind when needed
- **Responsive Design**: Mobile-first approach
- **Theme Variables**: Consistent color scheme

### Best Practices

- **TypeScript**: Strong typing throughout
- **Error Boundaries**: Graceful error handling
- **Loading States**: User feedback during operations
- **Accessibility**: ARIA labels and semantic HTML

## Technology Stack

- **Framework**: Next.js 15.0.3 with App Router
- **Language**: TypeScript
- **UI Library**: React 19.0.0-rc
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: React Icons 5.4.0
- **Development Server**: JSON Server (for mock API)
- **Package Manager**: pnpm 10.10.0

## Project Structure

```
shop-yangu/
├── .next/                    # Next.js build output
├── public/                   # Static files (images, fonts, etc.)
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── api/              # API routes
│   │   ├── components/       # Shared UI components
│   │   │   ├── Footer.tsx    # Footer component
│   │   │   └── Navbar.tsx    # Navigation bar component
│   │   ├── fonts/            # Custom font files
│   │   ├── products/         # Product-related pages
│   │   ├── shops/            # Shop-related pages
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── services/             # API service layer
│   │   └── api.ts            # API client and service functions
│   └── types/                # TypeScript type definitions
├── .eslintrc.json            # ESLint configuration
├── .gitignore                # Git ignore rules
├── db.json                   # Mock database for development
├── next-env.d.ts             # Next.js TypeScript declarations
├── next.config.ts            # Next.js configuration
├── package.json              # Project dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
└── tailwind.config.ts        # Tailwind CSS configuration
```

### Key Directories Explained:

- **`app/`**: Contains all the application pages and routes following Next.js 13+ App Router conventions.

  - `api/`: API route handlers for server-side functionality.
  - `components/`: Reusable UI components used across the application.
  - `fonts/`: Custom font files used in the application.
  - `products/` and `shops/`: Feature-based route groups containing page components.

- **`services/`**: Contains the API service layer that handles all data fetching and API communication.

  - `api.ts`: Centralized API client with methods for CRUD operations.

- **`types/`**: TypeScript type definitions for the application's data models and props.

- **Root Configuration Files**:
  - `next.config.ts`: Next.js configuration including environment variables and build settings.
  - `tailwind.config.ts`: Tailwind CSS configuration with custom theme settings.
  - `postcss.config.mjs`: PostCSS configuration for processing CSS.
  - `tsconfig.json`: TypeScript configuration.

This structure follows Next.js 13+ best practices with the App Router, separating concerns between UI components, data fetching, and business logic.

## Data Models

### Shop

```typescript
interface Shop {
  id?: string; // Unique identifier (generated as string)
  name: string; // Shop name
  description: string; // Shop description
  logo: string | null; // Logo URL or null if not set
  products?: Product[]; // Array of associated products
}
```

### Product

```typescript
interface Product {
  id?: number; // Unique identifier (generated as timestamp)
  name: string; // Product name
  price: number; // Product price
  stockLevel: number; // Current stock quantity
  description: string; // Product description
  image: string | null; // Image URL or null if not set
}
```

### Dashboard Metrics

```typescript
interface DashboardMetrics {
  totalShops: number; // Total number of shops
  totalProducts: number; // Total number of products
  totalValue: number; // Total inventory value
  totalStock: number; // Total stock units across all products
}
```

### Stock Status Distribution

```typescript
interface StockStatusDistribution {
  inStock: number; // Products with stock > 5
  lowStock: number; // Products with stock 1-5
  outOfStock: number; // Products with stock = 0
}
```

### Shop Stock Info

```typescript
interface ShopStockInfo {
  id: string; // Shop identifier
  name: string; // Shop name
  totalStock: number; // Total stock across all products in shop
  productCount: number; // Number of products in shop
}
```

## API Services

The application uses a service-based architecture with the following key services:

### Shop Service

Located in `src/services/api.ts`, provides core shop management functionality:

```typescript
// Shop operations
getShops(): Promise<Shop[]>                           // Fetch all shops
getShop(id: string): Promise<Shop>                    // Fetch single shop
addShop(shop: Omit<Shop, 'id'>): Promise<Shop>        // Create new shop
updateShop(id: string, shop: Partial<Shop>): Promise<Shop>  // Update shop
deleteShop(id: string): Promise<void>                 // Delete shop (fails if shop has products)
```

### Product Service

Handles all product-related operations within shops:

```typescript
// Product operations
getProducts(shopId: string): Promise<Product[]>       // Get all products in a shop
getProduct(shopId: string, productId: string): Promise<Product | null>  // Get single product
addProduct(shopId: string, product: Omit<Product, 'id'>): Promise<Product>  // Add product to shop
updateProduct(shopId: string, product: Product): Promise<Product>  // Update product
deleteProduct(shopId: string, productId: string): Promise<void>    // Delete product from shop
getAllProducts(): Promise<Product[]>                  // Get all products across all shops
```

### Dashboard Service

Provides analytics and metrics for the application:

```typescript
// Analytics operations
getOverviewMetrics(): Promise<DashboardMetrics>       // Get overall metrics
getStockStatusDistribution(): Promise<StockStatusDistribution>  // Get stock level distribution
getTopShopsByStock(): Promise<ShopStockInfo[]>       // Get shops sorted by total stock
```

## Error Handling

The application implements comprehensive error handling across different layers:

### API Layer

- Response validation for all API calls
- Specific error messages for different failure scenarios
- Proper error propagation to UI layer
- Network error handling with user-friendly messages

### Shop Operations

- Validation before shop deletion (prevents deletion of shops with products)
- Error handling for failed CRUD operations
- Proper error messages for user feedback
- Duplicate shop name prevention

### Product Operations

- Stock level validation (non-negative numbers)
- Product relationship validation with shops
- Error handling for product CRUD operations
- Input validation for product details

### UI Layer

- Loading states during async operations
- Error state display for failed operations
- User-friendly error messages
- Graceful degradation on failures
- Form validation feedback

### Common Error Scenarios

1. **Shop Operations**

   - Cannot delete shop with active products
   - Failed to fetch shop data (network/server issues)
   - Failed to update shop details (validation/network errors)
   - Duplicate shop names

2. **Product Operations**

   - Invalid product data (missing fields, invalid types)
   - Stock level validation failures
   - Product not found in shop
   - Failed image uploads

3. **Network/Server Issues**

   - Server unavailable
   - Timeout handling
   - Offline mode detection

4. **Authentication/Authorization**
   - Unauthorized access attempts
   - Session timeouts
   - Permission validation

## State Management

The application uses React's built-in state management solutions:

### Local State

- `useState` for component-level state
- `useEffect` for side effects and data fetching
- Loading states for async operations
- Error states for failed operations

### Data Flow

1. User action triggers state change
2. State change initiates API call
3. API response updates local state
4. UI updates to reflect new state

## Installation & Setup

### Prerequisites

- Node.js (Latest LTS version)
- pnpm 10.10.0 or later

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/shop-yangu.git
   cd shop-yangu
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Start the JSON server (in a separate terminal):

   ```bash
   pnpm json-server
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Guide

### Managing Shops

1. **Create a Shop**

   - Click "Add Shop" on the shops page
   - Fill in the shop name and description
   - Upload a shop logo (optional)
   - Click "Save" to create the shop

2. **View Shop Details**

   - Click on any shop card to view its details
   - See all products associated with the shop
   - Monitor stock levels and product information

3. **Edit/Delete Shop**
   - Use the edit button to modify shop details
   - Use the delete button to remove a shop (requires empty product list)

### Managing Products

1. **Add Products**

   - Navigate to a shop's detail page
   - Click "Add Product"
   - Fill in product details (name, price, stock level, description)
   - Upload a product image (optional)
   - Click "Save" to add the product

2. **Edit Products**

   - Click the edit button on any product card
   - Modify product details as needed
   - Save changes

3. **Monitor Stock**
   - Use the stock filters to view products by stock status
   - Monitor low stock items
   - Update stock levels as needed

### Search and Filtering

1. **Product Search**

   - Use the search bar to find products by name or description
   - Filter products by shop or stock status
   - Sort products by various criteria

2. **Stock Management**
   - Use stock filters to identify low or out-of-stock items
   - Monitor stock levels across all shops
   - Take action on low stock items

## Contributing

### Development Workflow

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request
5. Code review process

### Code Review Checklist

- [ ] TypeScript types properly defined
- [ ] Error handling implemented
- [ ] Responsive design tested
- [ ] Accessibility considerations
- [ ] Performance optimizations
- [ ] Documentation updated

### Technical Improvements

1. **Performance**:

   - Implement pagination for large datasets
   - Add virtual scrolling for long lists
   - Optimize image loading with lazy loading

2. **Testing**:

   - Unit tests with Jest
   - Integration tests with React Testing Library
   - E2E tests with Playwright

3. **Accessibility**:

   - WCAG 2.1 compliance
   - Screen reader optimization
   - Keyboard navigation improvements

4. **Security**:
   - Input sanitization
   - File upload security
   - CSRF protection

### Architecture Enhancements

- Implement proper state management (Redux, Zustand)
- Add caching layer (React Query, SWR)
- Microservices architecture
- Progressive Web App (PWA) features

---

**Last Updated**: June 2025
