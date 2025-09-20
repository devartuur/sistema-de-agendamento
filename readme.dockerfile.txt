README - Dockerfile da aplicação Node.js

Este Dockerfile cria uma imagem leve da aplicação Node.js usando multi-stage build com Alpine.

Etapas:

Builder

FROM node:lts-alpine AS builder → define a imagem base e o estágio de build.

WORKDIR /app → define o diretório de trabalho.

COPY package*.json /app/ → copia os arquivos de dependência.

RUN npm install → instala todas as dependências.

COPY . . → copia o restante do código.

RUN npm run build → compila o projeto, gerando /dist.

Runner

FROM node:lts-alpine AS runner → cria a imagem final apenas com o necessário para rodar.

WORKDIR /app/ → define o diretório de trabalho.

COPY --from=builder /app/dist ./dist → copia o código compilado.

COPY --from=builder /app/node_modules ./dist → copia as dependências (recomendável ajustar o path).

EXPOSE 3000 → expõe a porta da aplicação.

CMD ["node", "dist/main.js"] → comando para iniciar a aplicação.

Observações

A imagem final é leve, pois não inclui dependências de desenvolvimento.

Ideal para produção ou ambientes que usam containers.