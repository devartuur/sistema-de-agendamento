FROM node:lts-alpine AS builder 

# Definindo diretorio de trabalho
WORKDIR /app

# Copiando arquivos de dependencia para fazer as intalações necessarias
COPY package*.json /app/

# Instala as dependencias
RUN npm install

# Copia todo o conteúdo do diretório do projeto para /app
COPY . .

# Compilar o projeto, gera o /dist
RUN npm run build

FROM node:lts-alpine AS runner 

WORKDIR /app/

COPY --from=builder /app/dist ./dist 
COPY --from=builder /app/node_modules ./dist 

EXPOSE 3000

CMD ["node", "dist/main.js"]

