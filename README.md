# ShopYangu Shop Management System

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Data Models](#data-models)
6. [Installation & Setup](#installation--setup)
7. [Usage Guide](#usage-guide)

## Project Overview

ShopYangu is a modern shop management system built with Next.js 15, designed to help businesses manage their shops and products efficiently. It provides a clean, intuitive interface for shop owners to manage their inventory, track stock levels, and organize products across multiple shops.

## Features

### Shop Management

- Create, view, edit, and delete shops
- Upload and manage shop logos
- View shop-specific product listings
- Individual shop dashboards

### Product Management

- Add, edit, and delete products within shops
- Track product stock levels
- Set product prices and descriptions
- Upload product images
- Cross-shop product view

### Inventory Features

- Real-time stock level tracking
- Stock status indicators:
  - In Stock (>5 units)
  - Low Stock (1-5 units)
  - Out of Stock (0 units)
- Product filtering by stock status

### Search & Filtering

- Search products by name and description
- Filter products by shop
- Filter by stock status
- Sort products by name, price, or stock level

### User Interface

- Clean, modern design with Tailwind CSS
- Responsive layout for all devices
- Intuitive navigation
- Real-time updates

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
│   ├── components/             # Shared components
│   │   ├── Footer.tsx         # Footer component
│   │   └── Navbar.tsx         # Navigation bar component
│   ├── fonts/                  # Custom fonts
│   │   ├── GeistMonoVF.woff   # Geist Mono font
│   │   └── GeistVF.woff       # Geist font
│   ├── products/              # Product management
│   │   └── page.tsx          # Products listing page
│   ├── shops/                 # Shop management
│   │   ├── page.tsx          # Shops listing page
│   │   └── [id]/             # Dynamic shop routes
│   │       └── page.tsx      # Individual shop page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout component
│   └── page.tsx             # Dashboard/home page
├── services/                  # API and business logic
│   └── api.ts               # API service functions
└── types/                    # TypeScript definitions
    └── index.ts             # Type definitions
```

## Data Models

### Shop

```

```
