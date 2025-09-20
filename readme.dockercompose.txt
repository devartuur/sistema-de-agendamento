Etapas / Estrutura:

Versão do Compose

version: '3.9' → define a versão do Docker Compose usada.

Serviço db

image: postgres:15-alpine → usa a imagem oficial do PostgreSQL 15, leve (Alpine).

container_name: pg_sistema_agendamento → nome do container.

environment: → define variáveis do banco:

POSTGRES_USER → usuário do banco.

POSTGRES_PASSWORD → senha do banco.

POSTGRES_DB → banco inicial que será criado.

ports: - "5432:5432" → mapeia a porta 5432 do container para sua máquina, permitindo conexão externa.

volumes: - pgdata:/var/lib/postgresql/data → mantém os dados persistentes mesmo que o container seja parado.

Volumes

pgdata: → volume nomeado para armazenar os dados do banco.

Observações

Ao subir o container, o banco será criado automaticamente com o usuário e senha definidos.

Ideal para desenvolvimento local, testando a API Node.js ou outras aplicações.