## Setup Elasticsearch and Kibana

Elasticsearch and Kibana are setup as docker containers. Install [docker desktop](https://www.docker.com/products/docker-desktop/) for this.

- Save the below contents to elasticsearch-kibana.yaml

    ```yaml
    version: "3.7"
    services:
    elasticsearch:
        image: docker.elastic.co/elasticsearch/elasticsearch:8.6.2
        container_name: elasticsearch
        restart: always
        environment:
        - xpack.security.enabled=false
        - discovery.type=single-node
        ulimits:
        memlock:
            soft: -1
            hard: -1
        nofile:
            soft: 65536
            hard: 65536
        cap_add:
        - IPC_LOCK
        volumes:
        - ./elasticsearch-data:/usr/share/elasticsearch/data
        ports:
        - 9200:9200
    kibana:
        container_name: kibana
        image: docker.elastic.co/kibana/kibana:8.6.2
        restart: always
        environment:
        - ELASTICSEARCH_HOSTS=http://elasticsearch:9200    # address of elasticsearch docker container which kibana will connect
        ports:
        - 5601:5601
        depends_on:
        - elasticsearch
    ```

- Run `docker compose -f elasticsearch-kibana.yml up -d` to start and give it a minute for it to come up and go to `localhost:9200` in browser. Elasticsearch should respond.

- To bring the containers down, run `docker compose -f elasticsearch-kibana.yml down`.

## Indexing the news

Getting data from google bigquery costs console credits. It allows upto 1TB of processing free for a month. There is an existing file for the news [here](https://drive.google.com/file/d/1HGtchfdBUDUcZstIiztEcAbzGTQiCoZb/view?usp=share_link). By default, the script gets from the local dataset. To index news to elasticsearch, run the following

```bash
LOCAL_DATASET="path/to/dataset.csv" python loader.py --start-date='2023-01-01' --end-date='2023-01-20'
```

To get from big query, a google service account is needed. Follow this [documentation](https://cloud.google.com/iam/docs/service-accounts-create) to create service account and this [so post](https://stackoverflow.com/questions/46287267/how-can-i-get-the-file-service-account-json-for-google-translate-api) and get the json file. To get data from bigquery and run the script

```bash
LOAD_FROM_BQ=1 SERVICE_ACCOUNT_FILE=/path/to/gcloud-iam.json python loader.py --start-date='2023-01-01' --end-date='2023-01-20'
```