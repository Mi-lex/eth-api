# Ethereum most changed wallet address (test task) 

## _Requirements_
Create an endpoint that will return the most changed wallet address among last 100 blocks, using following endpoints:

| Endpoint URL | Description |
| ------ | ------ |
| https://api.etherscan.io/api?module=proxy&action=eth_blockNumber | [GET] Last known block |
| https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x10d4f&boolean=true | [GET] Block info |


## Bult with

- [Docker](https://www.docker.com/)
- [Postgress](https://www.postgresql.org/)
- [Nodejs](https://nodejs.dev/)
- [Nestjs](https://nestjs.com/)


## Installation

App requires [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) to run.
You also need to get etherscan [API_KEY](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics). To get this you need to create atleast the free plan.

1. Write down your API_KEY into .env file in the root dir:
```
# .env
ETHERSCAN_API_KEY=randomString
```
2. Launch app with docker-compose
```sh
docker-compose up
```

Once done, endpoint would be available on the link: 
[http://localhost:9000/api/ethereum/most-changed-wallet](http://localhost:9000/api/ethereum/most-changed-wallet)