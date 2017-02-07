import elasticsearch from 'elasticsearch';
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

function getConcurrentReaders(id) {
  return client.search({
        index: 'bank',
        type: 'account',
        body: {
          query: {
            match: {
              account_number: id
            }
          }
        }
      }).then(resp => resp.hits.hits[0])
}
const ArticleType = new GraphQLObjectType({
  name: 'Article',
  description: 'Really a blog post',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'Some id',
      resolve: obj => obj._id
    },
    accountNumber: {
      type: GraphQLString,
      description: 'Personal account number',
      resolve: obj => obj._source.account_number,
    },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    article: {
      type: ArticleType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve: (root, args) => getConcurrentReaders(args.id),
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
