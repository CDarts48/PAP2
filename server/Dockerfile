# Stage 1: Build the frontend
FROM node:16 as build-frontend

WORKDIR /app/client

# Copy the React app files
COPY ./client/package*.json ./
RUN npm install

# Copy the rest of the React app code
COPY ./client/ ./

# Run the React build process
RUN npm run build

# Stage 2: Build the backend
FROM node:16

WORKDIR /app/server

# Copy the backend package.json and package-lock.json
COPY ./server/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend application code
COPY ./server/ ./

# Copy the frontend build artifacts from the frontend stage
COPY --from=build-frontend /app/client/build ./client/build

# Expose the port the backend server listens on
EXPOSE 3001

# Command to run the backend server
CMD ["node", "server.js"]
