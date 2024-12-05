# Stage 1: Build the frontend
FROM node:16 as build-frontend

WORKDIR /app

# Copy the React app files
COPY client/package*.json ./client/
WORKDIR /app/client
RUN npm install

COPY client/ ./client/

# Run the React build process
RUN npm run build

# Stage 2: Build the backend
FROM node:16

WORKDIR /app

# Copy the backend package.json and package-lock.json
COPY server/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend application code
COPY server/ ./

# Copy the frontend build artifacts from the previous stage
COPY --from=build-frontend /app/client/build ./client/build

# Expose the port the app runs on
EXPOSE 3001

# Command to run the backend server
CMD ["node", "server.js"]