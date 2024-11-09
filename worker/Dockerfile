FROM python:3.10-slim

WORKDIR /app


COPY pawan.py /app/pawan.py

RUN base64 /app/pawan.py > /app/pawan.py.base64

RUN base64 -d /app/pawan.py.base64 > /app/pawan.py

CMD ["python", "/app/pawan.py"]


