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

# Nginx stage - unprivileged image ile tam non-root (UID 101, port 8080)
FROM nginxinc/nginx-unprivileged:1.27-alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
COPY SmartEventPlanningApp/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://127.0.0.1:8080/ > /dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]


