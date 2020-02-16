import { registerFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment RiverFragment on River {
    river_id(input: {filter: { river_id: { _eq: river_id } } }) {
      name
      river_id
      url_marker
    }
  }
`);

registerFragment(`
  fragment UsersRiversFragment on MyRiver {
    userId
    myRivers
  }
`);
