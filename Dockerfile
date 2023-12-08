# Use an official Node runtime as a parent image
FROM node:14 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the Angular application
RUN ng build --prod

# Use an official Nginx runtime as a parent image
FROM nginx:1.21-alpine

# Copy the Angular build from the builder stage to the nginx public directory
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Expose port 13000
EXPOSE 13000

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
