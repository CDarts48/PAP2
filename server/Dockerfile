# Stage 1: Build the frontend
FROM node:16 as build-frontend
WORKDIR /app
# Copy the React app's package.json and package-lock.json
COPY ../client/package*.json ./client/
WORKDIR /app/client
RUN npm install
# Copy the rest of the frontend code into the container
COPY ../client/ ./client/
# Build the React app for production (this will create the build folder)
RUN npm run build

# Stage 2: Setup the backend and copy the built frontend assets
FROM node:16
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
COPY --from=build-frontend /app/client/build ./client/build
EXPOSE 3001
CMD ["node", "server.js"]