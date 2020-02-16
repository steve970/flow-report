/*

Two resolvers are defined:

- multi (e.g.: rivers (terms: JSON, offet:Int,limit: Int) )

- single (e.g.: movie (_id:String) )

*/

const resolvers = {
  multi: {
    name: 'myRivers',

    resolver(root, args, context) {
      // const { input: {terms = {}} = {terms:{}} } = args;
      // let { selector, options } = await context.Movies.getParameters(terms, {}, context.currentUser);
    },
  },
};

export default resolvers;
