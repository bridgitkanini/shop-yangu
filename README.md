# ShopYangu Shop Management System - Comprehensive Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Project Structure](#project-structure)
4. [Data Models](#data-models)
5. [Pages & Components](#pages--components)
6. [API Services](#api-services)
7. [Features](#features)
8. [Installation & Setup](#installation--setup)
9. [Usage Guide](#usage-guide)
10. [Development Guidelines](#development-guidelines)
11. [Troubleshooting](#troubleshooting)
12. [Future Enhancements](#future-enhancements)

## Project Overview

The Shop Management System is a modern Next.js 14 application built for managing multiple shops and their products. It provides a comprehensive dashboard for shop owners and administrators to track inventory, manage products across multiple stores, and monitor business metrics.

### Key Features
- **Multi-shop Management**: Create, edit, and delete shops
- **Product Management**: Full CRUD operations for products across all shops
- **Inventory Tracking**: Real-time stock level monitoring with alerts
- **Analytics Dashboard**: Business metrics and insights
- **Responsive Design**: Mobile-first approach with modern UI
- **File Upload**: Support for shop logos and product images

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons (Font Awesome)
- **State Management**: React Hooks (useState, useEffect)
- **Data Storage**: JSON-based mock API (development)

## Architecture

### Application Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Presentation  │    │   Business      │    │   Data          │
│   Layer         │    │   Logic Layer   │    │   Layer         │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ - Pages         │◄──►│ - Services      │◄──►│ - API           │
│ - Components    │    │ - Utils         │    │ - JSON Store    │
│ - UI Elements   │    │ - Types         │    │ - File System   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow
1. **User Interaction** → Component State Update
2. **State Change** → API Service Call
3. **API Service** → Data Layer Operation
4. **Data Response** → Component Re-render
5. **UI Update** → User Feedback

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Dashboard page
│   ├── shops/                   # Shop management
│   │   ├── page.tsx            # Shop list page
│   │   └── [id]/               # Dynamic shop routes
│   │       └── page.tsx        # Individual shop page
│   └── products/               # Product management
│       └── page.tsx            # All products page
├── components/                  # Reusable components
│   ├── ui/                     # Basic UI components
│   │   ├── Modal.tsx          # Modal component
│   │   ├── Card.tsx           # Card component
│   │   └── Button.tsx         # Button component
│   ├── ShopCard.tsx           # Shop display card
│   ├── ProductCard.tsx        # Product display card
│   └── Dashboard/             # Dashboard components
│       ├── MetricsCards.tsx   # Metrics display
│       └── Charts.tsx         # Chart components
├── services/                   # API and business logic
│   └── api.ts                 # API service functions
├── types/                     # TypeScript definitions
│   └── index.ts              # Type definitions
└── utils/                     # Utility functions
    └── helpers.ts            # Helper functions
```

## Data Models

### Shop Interface
```typescript
export interface Shop {
  id?: number;                    // Unique identifier
  name: string;                   // Shop name
  description: string;            // Shop description
  logo: string | null;            // Logo URL or blob
  products?: Product[];           // Associated products
}
```

### Product Interface
```typescript
export interface Product {
  id?: number;                    // Unique identifier
  name: string;                   // Product name
  price: number;                  // Product price in KSh
  stockLevel: number;             // Current stock quantity
  description: string;            // Product description
  image: string | null;           // Image URL or blob
}
```

### Dashboard Metrics Interface
```typescript
export interface DashboardMetrics {
  totalShops: number;             // Total number of shops
  totalProducts: number;          // Total number of products
  totalValue: number;             // Total inventory value
  totalStock: number;             // Total stock units
}
```

### Stock Status Distribution
```typescript
export interface StockStatusDistribution {
  inStock: number;                // Products with stock > 5
  lowStock: number;               // Products with stock 1-5
  outOfStock: number;             // Products with stock = 0
}
```

## Pages & Components

### Dashboard Page (`/`)
**Purpose**: Main landing page with business overview and metrics

**Features**:
- Key performance indicators (KPIs)
- Quick navigation to shops and products
- Visual charts and analytics
- Recent activity feed

**Components Used**:
- `MetricsCards.tsx` - Display KPI cards
- `Charts.tsx` - Render data visualizations

### Shops Page (`/shops`)
**Purpose**: Shop management interface

**Features**:
- List all shops with details
- Add new shops with logo upload
- Edit existing shop information
- Delete shops with confirmation
- Navigate to individual shop pages

**Key Functions**:
```typescript
fetchShops()        // Load all shops
handleSubmit()      // Add/edit shop
handleDelete()      // Remove shop
```

### Individual Shop Page (`/shops/[id]`)
**Purpose**: Detailed view of a specific shop and its products

**Features**:
- Shop information display
- Product management within shop
- Add products to shop
- Edit shop products
- Stock level monitoring

### Products Page (`/products`)
**Purpose**: Comprehensive product management across all shops

**Features**:
- View all products from all shops
- Advanced filtering and search
- Stock status indicators
- Bulk operations support
- Cross-shop product management

**Filtering Options**:
- Search by name/description
- Filter by shop
- Filter by stock status
- Clear all filters

**Key Functions**:
```typescript
fetchData()         // Load products from all shops
handleSubmit()      // Add/edit product
handleEdit()        // Prepare edit form
handleDelete()      // Remove product
getStockStatus()    // Determine stock status
```

## API Services

### Shop Service (`shopService`)
Located in `src/services/api.ts`

#### Methods:
```typescript
// Shop operations
getShops(): Promise<Shop[]>
addShop(shop: Shop): Promise<Shop>
updateShop(id: string, shop: Shop): Promise<Shop>
deleteShop(id: string): Promise<void>

// Product operations
getProducts(): Promise<Product[]>
addProduct(shopId: string, product: Product): Promise<Product>
updateProduct(shopId: string, product: Product): Promise<Product>
deleteProduct(shopId: string, productId: string): Promise<void>

// Analytics
getDashboardMetrics(): Promise<DashboardMetrics>
getStockDistribution(): Promise<StockStatusDistribution>
```

#### Error Handling:
- Try-catch blocks for all async operations
- User-friendly error messages
- Graceful degradation on failures
- Loading states during operations

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
- **Alerts**: Low stock and out-of-stock notifications

### 4. Search & Filtering
- **Text Search**: Name, description, and shop name
- **Shop Filter**: Products by specific shop
- **Stock Filter**: By availability status
- **Combined Filters**: Multiple filter application

### 5. File Upload
- **Image Support**: JPEG, PNG, GIF formats
- **Preview**: Immediate image preview
- **Validation**: File type and size checks
- **Storage**: Blob URL generation for development

### 6. Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Touch Friendly**: Large tap targets
- **Accessible**: Proper ARIA labels and keyboard navigation

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- pnpm (preferred) / npm / yarn / bun
- Modern web browser

### Installation Steps
1. **Clone Repository**
   ```bash
   git clone https://github.com/bridgitkanini/shop-yangu.git
   cd shop-yangu
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   # or
   yarn install
   ```

3. **Set Up Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start Development Server**
   ```bash
   pnpm dev
   # or
   yarn dev
   ```

5. **Access Application**
   Open http://localhost:3000 in your browser

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_UPLOAD_PATH=/uploads
```

### Build for Production
```bash
pnpm build
pnpm start
```

## Usage Guide

### Getting Started
1. **Access Dashboard**: Navigate to the home page for overview
2. **Create Shop**: Go to /shops and click "Add Shop"
3. **Add Products**: Navigate to /products and click "Add Product"
4. **Monitor Inventory**: Use filters to track stock levels

### Shop Management Workflow
1. **Create Shop**:
   - Click "Add Shop" button
   - Fill in shop details (name, description)
   - Upload shop logo (optional)
   - Submit form

2. **Edit Shop**:
   - Click "Edit" on shop card
   - Modify details in modal
   - Save changes

3. **Delete Shop**:
   - Click "Delete" on shop card
   - Confirm deletion in dialog
   - Shop and products are removed

### Product Management Workflow
1. **Add Product**:
   - Go to Products page
   - Click "Add Product"
   - Select shop from dropdown
   - Fill product details
   - Upload product image
   - Submit form

2. **Edit Product**:
   - Click "Edit" on product card
   - Modify details
   - Update stock levels
   - Save changes

3. **Monitor Stock**:
   - Use stock filter to find low stock items
   - Check color-coded indicators
   - Update stock levels as needed

### Search & Filtering
1. **Text Search**:
   - Type in search box
   - Results filter automatically
   - Search across names and descriptions

2. **Apply Filters**:
   - Select shop from dropdown
   - Choose stock status
   - Combine multiple filters

3. **Clear Filters**:
   - Click "Clear Filters" button
   - Reset to show all items

## Development Guidelines

### Code Style
- **TypeScript**: Strict typing enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Naming**: camelCase for variables, PascalCase for components

### Component Structure
```typescript
// Component template
import { useState, useEffect } from "react";

interface ComponentProps {
  // Define props
}

export default function Component({ prop }: ComponentProps) {
  // State management
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // Side effects
  }, []);

  // Event handlers
  const handleEvent = () => {
    // Event logic
  };

  // Render
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

### State Management
- Use `useState` for component state
- Use `useEffect` for side effects
- Implement proper cleanup in effects
- Handle loading and error states

### API Integration
- Centralize API calls in service files
- Implement proper error handling
- Use async/await for cleaner code
- Add loading states for better UX

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Maintain consistent color scheme:
  - Primary: `#041c4c` (dark blue)
  - Secondary: `#1d4268` (medium blue)
  - Accent: `#4ebcbe` (teal)
- Use semantic color classes for status indicators

## Troubleshooting

### Common Issues

#### 1. Images Not Loading
**Problem**: Product or shop images not displaying
**Solution**:
- Check file upload implementation
- Verify blob URL generation
- Ensure proper file type validation

#### 2. API Errors
**Problem**: Failed to fetch data
**Solution**:
- Check network connectivity
- Verify API endpoint URLs
- Review error handling in services

#### 3. Form Validation Errors
**Problem**: Form submission fails
**Solution**:
- Check required field validation
- Verify data type conversions
- Review form state management

#### 4. Responsive Layout Issues
**Problem**: Layout breaks on mobile
**Solution**:
- Review Tailwind breakpoint usage
- Test on multiple screen sizes
- Adjust grid layouts for mobile

### Debug Mode
Enable debug logging:
```typescript
// Add to component
const DEBUG = process.env.NODE_ENV === 'development';

if (DEBUG) {
  console.log('Debug info:', data);
}
```

### Performance Issues
- Check for unnecessary re-renders
- Optimize large lists with pagination
- Implement proper memoization
- Review bundle size and optimize imports

## Future Enhancements

### Planned Features
1. **User Authentication**: Role-based access control
2. **Real Database**: PostgreSQL or MongoDB integration
3. **Image Storage**: Cloud storage (AWS S3, Cloudinary)
4. **Advanced Analytics**: Charts and reporting
5. **Notifications**: Real-time stock alerts
6. **Export Features**: CSV/PDF reports
7. **Multi-language**: Internationalization support
8. **Dark Mode**: Theme switching

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

---

**Last Updated**: May 2025  
**Version**: 1.0.0  
**Maintainer**: Development Team
