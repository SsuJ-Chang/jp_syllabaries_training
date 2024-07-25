# Use an official Node.js image as the base image
FROM node:latest

# Create a new directory for the app
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# 安裝 serve
RUN npm install -g serve

# Copy the rest of the source code into the container
COPY . .

# Build the application
RUN npm run build

# Expose the port that the app will use
EXPOSE 3000

# Set the startup command to serve the built application
CMD ["npx", "serve", "-s", "build"]
