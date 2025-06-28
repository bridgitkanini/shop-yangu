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
src/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   └── shops/              # Shop-related endpoints
│   │       └── route.ts        # Shop API handlers
│   │   ├── components/             # Shared components
│   │   │   ├── Footer.tsx         # Footer component
│   │   │   └── Navbar.tsx         # Navigation bar component
│   │   ├── fonts/                  # Custom fonts
│   │   │   ├── GeistMonoVF.woff   # Geist Mono font
│   │   │   └── GeistVF.woff       # Geist font
│   │   ├── products/              # Product management
│   │   │   └── page.tsx          # Products listing page
│   │   ├── shops/                 # Shop management
│   │   │   ├── page.tsx          # Shops listing page
│   │   │   └── [id]/             # Dynamic shop routes
│   │   │   └── page.tsx      # Individual shop page
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout component
│   │   └── page.tsx             # Dashboard/home page
│   ├── services/                  # API and business logic
│   │   └── api.ts               # API service functions
│   └── types/                    # TypeScript definitions
│       └── index.ts             # Type definitions
```

## Data Models

### Shop

```typescript
interface Shop {
  id?: number; // Unique identifier
  name: string; // Shop name
  description: string; // Shop description
  logo: string | null; // Logo URL or blob
  products?: Product[]; // Associated products
}
```

### Product

```typescript
interface Product {
  id?: number; // Unique identifier
  name: string; // Product name
  price: number; // Product price
  stockLevel: number; // Current stock quantity
  description: string; // Product description
  image: string | null; // Image URL or blob
}
```

### Dashboard Metrics

```typescript
interface DashboardMetrics {
  totalShops: number; // Total number of shops
  totalProducts: number; // Total number of products
  totalValue: number; // Total inventory value
  totalStock: number; // Total stock units
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
  id: string | number; // Shop identifier
  name: string; // Shop name
  totalStock: number; // Total stock across all products
  productCount: number; // Number of products in shop
}
```

## API Services

### Shop Service

Located in `src/services/api.ts`, provides core shop management functionality:

```typescript
// Shop operations
getShops(): Promise<Shop[]>                           // Fetch all shops
getShop(id: string): Promise<Shop>                    // Fetch single shop
addShop(shop: Omit<Shop, 'id'>): Promise<Shop>       // Create new shop
updateShop(id: string, shop: Partial<Shop>): Promise<Shop>  // Update shop
deleteShop(id: string): Promise<void>                 // Delete shop
```

### Product Service

Handles all product-related operations:

```typescript
// Product operations
getProducts(shopId: string): Promise<Product[]>       // Get shop's products
getProduct(shopId: string, productId: string): Promise<Product | null>  // Get single product
addProduct(shopId: string, product: Omit<Product, 'id'>): Promise<Product>  // Add product
updateProduct(shopId: string, product: Product): Promise<Product>  // Update product
deleteProduct(shopId: string, productId: string): Promise<void>    // Delete product
getAllProducts(): Promise<Product[]>                  // Get all products across shops
```

### Dashboard Service

Provides analytics and metrics:

```typescript
// Analytics operations
getOverviewMetrics(): Promise<DashboardMetrics>       // Get overall metrics
getStockStatusDistribution(): Promise<StockStatusDistribution>  // Get stock levels
getTopShopsByStock(): Promise<ShopStockInfo[]>        // Get top shops by stock
```

## Error Handling

The application implements comprehensive error handling across different layers:

### API Layer

- Response validation for all API calls
- Specific error messages for different failure scenarios
- Proper error propagation to UI layer

### Shop Operations

- Validation before shop deletion (prevents deletion of shops with products)
- Error handling for failed CRUD operations
- Proper error messages for user feedback

### Product Operations

- Stock level validation
- Product relationship validation with shops
- Error handling for product CRUD operations

### UI Layer

- Loading states during async operations
- Error state display for failed operations
- User-friendly error messages
- Graceful degradation on failures

### Common Error Scenarios

1. **Shop Operations**

   - Cannot delete shop with active products
   - Failed to fetch shop data
   - Failed to update shop details

2. **Product Operations**

   - Failed to add/update products
   - Failed to fetch product data
   - Stock level validation errors

3. **API Errors**
   - Network connectivity issues
   - Invalid response formats
   - Server errors

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
