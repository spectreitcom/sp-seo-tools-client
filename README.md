# SP SEO Tool Client

## Project Overview
SP SEO Tool Client is a React-based web application for SEO analysis and tracking. The application provides features for tracking search engine rankings and analyzing search engine results pages (SERPs).

Related repository: https://github.com/spectreitcom/sp-seo-tools-server

## Project Structure
- `/src`: Main source code directory
  - `/assets`: Static assets like images and icons
  - `/features`: Feature-based modules
    - `/auth`: Authentication functionality
    - `/dashboard`: Main dashboard view
    - `/rank-tracker`: SEO ranking tracking functionality
    - `/serp-analyzer`: Search engine results page analysis
    - `/shared`: Shared components and utilities
  - `/store`: State management (using Zustand)
  - `axios.ts`: HTTP client configuration
  - `main.tsx`: Application entry point
  - `router.tsx`: Routing configuration
- `/public`: Public static files
- `/dist`: Build output directory

## Technology Stack
- React 19
- TypeScript
- Vite for building and development
- React Router for navigation
- TanStack React Query for data fetching
- Zustand for state management
- Tailwind CSS for styling
- Axios for HTTP requests
- Zod for validation

## Development Workflow

### Setup
1. Install dependencies:
   ```
   yarn install
   ```

### Development
1. Start the development server:
   ```
   yarn dev
   ```
2. The application will be available at http://localhost:5173 (or another port if 5173 is in use)

### Building
1. Build the application:
   ```
   yarn build
   ```
2. The build output will be in the `/dist` directory

### Linting
1. Run ESLint:
   ```
   yarn lint
   ```

### Preview
1. Preview the built application:
   ```
   yarn preview
   ```

## Code Style Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Organize code by features
- Use React Query for data fetching
- Use Zustand for state management
- Follow the existing component structure
- Use Tailwind CSS for styling