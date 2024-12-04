# Stage 1: Build the frontend
FROM node:16 as build-frontend

WORKDIR /app/client

# Copy package files and install dependencies
COPY ./client/package*.json ./
RUN npm install

# Copy the rest of the frontend files
COPY ./client/ ./

# Build the React app
RUN npm run build

# Stage 2: Build the backend
FROM node:16

WORKDIR /app

# Copy the backend package files and install dependencies
COPY ./server/package*.json ./
RUN npm install

# Copy the rest of the backend files
COPY ./server/ ./

# Copy the frontend build artifacts from the previous stage
COPY --from=build-frontend /app/client/build ./client/build

# Expose the port the app runs on
EXPOSE 3001

# Command to run the backend server
CMD ["node", "server.js"]
