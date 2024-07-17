FROM node:20.10.0-alpine As development

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build

FROM node:20.10.0-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

RUN apk add --no-cache openssh
RUN apk add --no-cache git
COPY --from=development /root/.ssh /root/.ssh

COPY . .

RUN yarn install --production

COPY --from=development /usr/src/app/dist ./dist

CMD yarn migration:run ; node dist/main
