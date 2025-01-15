FROM python:3.12-slim

# Установка необходимых системных зависимостей
RUN apt-get update && apt-get install -y \
    python3-dev \
    gcc \
    musl-dev \
    libjpeg8-dev \
    zlib1g-dev \
    libtiff5-dev \
    libopenjp2-7-dev \
    liblcms2-dev \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

# Обновление pip и установка Pillow
RUN pip install --upgrade pip setuptools
RUN pip install Pillow --no-cache-dir

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