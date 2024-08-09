FROM node:18.17.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY prisma ./prisma/

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

# Install netcat for the database check
RUN apt-get update && apt-get install -y netcat-openbsd

COPY start.sh ./
RUN chmod +x start.sh

CMD ["./start.sh"]