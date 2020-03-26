Package.describe({
  name: 'flow-report',
});

Package.onUse(function (api) {

  api.use([

    // SASS/SCSS support
    'fourseven:scss@4.5.0',

    // vulcan core
    'vulcan:core@=1.14.0',

    // vulcan packages
    'vulcan:forms@=1.14.0',
    'vulcan:accounts@=1.14.0',
    'vulcan:ui-bootstrap@=1.14.0',
  ]);

  api.addFiles('lib/stylesheets/style.scss');

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});

// This defines the tests for the package:
Package.onTest((api) => {
  // // Sets up a dependency on this package.

  // Use the Mocha test framework.
  api.use(['meteortesting:mocha@1.1.3']);
  // // Specify the source code for the package tests.
  api.addFiles('test/RiversMain.test.js', 'client');

  api.use([
    // vulcan core
    'vulcan:test@=1.14.0',
    // vulcan packages
    'vulcan:forms@=1.14.0',
    'vulcan:accounts@=1.14.0',
    'vulcan:ui-bootstrap@=1.14.0',
  ]);
  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
});
