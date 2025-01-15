FROM python:3.12-slim

RUN apt-get update && apt-get install -y \
    gcc \
    musl-dev \
    libjpeg8-dev \
    zlib1g-dev \
    libtiff5-dev \
    libopenjp2-7-dev \
    liblcms2-dev \
    libffi-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD python run.py