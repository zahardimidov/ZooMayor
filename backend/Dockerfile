FROM python:3.12-slim

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

RUN pip install --upgrade pip
RUN pip install --upgrade pip setuptools
RUN pip install Pillow --no-cache-dir
RUN pip install --upgrade pip
RUN pip install --no-cache /wheels/*

WORKDIR /backend

RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install --upgrade Pillow

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD python run.py