FROM debian:bullseye-slim

# Instalações básicas
RUN apt-get update && \
    apt-get install -y curl gnupg ca-certificates wget xz-utils && \
    apt-get install -y wkhtmltopdf && \
    apt-get clean

# Instala Node.js 18 LTS diretamente do NodeSource
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "servidor.js"]
