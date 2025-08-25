# Limitless Energy CO - Commercial Energy Solutions Platform

## Overview

This is a full-stack web application for Limitless Energy CO, a commercial energy solutions company. The platform serves as both a marketing website and content management system, showcasing the company's services including commercial solar installations, battery storage, energy procurement, and consulting services. The application features a modern React frontend with a Node.js/Express backend, built with TypeScript and utilizing a PostgreSQL database for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent UI components
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **UI Components**: Radix UI primitives wrapped with custom styling via shadcn/ui

The frontend follows a component-based architecture with clear separation between pages, reusable components, and UI primitives. The application uses a modern CSS-in-JS approach through Tailwind's utility classes and CSS custom properties for theming.

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM with PostgreSQL (Neon serverless)
- **API Design**: RESTful API endpoints following REST conventions
- **Validation**: Zod schemas shared between frontend and backend for type safety
- **Development**: Hot module replacement via Vite integration for seamless development experience

The backend implements a layered architecture with clear separation between routes, business logic (storage layer), and database access. The storage pattern abstracts database operations behind interfaces for better testability and maintainability.

### Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon serverless platform
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle migrations for version-controlled database changes
- **Data Modeling**: Relational schema with tables for solutions, projects, team members, partner types, contact submissions, and FAQs

The database schema uses UUIDs for primary keys and includes proper indexing on slug fields for SEO-friendly URLs. All content tables include created/updated timestamps and active status flags for content management.

### Authentication and Authorization
Currently, the application appears to be primarily a public-facing marketing site without authentication mechanisms implemented. The contact form submissions are stored but don't require user authentication.

### Build and Deployment
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Development**: Concurrent development server setup with hot reloading
- **Production**: Static asset serving with Express fallback for SPA routing
- **Environment**: Environment variables for database configuration and feature flags

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless database connectivity
- **drizzle-orm**: TypeScript ORM for database operations
- **drizzle-kit**: Database migration and introspection tools
- **@tanstack/react-query**: Server state management and caching

### UI and Styling Dependencies
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for component styling
- **clsx**: Conditional className utility

### Form and Validation Dependencies
- **react-hook-form**: Performant forms with minimal re-renders
- **@hookform/resolvers**: Integration between React Hook Form and validation libraries
- **zod**: TypeScript-first schema validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

### Development and Build Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution environment for Node.js
- **@replit/vite-plugin-runtime-error-modal**: Replit-specific development tooling
- **wouter**: Minimalist routing library for React applications

### Additional Utilities
- **date-fns**: Modern JavaScript date utility library
- **nanoid**: Compact URL-safe unique ID generator
- **connect-pg-simple**: PostgreSQL session store for Express sessions