# graphql-elasticsearch

Adapting the very excellent
[introduction to GraphQL by Steven Luscher](https://github.com/steveluscher/zero-to-graphql/tree/master/zero-node)

## Prerequisites

* Node >=4.2.3 (Download from https://nodejs.org/en/download/)
* Elasticsearch >=5.2.0 (Install via brew for Mac)
* `curl -XPOST 'localhost:9200/bank/account/_bulk?pretty&refresh' --data-binary "@accounts.json"`

## Installation

    cd graphql-elasticsearch
    yarn

## Running the example

    # Follow the instructions to start the Node server, then...
    npm start

Visit http://localhost:5000/graphiql
