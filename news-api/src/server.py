from flask import Flask, Response
import config
import json
import datetime
import traceback
import requests

app = Flask(__name__)
base_route = config.api_version

@app.route(f"{base_route}/")
@app.route(f"{base_route}/health")
@app.route("/")
@app.route("/health")
def hello():
    resp = {
        "validPaths": ["/v1/count","/v1/news?start_time=<start_time>&end_time=<end_time>&state_code=<code>"],
        "msg": "Zipnews API Service. Use one of the mentioned valid endpoints",
        "version": config.api_version.strip("/")
    }
    return Response(response=json.dumps(resp), status=200, mimetype="application/json")

if __name__ == "__main__":
    app.run(port=config.PORT, host=config.HOST)