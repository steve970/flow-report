import { registerFragment }  from 'meteor/vulcan:core';

registerFragment( `
  fragment MyRiverFragment on MyRiver {
    _id
    userId
    myRiversInfo {
      name
      river_id
      url_marker
    }
  }
`);
