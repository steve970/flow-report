// Sub-Schema for GraphQl River info
const RiverSchema = {
  name: {
    type: String,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  river_id: {
    type: String,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  url_marker: {
    type: Number,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
};

// DEFAULT SCHEMA
const schema = {

  _id: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
    onCreate: ({ newDocument }) => {
      return new Date();
    }
  },

// CUSTOM SCHEMA
  myRivers: {
    type: Array,
    label:'Choose your rivers: ',
    input:'checkboxgroup',
    canRead: ['members'],
    canCreate: ['members'],
    canUpdate: ['members'],
    optional: true,
    searchable: true,
    query: `
    rivers{
      results{
        name
        river_id
        url_marker
      }
    }
  `,
    options: props => props.data.rivers.results.map(river => ({
      value: river.river_id,
      label: river.name
    })),
    resolveAs: {
      fieldName: 'myRiversInfo',
      type: '[River]',
      resolver(rivers, args, context) {
        // if(context.currentUser._id === rivers.userId) {
        return context.Rivers.find( { river_id: { "$in" : rivers.myRivers } } )
        // }
      },
      addOriginalField: true
    },
  },
  'myRivers.$': {
    type: RiverSchema
  },

  userId: {
    type: String,
    optional: true,
    canRead: ['members'],
    resolveAs: {
      relation: 'hasOne',
      fieldName: 'user',
      type: 'User',
    }
  }
};

export default schema;
