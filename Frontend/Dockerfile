# Use Node.js 18 as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json first to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the default Vite port
EXPOSE 5173

# Set the environment to development
ENV NODE_ENV=development

# Start the Vite development server
CMD ["npm", "run", "dev", "--" , "--host" , "--port", "5173"]
