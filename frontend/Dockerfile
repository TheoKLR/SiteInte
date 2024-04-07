FROM node:18

WORKDIR /srv/app

COPY --chown=node:node package*.json ./

RUN npm install --frozen-lockfile

COPY --chown=node:node . .

RUN npm run build

RUN npm i -g serve

COPY . .

EXPOSE 3000

CMD ["serve", "-s", "build"]