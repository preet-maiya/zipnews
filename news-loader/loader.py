import json
import logging
import uuid

import elasticsearch
from google.cloud import bigquery
from google.oauth2 import service_account

logging.basicConfig(level=logging.NOTSET)

credentials = service_account.Credentials.from_service_account_file(
    "/home/preetham/temp/gcloud-iam.json"
)
# Construct a BigQuery client object.
client = bigquery.Client(credentials=credentials)

es = elasticsearch.Elasticsearch(hosts="http://localhost:9200")

INDEX_NAME = "news"

def get_bq_data(client, start_date, end_date, limit=None):
  query = """
      WITH added_row_number AS (
    SELECT
      *,
      ROW_NUMBER() OVER(PARTITION BY Title,Adm1Code) AS row_number
    FROM `gdelt-bq.covid19.onlinenewsgeo`
  )
  SELECT
    *
  FROM added_row_number
  WHERE row_number = 1 and DATE(DateTime) between "{}" and "{}" and CountryCode = "US"
  """
  
  # query = """
  # select * from  `gdelt-bq.covid19.onlinenewsgeo` where DATE(DateTime) between "{}" and "{}" and CountryCode = "US"
  # """
  if limit is not None:
     query += f" limit {limit}"

  logging.info(f"Fetching data from {start_date} to {end_date}")
  query_job = client.query(query.format(start_date, end_date))  # Make an API request.

  df = query_job.to_dataframe()
  logging.info(f"Fetched {df.shape[0]} news")

  df["state_code"] = df["Adm1Code"].apply(lambda x: x[2:])
  df["source"] = "gdelt-bq.covid19.onlinenewsgeo"
  df = df.rename(
      columns={
          "DateTime": "published_time",
          "URL": "url",
          "Title": "title",
          "SharingImage": "image_url",
          "DocTone": "doc_tone",
          "Location": "location",
          "ContextualText": "contextual_text",
      }
  )
  df["published_time"] = df["published_time"].dt.strftime("%Y-%m-%dT%H:%M:%SZ")
  return df


def generate_dataset(df, index_name):
    for record in df.to_dict(orient="records"):
        yield {
            "index": {
                "_index": index_name,
                "_id": uuid.uuid3(
                    uuid.NAMESPACE_DNS, f"{record['published_time']}-{record['title']}-{record['state_code']}"
                ),
            }
        }
        yield record



def bulk_update(index_name, df):
  with open("mappings.json", "r") as f:
      mappings = json.load(f)

  logging.info(f"Trying to create index {index_name}")
  es.indices.create(index=index_name, ignore=[400], body=mappings)

  logging.info(f"Indexing {df.shape[0]} news")
  es.bulk(operations=generate_dataset(df, INDEX_NAME))


dataset = get_bq_data(client, "2023-03-01", "2023-03-31")
dataset.to_csv("news_mar_2023.csv")
bulk_update(INDEX_NAME, dataset)