# Build stage
FROM node:alpine AS builder

# Install git and openssh-client (required for pnpm to fetch GitHub dependencies via SSH)
RUN apk add --no-cache git openssh-client

# Copy ssh credentials
RUN mkdir -p /root/.ssh && chmod 700 /root/.ssh
COPY .ssh /root/.ssh/
RUN chmod 600 /root/.ssh/* && chmod 644 /root/.ssh/*.pub

WORKDIR /app

# Copy package files
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM nginx:alpine

# Remove default nginx files and configuration
RUN rm -rf /usr/share/nginx/html/* && rm -f /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/dist/client /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
