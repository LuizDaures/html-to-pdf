FROM debian:bullseye-slim

RUN apt-get update && \
    apt-get install -y curl gnupg wkhtmltopdf nodejs npm && \
    apt-get clean

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "servidor.js"]
