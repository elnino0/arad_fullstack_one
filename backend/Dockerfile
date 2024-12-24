# Use an official Node.js image as a base
FROM node:20.12.0

# Set the working directory to /app
WORKDIR /app


# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code to the working directory
COPY ./src ./src

# Expose the port that the application will use
EXPOSE 3000

# Run the command to start the application when the container launches
CMD ["npm", "start"]