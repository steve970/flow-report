import { GraphQLSchema, addGraphQLSchema, addGraphQLResolvers, addGraphQLQuery } from 'meteor/vulcan:core';

/*

SchemaContents resolver

Used to output the GraphQL schema as a string

*/
const schemaResolvers = {
 Query: {
   SchemaContents(root, args, context) {
     return GraphQLSchema.finalSchema[0];
   },
 },
};
addGraphQLResolvers(schemaResolvers);

addGraphQLQuery(`SchemaContents: String`);
