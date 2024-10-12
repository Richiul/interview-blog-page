# Use official Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project (except things in .dockerignore)
COPY . .

# Start the React app in development mode
CMD ["npm", "run", "start"]

# Expose the port the app runs on
EXPOSE 3000
