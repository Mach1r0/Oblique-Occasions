FROM python:3.10

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
COPY db_dump.json /app/db_dump.json
COPY media_backup.tar.gz /app/media_backup.tar.gz

ENV PYTHONUNBUFFERED=1

CMD ["sh", "-c", "python manage.py migrate && python manage.py loaddata /app/db_dump.json && tar -xzvf /app/media_backup.tar.gz -C /app/ && python manage.py runserver 0.0.0.0:8000 && python /app/create_superuser.py"]