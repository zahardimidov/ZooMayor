FROM python:3.12-slim

# Установка необходимых системных зависимостей
RUN apt-get update && apt-get install -y \
    python3-dev \
    gcc \
    musl-dev \
    libjpeg-dev \
    zlib1g-dev \
    libtiff5-dev \
    libopenjp2-7-dev \
    liblcms2-dev \
    libffi-dev \
    libwebp-dev \
    libharfbuzz-dev \
    libfribidi-dev \
    && rm -rf /var/lib/apt/lists/*

# Установка рабочей директории
WORKDIR /backend

# Копирование файла зависимостей
COPY requirements.txt requirements.txt

# Установка зависимостей из requirements.txt
RUN pip install -r requirements.txt

# Копирование остальных файлов проекта
COPY . .

# Команда для запуска приложения
CMD python run.py