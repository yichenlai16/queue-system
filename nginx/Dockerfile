# dev
FROM node:21.4.0-alpine3.18 as build-stage
WORKDIR /app/
COPY client/package.json /app/
RUN npm cache verify
RUN npm install
COPY client /app/
RUN npm run build

# prod
FROM nginx:stable-alpine3.17-slim as production-stage
COPY nginx/prod.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /dist/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]