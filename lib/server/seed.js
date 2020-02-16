/*

Seed the database with some dummy content.

*/

import Rivers from '../modules/rivers/collection.js';
import { newMutation } from 'meteor/vulcan:core';
import { Promise } from 'meteor/promise';

const seedData = [
  {
    name: 'Bear Creek @ Morrison',
    river_id: 'BCRMORCO',
    url_marker: 0,
  },
  {
    name: 'Big Thompson @ Canyon Mouth (Near Drake)',
    river_id: 'BTCANYCO',
    url_marker: 0,
  },
  {
    name: 'Boulder Creek @ Nederland',
    river_id: 'BOCMIDCO',
    url_marker: 0,
  },
  {
    name: 'Cache La Poudre River @ Fort Collins',
    river_id: '06752260',
    url_marker: 1,
  },
  {
    name: 'Clear Creek @ Golden',
    river_id: '06719505',
    url_marker: 1
  },
  {
    name: 'Clear Creek Near Lawson',
    river_id: '06716500',
    url_marker: 1,
  },
  {
    name: 'South Platte River @ Denver',
    river_id: 'PLADENCO',
    url_marker: 0,
  },
  {
    name: 'South Platte River Above 11 Mile Reservoir',
    river_id: 'PLAHARCO',
    url_marker: 0,
  },
  {
    name: 'South Platte River Below Chatfield Reservoir',
    river_id: 'PLACHACO',
    url_marker: 0,
  },
  {
    name: 'South Platte River Below Cheesman Reservoir',
    river_id: 'PLACHECO',
    url_marker: 0,
  },
  {
    name: 'South Platte River Near Trumbull',
    river_id: '06701900',
    url_marker: 1,
  },
  {
    name: 'St. Vrain Creek @ Lyons',
    river_id: 'SVCLYOCO',
    url_marker: 0,
  },
];

// const createUser = async (username, email) => {
//   const user = {
//     username,
//     email,
//     isDummy: true
//   };
//   return newMutation({
//     collection: Users,
//     // document: user,
//     validate: false
//   });
// }

// const createDummyUsers = async () => {
//
//   // eslint-disable-next-line no-console
//   console.log('// seeding users…');
//
//   return Promise.all([
//     createUser('Bruce', 'dummyuser1@telescopeapp.org'),
//     createUser('Arnold', 'dummyuser2@telescopeapp.org'),
//     createUser('Julia', 'dummyuser3@telescopeapp.org'),
//   ]);
// };

export const seedRivers = () => {

  // if (Users.find().count() === 0) {
  //   Promise.await(createDummyUsers());
  // }

  if (Rivers.find().fetch().length === 0) {

    // const allUsers = Users.find().fetch();

    // eslint-disable-next-line no-console
    console.log('// seeding rivers…');

    Promise.awaitAll(seedData.map(document => newMutation({
      collection: Rivers,
      document: document,
      validate: false
    })));

    // eslint-disable-next-line no-console
    console.log('-> finished seeding!');
  }
};
