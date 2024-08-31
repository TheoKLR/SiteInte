FROM node:18.0.0

WORKDIR /srv/app

COPY --chown=node:node package*.json ./

RUN npm install --frozen-lockfile

COPY --chown=node:node . .

RUN npm run start:build

COPY . .

EXPOSE 8000

CMD ["npm", "run", "start:prod"]