# Stage 1: Build the frontend
FROM node:16 as build-frontend

# Set the working directory
WORKDIR /app

# Copy the frontend package.json and package-lock.json
COPY ../client/package*.json ./client/

# Install frontend dependencies
WORKDIR /app/client
RUN npm install

# Copy the rest of the frontend application code
COPY ../client .

# Build the frontend application
RUN npm run build

# Stage 2: Build the backend
FROM node:16

# Set the working directory
WORKDIR /app

# Copy the backend package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend application code
COPY . .

# Copy the frontend build artifacts from the previous stage
COPY --from=build-frontend /app/client/build ./client/build

# Expose the port the app runs on
EXPOSE 3001

# Command to run the backend server
CMD ["node", "server.js"]