#!/bin/bash

# Parar os contêineres
docker-compose down

# Remover os volumes do Docker
VOLUMES=$(docker volume ls -qf dangling=true)
if [ -n "$VOLUMES" ]; then
  docker volume rm $VOLUMES
fi

VOLUMES=$(docker volume ls -q | grep postgres_data)
if [ -n "$VOLUMES" ]; then
  docker volume rm $VOLUMES
fi

# Reiniciar os contêineres
docker-compose up -d

# Esperar o banco de dados estar pronto
echo "Aguardando o banco de dados iniciar..."
sleep 20

# Verificar se o banco de dados está pronto
until docker-compose exec postgres pg_isready -U myuser -d mydb -h postgres; do
  echo "Esperando o banco de dados ficar pronto..."
  sleep 5
done

# Garantir que o script de instalação tem permissão para ser executado
chmod +x ./install.sh

# Executar o script de instalação
./install.sh