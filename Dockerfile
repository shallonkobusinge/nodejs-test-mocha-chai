
# Setup the backend

FROM node:16

WORKDIR /usr/app/backend/
COPY backend/package*.json ./
RUN npm install 
COPY backend/ ./

ENV PORT 8000

EXPOSE 8000

CMD ["npm", "start"]
