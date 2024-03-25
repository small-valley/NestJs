# Use the official Node.js 20 image as a base
FROM node:20-alpine

# Add command to increase file descriptor limit
RUN ulimit -n 65536

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Nest CLI globally
RUN npm install -g @nestjs/cli

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the app runs on
EXPOSE 5555 5432

# Command to run the application
CMD ["npm", "run", "start:dev"]
