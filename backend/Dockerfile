FROM python:3.12-alpine

RUN apk add --no-cache gcc musl-dev

WORKDIR /backend

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD python run.py