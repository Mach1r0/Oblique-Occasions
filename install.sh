docker-compose down

docker-compose build

docker-compose up -d

echo "Aguardando o banco de dados iniciar..."
sleep 20

until docker-compose exec postgres pg_isready -U myuser -d mydb -h postgres; do
  echo "Esperando o banco de dados ficar pronto..."
  sleep 5
done

echo "Executando migrações do Django..."
docker-compose exec backend python manage.py migrate

echo "Carregando dados do dump JSON..."
docker-compose exec backend python manage.py loaddata /app/db_dump.json

echo "Verificando se o diretório de mídia existe..."
docker-compose exec backend sh -c "mkdir -p /app/media"

echo "Extraindo arquivos de mídia..."
docker-compose exec backend sh -c "tar -xzvf /app/media_backup.tar.gz -C /app/media --strip-components=1"

# Remover diretórios desnecessários (se necessário)
docker-compose exec backend sh -c "rm -rf /app/media/media"

# Reiniciar os contêineres para garantir que todas as configurações sejam aplicadas
docker-compose restart

# Mensagem de conclusão
echo "Instalação concluída com sucesso!"