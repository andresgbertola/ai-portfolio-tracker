# ---------- Build Stage ----------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the project files (including Next.js source)
COPY . .

CMD ["npm", "run", "dev"]

