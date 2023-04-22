#!/bin/bash

# run celerybeat
# python3 -m celery -A src.celery:celery_app beat --loglevel=INFO &

# run celery workers
# python3 -m celery -A src.celery:celery_app worker --loglevel=INFO &

echo "Printing password and cert"
echo $ES_PASSWORD
echo $ES_CERT
echo "Printing done"
# run flask server
python3 src/server.py