#FROM node:18.17.1-alpine AS build
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
#COPY . .
#RUN npm run build
#
#FROM nginx:stable
#COPY --from=build /app/dist /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
FROM node:18.17.1-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build

FROM nginx:stable
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html
EXPOSE 80

