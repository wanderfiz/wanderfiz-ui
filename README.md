# Wanderfiz UI

React 18 + TypeScript 5.6 frontend application for the Wanderfiz trip planning platform.

## Technology Stack

- **React 18** with Concurrent Features
- **TypeScript 5.6** with latest language features  
- **Vite 6.0** for build tooling and development server
- **Tailwind CSS 3.4** for styling framework
- **Jest + React Testing Library** for unit testing
- **Cypress + Playwright** for E2E testing

## Project Structure

```
wanderfiz-ui/
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/              # Page-level components
│   ├── services/           # API communication layer
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions and helpers
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles and themes
├── .github/workflows/       # CI/CD pipelines
├── scripts/                # Deployment and utility scripts
├── tests/                  # Unit and integration tests
├── cypress/                # End-to-end test specs
├── playwright/             # Browser automation tests
├── Dockerfile              # Development container
├── Dockerfile.prod         # Production container
└── nginx.conf              # Production web server configuration
```

## Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:e2e     # Run E2E tests
```

## Development with Docker

```bash
# Run development environment
docker build -f Dockerfile -t wanderfiz-ui:dev .
docker run -p 3000:3000 wanderfiz-ui:dev

# Or use docker-compose (from project root)
docker-compose up wanderfiz-ui
```

## Production Deployment

```bash
# Build production container
docker build -f Dockerfile.prod -t wanderfiz-ui:prod .
docker run -p 80:80 wanderfiz-ui:prod
```

## Environment Configuration

The application uses environment variables for configuration:

```bash
# Frontend API configuration
VITE_API_BASE_URL=https://api.wanderfiz.com
VITE_LOG_LEVEL=info

# Development overrides
VITE_API_BASE_URL=http://localhost:8443
VITE_LOG_LEVEL=debug
```

## Architecture & Security

### Network Architecture
- **Production**: Deployed behind Cloudflare CDN with API Gateway backend
- **Development**: Direct connection to local API Gateway
- **Security**: No authentication logic in frontend - handled by API Gateway

### Key Principles
- **Environment-agnostic**: All configuration via environment variables
- **Configurable logging**: Log levels and destinations configurable
- **Security-first**: All API requests routed through authenticated gateway
- **Performance-optimized**: Code splitting, lazy loading, and caching

## Testing Strategy

### Unit Testing
- **Framework**: Jest + React Testing Library
- **Coverage**: Target 80%+ test coverage
- **Focus**: Component behavior, hooks, utilities

### E2E Testing
- **Cypress**: User journey testing
- **Playwright**: Cross-browser testing
- **Scope**: Critical user flows and integrations

### Performance Testing
- **Lighthouse**: Core Web Vitals monitoring
- **Bundle Analysis**: Size optimization tracking

## CI/CD Pipeline

The repository includes comprehensive CI/CD workflows:

- **Continuous Integration**: Automated testing, linting, type checking
- **Security Scanning**: Dependency vulnerabilities, code analysis
- **Container Building**: Multi-stage Docker builds
- **Deployment**: Automated deployment to development environment

## Contributing

### Code Standards
- Follow TypeScript strict mode
- Use ESLint and Prettier configurations
- Write tests for new features
- Follow component composition patterns

### Git Workflow
- Create feature branches from `develop`
- Submit pull requests for code review
- Ensure CI passes before merging

## Monitoring & Observability

### Logging
- **Development**: Console logging with configurable levels
- **Production**: Structured JSON logging to configurable endpoints
- **Error Tracking**: Integration ready for error monitoring services

### Performance
- **Metrics**: Core Web Vitals tracking
- **Analytics**: User interaction tracking (privacy-compliant)

## Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Type Errors**
```bash
# Check TypeScript configuration
npm run type-check
```

**Test Failures**
```bash
# Run tests with verbose output
npm run test -- --verbose
```

## Status

✅ **Phase 3 Complete**: CI/CD pipelines, Docker containers, and security scanning implemented  
⚠️ **Structure Only**: Component structures ready, awaiting functional implementation  
🚀 **Deployment Ready**: Production containers and deployment scripts available