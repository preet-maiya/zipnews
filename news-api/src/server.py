from flask import Flask, Response, make_response, jsonify, request
import config
import json
import datetime
import traceback
import requests
from helpers import get_news_per_state, get_state_news_count


app = Flask(__name__)
base_route = config.API_VERSION

@app.route(f"{base_route}/")
@app.route(f"{base_route}/health")
@app.route("/")
@app.route("/health")
def hello():
    resp = {
        "validPaths": ["/v1/count","/v1/news?start_time=<start_time>&end_time=<end_time>&state_code=<code>"],
        "msg": "Zipnews API Service. Use one of the mentioned valid endpoints",
        "version": base_route.strip("/")
    }
    return Response(response=json.dumps(resp), status=200, mimetype="application/json")

@app.route(f"{base_route}/news", methods=["GET"])
def get_news():
    try:
        start_time = request.args.get("start_time")
        end_time = request.args.get("end_time")
        state_code = request.args.get("state_code")
        news = get_news_per_state(start_time, end_time, state_code)
        resp = {
            "news": news,
            "status": "Success"
        }
        return make_response(jsonify(resp), 200)
    except Exception as ex:
        traceback.print_exc()

@app.route(f"{base_route}/count", methods=["GET"])
def get_count():
    try:
        date = request.args.get("date")
        news_count = get_state_news_count(date)
        resp = {
            # "news": news,
            "status": "Success"
        }
        return make_response(jsonify(news_count), 200)
    except Exception as ex:
        traceback.print_exc()

if __name__ == "__main__":
    app.run(port=config.PORT, host=config.HOST)