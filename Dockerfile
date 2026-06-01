# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app

# Copy the entire workspace so that relative data imports (e.g. ../../../data/) resolve correctly during build
COPY . .

# Run installation and build from the web/ subdirectory context
WORKDIR /app/web
RUN npm ci
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build /app/web/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
