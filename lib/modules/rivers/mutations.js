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
    Connectors
} from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const mutations = {

  create: {

    name: 'riversCreate',

    check(user) {
      if (!user) return false; //the user must be logged in
      return Users.canDo(user, 'river.create'); // the user must have permission to do the mutation.
    },

    mutation(root, args, context) {
    }
  }
}

export default mutations;
