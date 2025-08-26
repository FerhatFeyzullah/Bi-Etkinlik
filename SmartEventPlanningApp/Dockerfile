# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY SmartEventPlanningApp/package*.json ./
RUN npm ci
COPY SmartEventPlanningApp/ .
# Inject Vite env at build time
ARG VITE_API_BASE
ENV VITE_API_BASE=${VITE_API_BASE}
RUN npm run build

# Nginx stage
FROM nginx:1.27-alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
COPY SmartEventPlanningApp/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


