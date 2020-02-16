/*

The Rivers collection definition file.

*/

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

// import mutations from './mutations.js';
// import resolvers from './resolvers.js';
// import permissions from '../permissions.js';

let Rivers;

Rivers = createCollection({

  collectionName: 'Rivers',

  typeName: 'River',

  schema: schema,

  // mutations: mutations,

  // resolvers: resolvers,

  // permissions

});

export default Rivers;
