/*

Define the three default mutaions:

- create

- update

- delete

Each mutation has:

- a name
- a check function that takes the current user and (optionally) the doucment affected
- the actual mutation

*/

import {
    createMutator,
    updateMutator,
    deleteMutator,
    Utils,
} from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const mutations = {
  create: {
    name: 'myRiversCreate',

    check(user) {
      if (!user) return false; //the user must be logged in
      return Users.canDo(user, 'myriver.create'); // the user must have permission to do the mutation.
    },

    mutation(root, args, context) {
      const { data: document } = args;
      let myRiversArray = [];

      //run the check function defined above
      Utils.performCheck(this.check, context.currentUser, document);

      //map array correctly to save into database
      document.myRivers.map(river => {
        return myRiversArray.push(context.Rivers.findOne({river_id: river}))
      })

      document.myRivers = myRiversArray

      // save into mongo database
      return createMutator({
        collection: context.MyRivers, // the collection we are creating a document in
        document: document, // the document inserted in the mutation input
        currentUser: context.currentUser, // the user doing the mutation
        validate: true,
        context,
      });
    }
  }
} 

export default mutations;
