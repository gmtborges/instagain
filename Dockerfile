# Build stage
FROM node:20-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --prefer-offline --no-audit

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN npm run build

# Production stage
FROM node:20-alpine as production

# Set the working directory in the container
WORKDIR /usr/local/app

# Copy built artifacts from the build stage
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app using Node.js
CMD ["node", "build"]
