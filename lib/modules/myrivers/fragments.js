import { registerFragment }  from 'meteor/vulcan:core';

registerFragment( `
  fragment MyRiverFragment on MyRiver {
    myRiversInfo {
      name
      river_id
      url_marker
    }
  }
`);
