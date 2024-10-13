# Use official Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Verify that react-scripts is installed
RUN ls -la node_modules/.bin

# Copy the entire project (except things in .dockerignore)
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the React app in development mode
CMD ["npm", "run", "start"]