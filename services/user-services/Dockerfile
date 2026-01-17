# services/user-service/Dockerfile
FROM node:20

WORKDIR /app

# Copy package.json & package-lock.json first for caching
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose port 3000 (container internal)
EXPOSE 3000

# Run the compiled server
CMD ["node", "dist/server.js"]
