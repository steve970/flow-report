import { addRoute } from 'meteor/vulcan:core';

addRoute({ name: 'riversmain', path: '/', componentName: 'RiversMain' });
addRoute({ name: 'riversform', path: '/rivers', componentName: 'RiversForm'})
addRoute({ name: 'myrivers', path: '/myrivers/:userId', componentName: 'MyRiversList'});
