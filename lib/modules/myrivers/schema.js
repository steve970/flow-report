// Sub-Schema for GraphQl River info
const RiverSchema = {
  name: {
    type: String,
    canRead: ['guests'],
  },
  river_id: {
    type: String,
    canRead: ['guests'],
  },
  url_marker: {
    type: Number,
    canRead: ['guests'],
  },
};

// DEFAULT SCHEMA
const schema = {

  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    onCreate: ({ newDocument }) => {
      return new Date();
    }
  },

// CUSTOM SCHEMA
  myRivers: {
    type: Array,
    label:'Please choose a river: ',
    input:'checkboxgroup',
    canRead: ['guests'],
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
        return context.Rivers.find( { river_id: { "$in" : rivers.myRivers } } )
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
    canRead: ['guests'],
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver(river, args, context) {
        return context.Users.findOne({ _id: river.userId }, { fields: context.Users.getReadableProjection(context.currentUser, context.Users) });
      },
      addOriginalField: true
    }
  }
};

export default schema;
