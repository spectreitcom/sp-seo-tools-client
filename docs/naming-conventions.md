# Naming Conventions

This document outlines the consistent naming conventions to be used throughout the SEO Tool codebase.

## File Naming

All files should use kebab-case (lowercase with hyphens) for their names:

```
// Good
user-profile.tsx
auth-service.ts
error-boundary.tsx

// Bad
UserProfile.tsx
authService.ts
errorBoundary.tsx
```

## Feature-Specific Prefixes

To maintain consistency across the codebase, we will adopt the following approach for feature-specific prefixes:

1. **No prefixes in filenames** - Files should be named descriptively without feature-specific prefixes:

```
// Good
keyword-details.tsx
subscription-plans.tsx
testing-mode-banner.tsx

// Bad
rt-keyword-details.tsx
sa-subscription-plans.tsx
```

2. **Use namespacing through directory structure** - The feature directory structure already provides namespacing:

```
src/features/rank-tracker/components/keyword-details.tsx
src/features/serp-analyzer/components/subscription-plans.tsx
```

## Component Naming

React components should use PascalCase for their names:

```typescript
// Good
function KeywordDetails() { ... }
const SubscriptionPlans = () => { ... }

// Bad
function keywordDetails() { ... }
const subscriptionPlans = () => { ... }
```

## Hook Naming

Hooks should follow the React convention of using the "use" prefix with camelCase:

```typescript
// Good
function useKeywords() { ... }
function useAnalysisFilters() { ... }

// Bad
function UseKeywords() { ... }
function use_analysis_filters() { ... }
```

## Function and Variable Naming

1. **Functions** should use camelCase:

```typescript
// Good
function getErrorMessage() { ... }
const fetchUserData = () => { ... }

// Bad
function GetErrorMessage() { ... }
const fetch_user_data = () => { ... }
```

2. **Variables** should use camelCase:

```typescript
// Good
const userData = { ... }
let isLoading = true;

// Bad
const UserData = { ... }
let is_loading = true;
```

## Type and Interface Naming

Types and interfaces should use PascalCase:

```typescript
// Good
type UserData = { ... }
interface AuthResponse { ... }

// Bad
type userData = { ... }
interface authResponse { ... }
```

## Constants

Constants should use UPPER_SNAKE_CASE:

```typescript
// Good
const API_URL = "https://api.example.com";
const MAX_RETRY_COUNT = 3;

// Bad
const apiUrl = "https://api.example.com";
const maxRetryCount = 3;
```

## Implementation Plan

To implement these naming conventions consistently across the codebase, we will:

1. Update file names to remove feature-specific prefixes
2. Update component names to use PascalCase
3. Update hook names to follow the React convention
4. Update function and variable names to use camelCase
5. Update type and interface names to use PascalCase
6. Update constants to use UPPER_SNAKE_CASE
7. Update import/export statements to reflect the new naming conventions