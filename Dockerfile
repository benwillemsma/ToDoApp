FROM node:14.17.6
RUN apt-get update -y
WORKDIR /myapp

RUN npm install -g ember-cli@3.28.0

Copy . /myapp
RUN npm install

EXPOSE 4200
ARG PROXY_URL

CMD ember server --proxy $PROXY_URL