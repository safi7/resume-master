# Stage 1: Build Angular application
FROM node:14 AS builder

WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock* ./

# Install Angular CLI globally
RUN yarn global add @angular/cli

# Install project dependencies
RUN yarn install

# Copy the entire application to the container
COPY . .

# Build the Angular application
RUN ng build --prod

# Stage 2: Use Nginx for serving the built Angular application
FROM nginx:1.21-alpine

# Set the working directory in the Nginx container
WORKDIR /usr/share/nginx/html

# Copy the built Angular application from the builder stage to the Nginx directory
COPY --from=builder /app/dist/* ./

# Expose port 80 (default for HTTP)
EXPOSE 80

# Command to run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
