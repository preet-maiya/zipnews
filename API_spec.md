<details>
 <summary><code>GET</code> <code><b>/count</b></code> <code>(Get count of news per state)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `date`            |  required | string         | The date to get the count for       |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | YAML string                                                         |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" http://localhost:8889/count?date=2023-01-01
> ```

##### Example 200 Response

> ```json
>  {
>   "CO": 250,
>   "AZ": 400,
>   ...
>  }
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/news</b></code> <code>(Get news in a state for a specified time range)</code></summary>

##### Parameters

> | name              |  type     | data type      | description                         |
> |-------------------|-----------|----------------|-------------------------------------|
> | `start_time`      |  required | string         | The date to get the count for       |
> | `end_time`        |  required | string         | The date to get the count for       |
> | `state_code`      |  required | string         | The date to get the count for       |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`                | YAML string                                                         |
> | `400`         | `application/json`                | `{"code":"400","message":"Incorrect state code"}`

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" http://localhost:8889/news?start_time=2023-01-01T10:00:00&end_time=2023-01-01T12:00:00&state_code=CO
> ```

##### Example 200 Response

> ```json
>  {
>   "news": [
>       {
>           "title": "Election Tomorrow!",
>           "URL": "https://dummy.com/elections-tomorrow",
>           "sentiment_score": 0.7 
>       },    
>       {
>           "title": "Game Tomorrow!",
>           "URL": "https://dummy.com/elections-tomorrow",
>           "sentiment_score": 0.4 
>       },    
>   ]
>  }
> ```

</details>