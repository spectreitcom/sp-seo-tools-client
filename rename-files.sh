#!/bin/bash

# Rename rank-tracker files
echo "Renaming rank-tracker files..."

# Pages
mv src/features/rank-tracker/pages/rt-domains-page.tsx src/features/rank-tracker/pages/domains-page.tsx
mv src/features/rank-tracker/pages/rt-home-page.tsx src/features/rank-tracker/pages/home-page.tsx
mv src/features/rank-tracker/pages/rt-keyword-details-page.tsx src/features/rank-tracker/pages/keyword-details-page.tsx
mv src/features/rank-tracker/pages/rt-success-page.tsx src/features/rank-tracker/pages/success-page.tsx
mv src/features/rank-tracker/pages/rt-keywords-page.tsx src/features/rank-tracker/pages/keywords-page.tsx

# Components
mv src/features/rank-tracker/components/rt-keyword-details.tsx src/features/rank-tracker/components/keyword-details.tsx
mv src/features/rank-tracker/components/rt-quick-menu.tsx src/features/rank-tracker/components/quick-menu.tsx
mv src/features/rank-tracker/components/rt-subscription-plans.tsx src/features/rank-tracker/components/subscription-plans.tsx
mv src/features/rank-tracker/components/rt-testing-mode-banner.tsx src/features/rank-tracker/components/testing-mode-banner.tsx

# Hooks
mv src/features/rank-tracker/hooks/use-rank-tracker-stripe.ts src/features/rank-tracker/hooks/use-stripe.ts
mv src/features/rank-tracker/hooks/use-rank-tracker-subscription-plans.ts src/features/rank-tracker/hooks/use-subscription-plans.ts
mv src/features/rank-tracker/hooks/use-rt-devices.ts src/features/rank-tracker/hooks/use-devices.ts
mv src/features/rank-tracker/hooks/use-rt-localizations.ts src/features/rank-tracker/hooks/use-localizations.ts
mv src/features/rank-tracker/hooks/use-rt-testing-mode.ts src/features/rank-tracker/hooks/use-testing-mode.ts

# Rename serp-analyzer files
echo "Renaming serp-analyzer files..."

# Pages
mv src/features/serp-analyzer/pages/sa-analysis-details-page.tsx src/features/serp-analyzer/pages/analysis-details-page.tsx
mv src/features/serp-analyzer/pages/sa-analysis-page.tsx src/features/serp-analyzer/pages/analysis-page.tsx
mv src/features/serp-analyzer/pages/sa-home-page.tsx src/features/serp-analyzer/pages/home-page.tsx
mv src/features/serp-analyzer/pages/sa-success-page.tsx src/features/serp-analyzer/pages/success-page.tsx

# Components
mv src/features/serp-analyzer/components/sa-subscription-plans.tsx src/features/serp-analyzer/components/subscription-plans.tsx
mv src/features/serp-analyzer/components/sa-testing-mode-banner.tsx src/features/serp-analyzer/components/testing-mode-banner.tsx
mv src/features/serp-analyzer/components/sa-quick-menu.tsx src/features/serp-analyzer/components/quick-menu.tsx

# Hooks
mv src/features/serp-analyzer/hooks/use-sa-devices.ts src/features/serp-analyzer/hooks/use-devices.ts
mv src/features/serp-analyzer/hooks/use-sa-localizations.ts src/features/serp-analyzer/hooks/use-localizations.ts
mv src/features/serp-analyzer/hooks/use-sa-stripe.ts src/features/serp-analyzer/hooks/use-stripe.ts
mv src/features/serp-analyzer/hooks/use-sa-subscriptions.ts src/features/serp-analyzer/hooks/use-subscriptions.ts
mv src/features/serp-analyzer/hooks/use-sa-testing-mode.ts src/features/serp-analyzer/hooks/use-testing-mode.ts

echo "File renaming complete!"