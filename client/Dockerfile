FROM node:alpine as build

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

CMD npm run build


FROM nginx:alpine

EXPOSE 3000

COPY nginx/default.conf /etc/nginx/conf.d/
COPY --from=build /usr/app/build /usr/share/nginx/html
