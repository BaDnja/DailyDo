# Stage 1: Build the Angular application
FROM node:21-alpine AS build
WORKDIR /app

# Copy all files to the container
COPY . .

# Install dependencies
RUN npm install

# Build the Angular app
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/daily-do/browser /usr/share/nginx/html
EXPOSE 80
