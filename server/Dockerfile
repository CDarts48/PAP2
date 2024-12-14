# Use the Node.js 16 image as the base image
FROM node:16

WORKDIR /app

# Copy the backend package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend application code
COPY . .

# Expose the port the backend server listens on
EXPOSE 3001

# Command to run the backend server
CMD ["node", "server.js"]