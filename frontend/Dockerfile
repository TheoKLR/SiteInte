FROM node:18-alpine

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React app
RUN npm run build

EXPOSE 3000

# Start the React app
CMD ["npm", "start"]