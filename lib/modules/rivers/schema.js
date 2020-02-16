const schema = {
// DEFAULT SCHEMA

  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    onCreate: ({ newDocument }) => {
      return new Date();
    }
  },

// CUSTOM SCHEMA

  name: {
    type: String,
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
    }))
  },
  river_id: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },
  url_marker: {
    type: Number,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  }
};

export default schema;
