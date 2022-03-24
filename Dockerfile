
# Setup the nodejs-test-mocha-chai

FROM node:16

WORKDIR /usr/app/nodejs-test-mocha-chai/
COPY nodejs-test-mocha-chai/package*.json ./
RUN npm install 
COPY nodejs-test-mocha-chai/ ./

ENV PORT 8000

EXPOSE 8000

CMD ["npm", "start"]
