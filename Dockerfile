
# Setup the nodejs-test-mocha-chai

FROM node:16

WORKDIR /usr/app/backend/
COPY ./package*.json ./
RUN npm install 
COPY . .

ENV PORT 8000

EXPOSE 8000

CMD ["npm", "start"]
