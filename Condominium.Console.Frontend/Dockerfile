# BUILD
FROM node:16-alpine3.14 AS build
WORKDIR /dist/src/app
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:latest AS ngi
COPY --from=build /dist/src/app/dist/fuse /usr/share/nginx/html
COPY /default.conf  /etc/nginx/conf.d/default.conf
COPY ["set-process-env.js", "src/environments/environment.base.ts", "./"]. 
CMD node set-process-env.js ; nginx -g "daemon off;"
EXPOSE 443
EXPOSE 80