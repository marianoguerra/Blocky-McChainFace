# Backend Proxy

Proxy between the frontend and the backend

## Setup

```
make setup
make run
```

To test on a browser:

```
make run-api-test
```

open http://localhost:8000/

To test on the cli:

```
curl -X POST -H "content-type: application/json" -d '{"k":42}' http://localhost:3000/do

curl -X POST -H "content-type: application/json" -d '{"type": "transfer"}' http://localhost:3000/do

curl -v -X POST -H "content-type: application/json" -d '{"type": "getAsset", "params": {"type": "cars", "id": "c1"}}' http://localhost:3000/do

curl -v -X POST -H "content-type: application/json" -d '{"type": "getAsset", "params": {"type": "cars", "id": "c3"}}' http://localhost:3000/do

curl -v -X POST -H "content-type: application/json" -d '{"type": "getAssets", "params": {"type": "cars"}}' http://localhost:3000/do

curl -v -X POST -H "content-type: application/json" -d '{"type": "getAssets", "params": {"type": "bikes"}}' http://localhost:3000/do
```
