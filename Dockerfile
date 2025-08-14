# Development Dockerfile for wanderfiz-ui
FROM node:20-alpine AS development

# Set working directory
WORKDIR /app

# Install system dependencies for development tools
RUN apk add --no-cache git curl

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -u 1001 -S nextjs -G nodejs

# Change ownership of app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose development port
EXPOSE 5173

# Health check for development
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5173/ || exit 1

# Start development server with hot reload
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]