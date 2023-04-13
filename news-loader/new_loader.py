import os
import csv
import json
import argparse
import time
import uuid
import logging
import locale
import elasticsearch
from elasticsearch.helpers import streaming_bulk, parallel_bulk


LOG_LEVEL = logging.DEBUG
# logging.basicConfig(filename="get_transform_load.log", filemode='a',
#                     format='%(asctime)s:%(msecs)d %(name)s %(levelname)s %(message)s',
#                     datefmt='%H:%M:%S', level=logging.DEBUG)

# logger = logging.getLogger(name=__file__)

def _get_logger(name=__name__, handler=logging.FileHandler(filename="get_transform_load.log", mode="a")):
    logger = logging.getLogger(name)
    try:
        locale.setlocale(locale.LC_ALL, 'en_US.UTF-8')
    except locale.Error as e:
        logger.debug("Ignoring error %s when setting locale", e)
    try:
        logger.setLevel(LOG_LEVEL)
    except NameError:
        logger.setLevel(logging.INFO)
    if not len(logger.handlers):
        handler = handler
        formater = logging.Formatter(
            "%(asctime)s — %(name)s — %(levelname)s — %(message)s")
        handler.setFormatter(formater)
        logger.addHandler(handler)
    return logger

class ElasticDataloaderSet(object):
    def __init__(self, input_file, es_index_name):
        self.input_file = input_file
        self.es_index_name = es_index_name


class ElasticDataloaderException(Exception):
    pass


class ElasticDataloader(object):
    def __init__(self, hosts=["https://elastic:123456@localhost:9200/"], **kwargs):
        self._logger = logging.getLogger(__file__) # @TODO update certificate path
        self.client = elasticsearch.Elasticsearch(hosts, ca_certs="/Users/ashutoshgandhi/BMCP/elasticsearch-8.6.1/config/certs/http_ca.crt",
                    basic_auth=("elastic","123456"))
        
    def load_dataset(self, es_dataset, chunk_size=500, **kwargs):

        try:
            self._prepare_index(es_dataset)
            bulks_processed = 0
            not_ok = []
            generator = self._csv_generator(es_dataset)
            # for cnt, response in enumerate(streaming_bulk(self.client, generator, chunk_size, max_retries=2)):
            for cnt, response in enumerate(parallel_bulk(self.client, actions=generator, thread_count=4, chunk_size=chunk_size)):
                ok, result = response
                if not ok:
                    not_ok.append(result)
                if cnt % chunk_size == 0:
                    bulks_processed += 1
                    # self._logger.debug(
                    #     f"Bulk number {bulks_processed} processed, already processed docs {cnt}.")
                    if len(not_ok):
                        self._logger.error(
                            f"NOK DOCUMENTS (log limited to 10) in batch {bulks_processed}: {not_ok[-10:]}")
                        not_ok = []
                if cnt % 500000 == 0:
                    self._logger.debug(
                        f"Bulk number {bulks_processed} processed, already processed docs {cnt}.")
            self._logger.info(
                f"Refreshing index {es_dataset.es_index_name} to make indexed documents searchable.")
            self.client.indices.refresh(index=es_dataset.es_index_name)
        except (elasticsearch.TransportError) as e:
            self._logger.error(
                f"Issue with Elasticsearch client config {e}")
            raise ElasticDataloaderException from e
        except (elasticsearch.ApiError) as e:
            self._logger.error(
                f"There was an exception during indexing of data {e}")
            raise ElasticDataloaderException from e
        except (csv.Error, json.JSONDecodeError) as e:
            self._logger.error(
                f"Issue with the contents of the file: {es_dataset.input_file} {type(e)} {e}")
            raise ElasticDataloaderException from e
        except (IOError, ValueError) as e:
            self._logger.error(
                f"Issue with file: {es_dataset.input_file} {e}")
            raise ElasticDataloaderException from e
        else:
            return cnt+1
    

    def _csv_generator(self, es_dataset, **kwargs):
        with open(es_dataset.input_file) as csv_file:
            csv_dict_reader = csv.DictReader(csv_file)
            for cnt, row in enumerate(csv_dict_reader):
                yield self._prepare_document_for_bulk(es_dataset, row, cnt)
    

    def _prepare_document_for_bulk(self, es_dataset, row, cnt):
        row["_id"] = uuid.uuid4()
        row["_index"] = es_dataset.es_index_name
        # print(row)
        return row

    def _prepare_index(self, es_dataset):
        self._logger.debug(
            f"Attempting to delete the index {es_dataset.es_index_name} first as requested.")
        try:
            res = self.client.indices.delete(
                index=es_dataset.es_index_name)
        except elasticsearch.NotFoundError:
            self._logger.debug("Required index for deletion not found.")
        
        self._logger.debug(
            f"Making sure index {es_dataset.es_index_name} exists.")
        self.client.indices.create(index=es_dataset.es_index_name, ignore=400)



def main():
    logger = _get_logger(name=__file__)
    parser = argparse.ArgumentParser()
    parser.add_argument("--file-path", type=str,
                        help="file-path path ")
    args = parser.parse_args()
    # self.input_file = "transformed_data/new_udplatency.csv"
    # self.es_index_name = "curr-udplatency-202201"


    start = time.time()
    logger.info("Script execution STARTED.")
    try:
        es_loader = ElasticDataloader()
        logger.info(f"ingesting data for file {args.file_path}")
        es_dataset = ElasticDataloaderSet(input_file=args.file_path, es_index_name="news-march")    
        docs_processed = es_loader.load_dataset(es_dataset)
        logger.info(f"Dataset from file {args.file_path} loaded to Elasticsearch. Number of documents processed: {docs_processed}.")
    except (ElasticDataloaderException) as e:
        logger.error(
            f"Script execution FAILED.", exc_info=True)
        return 1
    else:
        end = time.time()
        logger.info(
            f"Script execution FINALIZED in {end - start} seconds. Dataset from file {es_dataset.es_index_name} loaded to Elasticsearch. Number of documents processed: {docs_processed}.")
        return 0


if __name__ == "__main__":
    main()