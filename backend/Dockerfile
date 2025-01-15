FROM python:3.12-alpine

RUN apk update \
    && apk add gcc python3-dev musl-dev zlib

RUN apk add build-base python-dev py-pip jpeg-dev zlib-dev

WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/app/wheels -r requirements.txt

COPY . .

CMD python run.py