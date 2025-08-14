# Wanderfiz UI

React 18 + TypeScript 5.6 frontend application for the Wanderfiz trip planning platform.

## Architecture Overview

This repository contains the frontend application with:
- **React 18** with Concurrent Features
- **TypeScript 5.6** with latest language features  
- **Vite 6.0** for build tooling
- **Tailwind CSS 3.4** for styling
- **Testing frameworks** setup (no functional code yet)

## Project Structure

```
wanderfiz-ui/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utilities
│   └── types/         # TypeScript types
├── tests/             # Test files
├── cypress/           # E2E tests
└── playwright/        # E2E tests
```

## Development

```bash
npm install
npm run dev
```

## Testing

```bash
npm run test        # Unit tests
npm run test:e2e    # E2E tests
npm run type-check  # TypeScript validation
```

## Security

- **Private subnet deployment** - accessed via API Gateway
- **Environment-based configuration** - no hardcoded values
- **Configurable logging** paths for all environments

## Status

⚠️ **Phase 1 Complete**: Repository structure and test frameworks ready
⚠️ **No functional code** - awaiting Phase 2 implementation

## Architecture Notes

- **NO authentication logic** - handled by API Gateway
- **Environment-agnostic** - configured via environment variables
- **Logging paths configurable** - no hardcoded log destinations