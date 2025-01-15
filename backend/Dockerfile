FROM python:3.12-slim

RUN apk update \
    && apk add — virtual build-dependencies gcc python3-dev musl-dev \
    && apk add jpeg-dev zlib-dev libjpeg \
    && pip install Pillow \
    && apk del build-dependencies

# Установка рабочей директории
WORKDIR /backend

RUN pip install Pillow --no-cache-dir

# Копирование файла зависимостей
COPY requirements.txt requirements.txt

# Установка зависимостей из requirements.txt
RUN pip install -r requirements.txt

# Копирование остальных файлов проекта
COPY . .

# Команда для запуска приложения
CMD python run.py