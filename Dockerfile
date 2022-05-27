FROM node:alpine

RUN mkdir -p /usr/src/cubetechsmswrapper && chown -R node:node /usr/src/cubetechsmswrapper

WORKDIR /usr/src/cubetechsmswrapper

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node","server.js" ]