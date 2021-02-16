FROM node:12

WORKDIR /run

COPY package*.json ./

RUN npm i --silent --no-progress --no-audit --unsafe-perm

COPY .eslintignore .eslintignore
COPY .eslintrc .eslintrc
COPY config-overrides.js config-overrides.js
COPY tsconfig.json tsconfig.json
COPY tsconfig.paths.json tsconfig.paths.json
COPY public public

EXPOSE 3000
