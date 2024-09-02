FROM node:18.0.0

RUN apt-get update && apt-get install -y locales tzdata \
    && echo "Europe/Paris" > /etc/timezone \
    && dpkg-reconfigure -f noninteractive tzdata \
    && echo "fr_FR.UTF-8 UTF-8" > /etc/locale.gen \
    && locale-gen fr_FR.UTF-8 \
    && update-locale LANG=fr_FR.UTF-8

ENV LANG fr_FR.UTF-8
ENV LC_ALL fr_FR.UTF-8
ENV TZ Europe/Paris

WORKDIR /srv/app

COPY --chown=node:node package*.json ./

RUN npm install --frozen-lockfile

COPY --chown=node:node . .

RUN npm run start:build

COPY . .

EXPOSE 8000

CMD ["npm", "run", "start:prod"]