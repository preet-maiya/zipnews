import elasticsearch
import config
import traceback
import random

from elasticsearch.helpers import scan

class ElasticClient(object):
    def __init__(self, hosts=[config.ES_CONNECTION_STRING], **kwargs):
        self.client = elasticsearch.Elasticsearch(hosts, ca_certs=config.ES_CERT_PATH,
                    basic_auth=(config.ES_USER, config.ES_PASSWORD))
    
    def search(self, index_name, search_query, **kwargs):
        try:
            resp = self.client.search(index=index_name, body=search_query, **kwargs)
            return resp
        except Exception as ex:
            traceback.print_exc()
    def scan_search(self, index_name, search_query, **kwargs):
        try:
            resp = scan(self.client, query=search_query, index=index_name)
            return resp
        except Exception as ex:
            traceback.print_exc()

try:
    es = ElasticClient()
except Exception as ex:
    traceback.print_exc()
    print("Failed to connect to elasticsearch")

def replace_in_dict(input, variables):
    result = {}
    for key, value in input.items():
        if isinstance(value, dict):
            result[key] = replace_in_dict(value, variables)
        elif isinstance(value, list):
            result[key] = replace_in_dict(value[0], variables)
        else:
            result[key] = value % variables
    return result

def get_news_per_state(start_time, end_time, state_code):
    search_query = config.STATE_SEARCH_REQ_BODY
    search_query["query"]["bool"]["must"][0]["range"]["published_time"]["lte"] = end_time
    search_query["query"]["bool"]["must"][0]["range"]["published_time"]["gte"] = start_time
    search_query["query"]["bool"]["must"][1]["match"]["state_code"] = state_code
    print(search_query)
    resp = es.scan_search(config.ES_INDEX_NAME, search_query)
    results = []
    for hit in resp:
        results.append(hit)
    if len(results) > config.NEWS_COUNT:
        random_selection = random.sample(results, config.NEWS_COUNT)
    else:
        random_selection = results # select all available news
    news = []
    for article in random_selection:
        info = {
            "title": article["_source"]["title"],
            "url": article["_source"]["url"]
        }
        news.append(info)
    print(len(results))
    # print(results[0])

    return news


def get_state_news_count(date):
    start_time = date + " 00:00:00"
    end_time = date + " 23:59:59"
    search_query = config.STATE_COUNT_REQ_BODY
    search_query["query"]["bool"]["must"][0]["range"]["published_time"]["lte"] = end_time
    search_query["query"]["bool"]["must"][0]["range"]["published_time"]["gte"] = start_time
    print(search_query)
    resp = es.search(config.ES_INDEX_NAME, search_query)
    # print(resp)
    results = {}
    for state in resp["aggregations"]["state_code"]["buckets"]:
        results[state["key"]] = state["doc_count"]
    return results