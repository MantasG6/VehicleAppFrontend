
# stage 1: build

FROM node:alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# stage 2: run

FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html