# Use Node.js 22 Alpine as base image (matches local environment)
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Debug: List files to verify package.json exists
# RUN ls -la

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy all source code
COPY . .

# Debug: List files after copying source
# RUN ls -la

# Expose port 5173 (Vite's default dev server port)
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
