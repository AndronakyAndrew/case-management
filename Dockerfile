FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Pass in the API URL at build time
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js application (build-time env variables are injected here)
RUN npm run build

# Expose the desired port (adjust if needed)
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]