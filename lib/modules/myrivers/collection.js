/*

The MyRivers collection definition file.

*/

import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';
// import mutations from './mutations.js';
// import resolvers from './resolvers.js'
// import permissions from '../permissions.js';

let MyRivers;

MyRivers = createCollection({

  collectionName: 'MyRivers',

  typeName: 'MyRiver',

  schema: schema,

  // mutations: mutations,

  // resolvers: resolvers,

  // permissions: permissions,

});

export default MyRivers;
