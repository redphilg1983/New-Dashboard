FROM node:8 as builder

COPY C:\Users\tahir\Documents\Angular 5 Dashboard\ngx-admin /ngx-admin

WORKDIR /ngx-admin

RUN npm install
RUN $(npm bin)/ng builder

FROM nginx

COPY --from=builder /ngx-admin/dist/* /usr/share/nginx/html

EXPOSE 80
