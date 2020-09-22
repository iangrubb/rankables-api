
require('dotenv').config()

const express = require('express');

const { ApolloServer, gql } = require('apollo-server-express');





const typeDefs = gql`
  type Query {
    searchRankables(searchTerm: String!): [Rankable!]!
  }

  type Rankable {
      id: ID!,
      name: String,
      types: [String],
      url: String,
      imageUrl: String,
      description: String,
      details: String,
      detailSource: String
  }
`;
 

const Rankable = require('./app/models/rankable')


const resolvers = {
  Query: {
    searchRankables: (parent, { searchTerm }, { dataSources }, info) => {
        return Rankable.searchRankablesByTerm(dataSources, searchTerm)
    }
  }
};






const KnowledgeBaseAPI = require('./app/data/knolwedgeBaseAPI');

const dataSources = () => ({
    kbSource: new KnowledgeBaseAPI() 
})

const context = ({ req }) => {
    
    return {
        user: "BEEF"
    }

}

 
const server = new ApolloServer({ typeDefs, resolvers, context, dataSources });
 
const app = express();

server.applyMiddleware({ app });
 
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);


