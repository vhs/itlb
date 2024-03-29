FROM node:lts

WORKDIR /app

COPY package.json /app/
RUN cd /app && npm install --production
COPY . /app

EXPOSE 3000
