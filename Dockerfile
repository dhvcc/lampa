# Use Node.js LTS (Long Term Support) as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the application (if needed)
RUN npm run start -- --build

# Expose port 3000 (matches the README.md localhost:3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 